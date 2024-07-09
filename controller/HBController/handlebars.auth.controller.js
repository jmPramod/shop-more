const SignUp = require("../../models/AuthSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cloudinaryImage = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const homeController = async (req, res) => {

  // req.flash('Loading', '');
  const token = req.cookies.access_token;
  if (!token) {

    req.flash('Error_msg', "Please Login for Home Page.");

  } else {
    return res.render("home", { style: "home.css", showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });

  }
  return res.render("users/loginUser", { style: "login.css" });

};

const userFetchController = async (req, res, next) => {
  try {
    let fetchedUser = await SignUp.find({});
    console.log("fetchedUser", fetchedUser);
    res.status(200).json({ fetchedUser });
  } catch (err) {

    req.flash('Error_msg', err);
  }
};

const editUserControllerPost = async (req, res, next) => {
  try {

    const userExist = await SignUp.findOneAndUpdate({ _id: req.params.id }, { role: req.body.role });

    let AllUserData = await SignUp.find({}).lean();


    return res.redirect("/get-all-user");

  }
  catch (err) {
    req.flash('Error_msg', err);
  }

};

const editUserControllerGet = async (req, res, next) => {
  const userExist = await SignUp.findOne({ _id: req.params.id }).lean();
  return res.render("users/createUsers", { userExist: userExist, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
};
const loginUserGet = async (req, res) => {

  const token = req.cookies.access_token;

  if (token) {
    return res.render("home", { token, showSideBar: true, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
  } else {
    return res.render("users/loginUser", { style: "login.css" });
  }
};
const loginUserPost = async (req, res, next) => {
  try {
    req.flash('Loading', 'true');
    const { email, password } = req.body;
    const userExist = await SignUp.findOne({ email: email });
    if (!email) {

      req.flash('Loading', 'false');
      req.flash('Error_msg', 'Email is Required');
      return res.redirect("/login")
    } if (!password) {
      // req.flash('Loading', 'false');

      req.flash('Error_msg', 'Password  is Required');
      return res.redirect("/login")
    }
    if (!userExist) {
      req.flash('Loading', 'false');
      req.flash('Error_msg', 'User does not Exist');

      return res.redirect("/login")

    }
    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword) {

      req.flash('Error_msg', 'Invalid password');

      req.flash('Loading', '');
      return res.redirect("/login")
    }

    const token = jwt.sign(
      { email: userExist.email, role: userExist.role, id: userExist._id },
      process.env.SECRET_KEY
    );
    // delete res.locals[user_info];
    res.cookie("access_token", token);

    userExist.image = await cloudinaryImage.url(userExist.image)
    req.session.user_info = userExist
    // res.render("home", { user_info: req.session.user_info, token, showSideBar: true });
    console.log("pk", userExist);
    res.cookie("user", JSON.stringify(userExist));

    return res.redirect("/home")

    // req.flash('Loading', '');

  } catch (err) {
    req.flash('Error_msg', err);
  }
};

const logout = (req, res, next) => {

  // req.flash('Loading', 'Loading is enabled!');
  res.clearCookie("access_token");
  res.clearCookie("user");
  req.session.user_info = null
  const redirectUrl =
    process.env.DEPLOYED_BE_BASE_URL1 || "/login";
  return res.redirect("/login");
};
const allUserGet = async (req, res, next) => {

  try {

    let AllUserData = await SignUp.find({}).lean();
    console.log("AllUserData ", AllUserData);
    // await AllUserData.map(async (val) => {
    //   if (val.images.length === 20) {
    //     val.image = await cloudinaryImage.url(val.image)
    //   }
    // })
    if (AllUserData) {
      let superAdmin = false
      if (req.user_info.role === "Super-Admin") {
        superAdmin = true
      }
      return res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css", superAdmin: superAdmin, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
    }
  }
  catch (err) {
    req.flash('Error_msg', err);
  }
};
const allUserPost = () => { };
const editProfileGet = async (req, res, next) => {
  try {

    const userExist = await SignUp.findOne({ _id: req.params.id }).lean();

    return res.render("users/profile", { userExist: userExist, user_info: req.cookies.user && JSON.parse(req.cookies.user) });
  } catch (error) {
    req.flash('Error_msg', error);
  }



}
const editProfilePost = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const oldData = await SignUp.findOne({ _id: req.params.id }).lean();

    let result1
    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      console.log("file", file);
      result1 = await cloudinaryImage.uploader.upload(file.path);
      req.body.images = req.body.images || {};

      req.body.images.imageUrl = result1.url
      req.body.images.imgPublicId = result1.public_id
      if (oldData.images.imgPublicId) {
        await cloudinaryImage.uploader.destroy(oldData.images.imgPublicId, (error, result) => {
          if (error) {
            console.error('Error deleting image:', error);
          } else {
            console.log('Deleted image:', result);
          }
        });
      }
    }
    if (!req.body.password) {
      req.body.password = oldData.password
    }

    const userExist = await SignUp.findByIdAndUpdate({ _id: req.params.id }, req.body).lean();
    let AllUserData = await SignUp.find({}).lean();

    if (AllUserData) {
      // req.session.user_info = null
      // res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css" });
      // userExist.image = await cloudinaryImage.url(userExist.image)/
      // req.session.user_info = userExist

      req.flash('Success_msg', "User Update Successfully!");
      return res.redirect("/home")
    }
  } catch (error) {
    console.log(error);
  }



}


module.exports = {
  homeController,
  logout,
  userFetchController,
  editProfileGet,
  editUserControllerGet,
  editUserControllerPost,
  loginUserGet,
  loginUserPost,
  allUserGet,
  allUserPost,
  editProfilePost
};

const SignUp = require("../../models/AuthSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cloudinaryImage = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const homeController = async (req, res) => {

  // req.flash('Loading', '');
  const token = req.cookies.access_token;

  if (token) {
    res.render("home", { style: "home.css", showSideBar: true, user_info_1: req.session.user_info_1 });
  } else {

    req.flash('Error_msg', "Please Login for Home Page.");
  }
  res.render("users/loginUser", { style: "login.css" });

};

const userFetchController = async (req, res, next) => {
  try {
    let fetchedUser = await SignUp.find({});

    res.status(200).json({ fetchedUser });
  } catch (err) {

    req.flash('Error_msg', err);
  }
};

const editUserControllerPost = async (req, res, next) => {
  try {

    const userExist = await SignUp.findOneAndUpdate({ _id: req.params.id }, { role: req.body.role });

    let AllUserData = await SignUp.find({}).lean();


    res.redirect("/get-all-user");

  }
  catch (err) {
    req.flash('Error_msg', err);
  }

};

const editUserControllerGet = async (req, res, next) => {
  const userExist = await SignUp.findOne({ _id: req.params.id }).lean();
  res.render("users/createUsers", { userExist: userExist });
};
const loginUserGet = async (req, res) => {

  const token = req.cookies.access_token;

  if (token) {
    res.render("home", { token, showSideBar: true });
  } else {
    res.render("users/loginUser", { style: "login.css" });
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
      req.flash('Loading', 'false');

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
    // delete res.locals[user_info_1];
    res.cookie("access_token", token);
    userExist.image = await cloudinaryImage.url(userExist.image)
    req.session.user_info_1 = userExist
    // res.render("home", { user_info_1: req.session.user_info_1, token, showSideBar: true });


    res.redirect("/home")

    // req.flash('Loading', '');

  } catch (err) {
    req.flash('Error_msg', err);
  }
};

const logout = (req, res, next) => {

  // req.flash('Loading', 'Loading is enabled!');
  res.clearCookie("access_token");
  req.session.user_info_1 = null
  const redirectUrl =
    process.env.DEPLOYED_BE_BASE_URL1 || "/login";
  res.redirect("/login");
};
const allUserGet = async (req, res, next) => {

  try {

    console.log("req.user_info ", req.user_info.role);
    let AllUserData = await SignUp.find({}).lean();
    await AllUserData.map(async (val) => {
      if (val.image.length === 20) {
        val.image = await cloudinaryImage.url(val.image)
      }
    })
    if (AllUserData) {
      let superAdmin = false
      if (req.user_info.role === "Super-Admin") {
        superAdmin = true
      }
      res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css", superAdmin: superAdmin });
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
    if (userExist.image.length === 20) {

      userExist.image = await cloudinaryImage.url(userExist.image)
      userExist.cloudinaryPublicId = ""

    }



    res.render("users/profile", { userExist: userExist });
  } catch (error) {
    req.flash('Error_msg', error);
  }



}
const editProfilePost = async (req, res, next) => {
  try {
    const oldData = await SignUp.findOne({ _id: req.params.id }).lean();
    let newImageUploaded;
    if (req.files[0]) {
      await cloudinaryImage.uploader.upload(req.files[0].path,
        {
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' }, // Automatically adjust the quality
            { fetch_format: 'auto' }, // Automatically select the format
            { progressive: true }, // Use progressive JPEGs
            { strip: true } // Strip metadata
          ]
        },
        async function (err, result) {
          if (err) {
            req.flash('Error_msg', err);
            res.redirect(`users/profile/${req.params.id}`);
            // res.redirect(`/get-all-user`)
          }
          if (result.public_id) {
            req.body.image = result.public_id
            newImageUploaded = result.public_id

          }


        }
      )
    }

    if (newImageUploaded) {
      if (oldData.image.length === 20) {

        cloudinaryImage.uploader.destroy(oldData.image)
      }
      req.body.image = newImageUploaded
    }

    if (!req.body.password) {
      req.body.password = oldData.password
    }

    const userExist = await SignUp.findByIdAndUpdate({ _id: req.params.id }, req.body).lean();
    let AllUserData = await SignUp.find({}).lean();

    if (AllUserData) {
      req.session.user_info_1 = null
      // res.render("users/listOfUsers", { AllUserData: AllUserData, style: "listOfUsers.css" });
      userExist.image = await cloudinaryImage.url(userExist.image)
      req.session.user_info_1 = userExist

      req.flash('Success_msg', "User Update Successfully!");
      res.redirect("/home")
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

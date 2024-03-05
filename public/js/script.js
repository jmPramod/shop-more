// require("dotenv").config()
function navigateToRoute() {
    // Replace 'your-route' with the actual route you want to navigate to
// if(process.env.NODE_ENV==="PROD"){
    console.log("Button clicked 1");
    // window.location.href = process.env.DEPLOYED_BE_BASE_URL;
// }
// else{
    console.log("Button clicked 2");
    // window.location.href = process.env.LOCAL_BE_BASE_URL;
// }
}

document.querySelector('.logo').addEventListener('click', navigateToRoute);
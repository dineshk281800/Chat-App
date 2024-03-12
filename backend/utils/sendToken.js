// create token and save in the cookie
module.exports = (user, statusCode, res) => {
    // Create JWT Token
    const token = user.getJwtToken()

    // options for cookie
    // new Date(Date.now() + 15days * 24hrs * 60min * 60sec * 1000ms)
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true, //prevent XSS attacks, cross-site scripting attacks
        sameSite: "strict", // CSRF attacks, cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "DEVELOPMENT"
    };

    // console.log(options)
    res.status(statusCode).cookie("token", token, options).json({
        token,
    })
}
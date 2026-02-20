const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    // options for cookie 
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
        httpOnly: true,
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
}

export default sendToken;
export const generateToken = (user, message, statusCode, res) => {
    // Generate the JWT by calling the appropriate method on the user object
    const token = user.generateJsonWebToken(); // Assuming 'generateJsonWebToken' is a method

    // Determine the cookie name based on the user's role
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

    // Set the cookie with the JWT and send the response
    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        message,
        token,
        user
    });
};

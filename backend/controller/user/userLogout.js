async function userLogout(req, res){
    try {
        // const tokenOption = {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'None'
        // };

        // Clear the authentication token cookie
        res.clearCookie("token", tokenOption);

        // Clear the sessionToken cookie
       // res.clearCookie("sessionToken", tokenOption);

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch(err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;

async function userLogout(req, res){
    try {
        // const tokenOption = {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'None'
        // };

        // Clear the authentication token cookie
        res.clearCookie("token");

        // Clear the sessionToken cookie, tokenOption
       res.clearCookie("sessionToken");

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

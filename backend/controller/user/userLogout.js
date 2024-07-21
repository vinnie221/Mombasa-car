async function userLogout(req, res){
    try{
        const isProduction = process.env.NODE_ENV === 'production';
        const tokenOption = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax'
        };
        res.clearCookie("token",tokenOption)

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data: []
        })
    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}



module.exports = userLogout
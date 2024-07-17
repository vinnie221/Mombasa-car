const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct = async(req,res)=>{
    try{
        const userId = req.sessionId

        const count = await addToCartModel.countDocuments({
            userId : userId
            
        })
        // while (count < 1) {
        //     return(
        //         0
        //     )
        // }

        res.json({
            data : {
                count : count
            },
            message : "OK",
            error : false,
            success : true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}



module.exports = countAddToCartProduct
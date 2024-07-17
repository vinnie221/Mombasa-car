const uploadProductPermission = require("../../helpers/permission")
const autoProductModel = require("../../models/autoProductModel")



async function updateAutoProductController(req,res){
    try{
        const tokenOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await autoProductModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message : "product updated successfully",
            data : updateProduct,
            success : true,
            error : false
        })


    }catch(err){
        
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateAutoProductController

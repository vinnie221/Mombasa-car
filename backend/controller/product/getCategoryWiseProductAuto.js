const autoProductModel = require("../../models/autoProductModel")


const getCategoryWiseProductAuto = async(req,res)=>{
    try {
        const { category } = req?.body || req?.query
        const product = await autoProductModel.find({category})

        res.json({
            data : product,
            message : "product",
            seccess : true,
            eror : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}



module.exports = getCategoryWiseProductAuto
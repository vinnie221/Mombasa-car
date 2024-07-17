const autoProductModel = require("../../models/autoProductModel")



const getCategoryAutoProduct = async(req,res)=>{
    try{
        const productCategory = await autoProductModel .distinct("category")

        console.log("category", productCategory)

        //array to store each product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await autoProductModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message : "Category product",
            data : productByCategory,
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


module.exports = getCategoryAutoProduct
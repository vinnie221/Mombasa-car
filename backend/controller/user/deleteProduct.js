const autoProductModel = require("../../models/autoProductModel");


const deleteProduct = async(req, res) => {
    try {
        const productId = req.body._id;

        const deleteOneProduct = await autoProductModel.deleteOne({_id: productId});

        if (deleteOneProduct.deletedCount === 1) {
            const updatedProducts = await autoProductModel.find(); // Fetch updated product list

            res.json({
                message: "Product deleted",
                error: false,
                success: true,
                data: updatedProducts
            });
        } else {
            res.status(400).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteProduct;

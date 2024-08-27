const express = require("express");
const productRouter = express.Router();
const {authenticated, adminOnly , injectUser} = require("../middlewares/middleware");


const productControllers = require("../controllers/productControllers.js")

productRouter.use(authenticated);

productRouter.get("/product", adminOnly, productControllers.adminproductsGet);
productRouter.get("/product", productControllers.productsGet);
productRouter.post("/product", productControllers.productPost);
productRouter.get("/add-product",adminOnly, productControllers.addProduct );
productRouter.get("/find-products", adminOnly, productControllers.searchProduct)
productRouter.get("/product/:id/details", productControllers.productDetails )
productRouter.get("/product/:id", productControllers.productUpdateGet )
productRouter.put("/product/:id/update",productControllers.productUpdatePost)
productRouter.delete("/product/delete/:id", productControllers.productDelete )
productRouter.delete("/product/:id/delete", productControllers.softproductDelete )
module.exports = productRouter;
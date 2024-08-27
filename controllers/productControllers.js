const {Product} = require("../Model/ProductModel");

const products = [
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
    {
        img : "https://www.nescafe.com/mena/sites/default/files/2023-08/Coffee%20Types%20Banner%20Desktop.jpg",
        title : "Coffee",
        description : "We can enjoy the best flavor in the world"
    },
]

module.exports.productsGet = async function(req,res){
    let products = await Product.find({isDeleted : false});
    res.render('product',{
        page_title:"product" , products : products
    })
}
module.exports.adminproductsGet = async function(req,res){
    let products = await Product.find();
    res.render('product',{
        page_title:"product" , products : products
    })
}
module.exports.productPost = async function(req, res){
    let name = req.body.name;
    let price = req.body.price;
    let img = req.body.img;
    let description = req.body.description;
    let product = new Product({
        name, price, img, description
    })
    try{
        product = await product.save();
        res.status(201).json({
            product
        })
    }
    catch(err){
        res.json({
            errors : err.message
        })
    }
}
module.exports.addProduct = function(req, res){
    res.render('add-product', {
        page_title:"Add product"
    })
}
module.exports.searchProduct = async function (req, res){
    let keyword = req.query.keyword;
    if (keyword == ""){
        res.redirect("/product");
        return;
    }
    let product = await Product.find({"name" : {"$regex" : keyword, "$options" : "i"}});
    res.render("partials/selection-section", {selection : product}, (err,html)=>{
        if(err){
            res.status(500).json({
                "error" : "something went wrong"
            })
            return;
        }
        res.status(200).json({
            html
        })
    })
    // return res.status(200).json({
    //     product
    // })
}
module.exports.productDetails = async function(req, res){
    const id = req.params.id;
    try{
        const p = await Product.findById(id);
    if(!p){
        res.status(404).json({
            error:[{
                product : "Not Found"
            }]
        })
        return;
    }
    res.render('product-details',{
        page_title : p.name,
        product : p
    })
    }
    catch(err){
        res.status(400).json({
            error:[{
                product : err.message
            }]
        })
    }
    
}

module.exports.productUpdateGet = async function(req, res){
    const id = req.params.id;
    try{
        const p = await Product.findById(id);
    if(!p){
        res.status(404).json({
            error:[{
                product : "Not Found"
            }]
        })
        return;
    }
    res.render('update-product',{
        page_title : p.name,
        product : p
    })
    }
    catch(err){
        res.status(400).json({
            error:[{
                product : err.message
            }]
        })
    }
}

module.exports.productUpdatePost = async function(req, res){
    const id = req.params.id;
    const {name, price,img, description} = req.body; 
    try{
        const updated = await Product.findByIdAndUpdate(id, {name, price,img, description}, { new: true, runValidators:true });
        res.status(200).json(updated);
    }
    catch(err){
        res.status(500).json({
            errors : err.message
    })
    
}}
module.exports.productDelete = async function(req, res){
    const {id} = req.params;
    try{
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(deleteProduct)
    }
    catch(err){
        res.status(500).json({
            errors : err.message
    })}
}
module.exports.softproductDelete = async function(req, res){
    const {id} = req.params;
    try{
        await Product.findByIdAndUpdate(id, {isDeleted : true});
        res.status(200).json({
            data : "Deleted Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            errors : err.message
    })}
}


const Product = require('../models/product');

// get all products
module.exports.Products = function(req, res){
    Product.find({}).then(function(foundProducts){
        res.send(foundProducts);
    });
};


// create new product
module.exports.create = function(req, res){
    const newproduct = new Product({
        name: req.body.name,
        quantity: req.body.quantity
    });
    newproduct.save().then(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("new product added!");
        }
    });
};

// update product's quantity
module.exports.updateQuantity = function(req, res){
   try{
    console.log(req.body.quantity);
    const newQty = parseInt(req.body.quantity);
    Product.findOneAndUpdate({_id:req.params.id},{quantity: newQty});
    return res.send({
        
        message:"updated"
    });
}catch(error){
    console.log(error);
}
};

// delete product by id
module.exports.delete = function(req, res){
    try{
    const product = Product.findById(req.params.id);
    if(product){
        console.log("*****************see here*******************",product);
        Product.findByIdAndDelete({_id: req.params.id});
        return res.send({
            message: "deleted successfully"
        });      
    }else{
        return res.send({
            message: "not deleted successfully"
        })
    }}catch(error){
        console.log(error);
    }
};



var express = require('express');
var app=express();
var router = require('express').Router();
const Product = require('../models/product-model');
const User = require('../models/user-model');

router.get('/addToCart', (req,res)=>{
	if(req.user)
	    {
		luser = req.user;
		var pID = req.query.pID;
		console.log('id is', pID);
		Product.findOne({_id : pID}, function (err, prod) {
		    if (err) throw err;
		    if (prod) {
			if(prod.productQuantity>0)
			{
			    prod.productQuantity = prod.productQuantity - 1;
			    prod.save((err, updatedProd)=>
			    {
				if(err) throw err;
				console.log('product updated');
			    });
			    User.findOne({_id : luser._id}, (err, user)=>{
				if(err) throw err;
				if(user) {
				    user.cart.push(pID);
				    user.save((err, updatedProd)=>{
					if(err) throw err;
					console.log('user updated');
				    })
				}
			    });
			    res.send({status: 1});
			}else{
			    res.send({status :0});
			}
		    }
		});
	    }
});

router.get('/showCart', (req,res)=>
	{
		if(!req.user) {res.redirect('/auth/login'); }
		else{
				var pname=[];
				var pprice=[];
				total=0;
				var j=0;
				if(req.user.cart.length==0) { show(); }
				for(i=0;i<req.user.cart.length;i++)
				{
					Product.findOne({_id : req.user.cart[i]}, (err, prod)=>{
						if (err) throw err;
	            		if (prod) {
							pname.push(prod.productName);
							pprice.push(prod.productPrice);
							total+=prod.productPrice;
							j++;
							console.log(j);
							if(j==req.user.cart.length) {
								show();
							}
						}
					});
				}
				function show() {
					res.render('cart', {
						pprice: pprice,
						pname: pname,
						length: req.user.cart.length,
						total: total
					});
				}
			}
	});

router.get('/checkout', (req,res)=>{
	User.findOne({_id : req.user._id}, (err, user)=>{
		if(err) throw err;
		if(user) {
			user.cart=[];
			console.log(user.cart);
			user.save((err, updatedProd)=>{
				if(err) throw err;
        		console.log('user updated');
			});
		}
	});
	res.redirect('/cart/showCart');
});

module.exports = router;

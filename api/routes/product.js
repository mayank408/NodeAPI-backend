const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next)=>{

	Product.find()
		.exec()
		.then(doc => {
			console.log(doc);
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
})

router.post('/', (req, res, next)=>{

	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	})
	product
		.save()
		.then(result=>{
			console.log(result);
			res.status(201).json({
				message: 'Handling post requests',
				createdProduct: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});

})

router.get('/:id', (req, res, next)=>{

	const id = req.params.id;
	Product.findById(id)
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if(doc){
				res.status(200).json(doc);
			} else{
				res.status(404).json({message: "ID not found"});
			}

			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});

})

router.patch('/:id', (req, res, next)=>{

	const id = req.params.id; 
	const updateOps = {};

	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}

	Product.update({_id: id}, {$set: updateOps})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err})
		});

})

router.delete('/:id', (req, res, next)=>{

	const id = req.params.id; 
	Product.remove({_id: id})
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err})
		});
});

module.exports = router;






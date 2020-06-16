const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{

	res.status(200).json({
		message: 'Handling get requests'
	});

})

router.post('/', (req, res, next)=>{

	const product = {
		name : req.body.name,
		price: req.body.price
	}

	res.status(201).json({
		message: 'Handling post requests',
		createdProduct: product
	});

})

router.get('/:id', (req, res, next)=>{

	const id = req.params.id;
	if(id == 'special'){
		res.status(200).json({
			message: 'You discovered the special Id',
			id: id
		});
	} else{
		res.status(200).json({
			message: 'You passed an Id'
		});
	}

})

router.patch('/:id', (req, res, next)=>{

	res.status(200).json({
		message: 'updated product'
	});

})

router.delete('/:id', (req, res, next)=>{

	res.status(200).json({
		message: 'deleted product'
	});

})

module.exports = router;






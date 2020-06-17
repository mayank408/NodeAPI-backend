const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

const uri = "mongodb+srv://admin:@node-rest-bic1t.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next)=>{

	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{

	const error = new Error('Not Found');
	error.status = 404;
	next(error);

});

app.use((error, req, res, next)=>{

	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message 
		}
	});
});

module.exports = app;


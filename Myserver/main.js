const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const midtransClient = require('midtrans-client');


	let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-C3CRRnFIwYVHi2WqWmoNB5kE'
    });

app.use(cors());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.post("/genID",(req,res)=>{

let parameter = {
    "transaction_details": {
        "order_id": "someID",
        "gross_amount": req.body.price
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": req.body.name,
        "last_name": req.body.last,
        "email": req.body.email,
       
    }
};
 
snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:',transactionToken);
        res.send(transactionToken)
})

})
app.listen(3000,()=>console.log("server ready on 3000"))
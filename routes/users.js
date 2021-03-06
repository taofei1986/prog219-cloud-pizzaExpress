var express = require('express');
var router = express.Router();

//bcPizzariaOrder  bcPizzariaUser

/* POST to adduser. */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaUser');
  collection.find({//try find record by username
    username:req.body.username
  },(err, docs)=>{
    if(err){
        res.send({msg:'server or db error'});
    }else{
      if(docs.length==0){//record not exist
        collection.insert(req.body, function(err, userInfo){
          let newUserInfo={
            address:userInfo.address,
            _id:userInfo._id,
            username:userInfo.username
          }
          res.send(
            (err === null) ? {newUserInfo} : { msg: err }
          );
        })
      }
      else{//record exist
        res.send({msg:'already have this accout',accoutExsit:true});
      }
    }
  })
});

/* POST to login. */
router.post('/login', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaUser');
  collection.find({//try find record by username and password
    username:req.body.username,
    password:req.body.password
  },(err, docs)=>{
    if(err){
        res.send({msg:'server or db error'});
    }else{
      if(docs.length==0){//record not exist
        res.send(
          (err === null) ? { msg: 'username incorrect or password incrorrect!',loginSuccess:false} : { msg: err }
        );
      }
      else{//record exist
        res.send({msg:'login success',loginSuccess:true,userInfo:docs[0]});
      }
    }
  })
});

/* POST to delet. */
router.post('/deleteuser', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaUser');
  collection.find({//try find record by _id and password
    _id:req.body.userID,
    password:req.body.password
  },(err, docs)=>{
    if(docs.length==0){//record not exist
      res.send(
        (err === null) ? { msg: 'password incrorrect!',deletSuccess:false} : { msg: err }
      );
    }
    else{//record exist
      collection.remove({ '_id' : req.body.userID },(err)=>{
        res.send((err === null) ? { msg: 'The account deleted!', deletSuccess:true} : { msg:'error: ' + err });
      })
    }
  });
});


/* POST to change password. */
router.post('/updatepassword', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaUser');
  collection.find({//try find record by _id and password
    _id:req.body.userID,
    password:req.body.password
  },(err, docs)=>{
    if(docs.length==0){//record not exist
      res.send(
        (err === null) ? { msg: 'password incrorrect!',updateSuccess:false} : { msg: err }
      );
    }
    else{//record exist
      //here is update password
      collection.update(
        { "_id":  req.body.userID},
        {
          $set: { "password" : req.body.newpassword}
        }
      );
      res.send(
        (err === null) ? { msg: 'password updated!',updateSuccess:true} : { msg: err }
      );
    }
  });
});

/* POST to change address. */
router.post('/updateaddress', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaUser');
  collection.find({//try find record by _id and passowrd 
    _id:req.body.userID,
    password:req.body.password
  },(err, docs)=>{
    if(docs.length==0){//record not exist
      res.send(
        (err === null) ? { msg: 'password incrorrect!',updateSuccess:false} : { msg: err }
      );
    }
    else{//record exist
      //here is update address
      collection.update(
        { "_id":  req.body.userID},
        {
          $set: { "address" : req.body.newaddress}
        }
      );
      res.send(
        (err === null) ? { msg: 'address updated!',updateSuccess:true} : { msg: err }
      );
    }
  });
});

/* POST to order pizza. */
router.post('/orderpizza', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaOrder');//pizza order collection
  let price=0;
  if(req.body.pizzaTopping=="cheese"){
    price=19.99;
  }
  else if(req.body.pizzaTopping=="hawaiian"){
    price=20.99;
  }
  else if(req.body.pizzaTopping=="bbqchicken"){
    price=21.99;
  }
  let orderDetail={
    customerID:req.body.customerID,
    pizzaTopping:req.body.pizzaTopping,
    orderTime:req.body.orderTime,
    Price:price
  }
  collection.insert(orderDetail, function(err, orderInfor){
    res.send(
      (err === null) ? {orderID:orderInfor._id,orderSuccess:true} : { msg: err,orderSuccess:false }
    );
  })
});

/* Get order history. */
router.post('/orderhistory', function(req, res) {
  var db = req.db;
  var collection = db.get('bcPizzariaOrder');//pizza order collection
  collection.find({//try find record by customerID
    customerID:req.body.userID
  },(err, docs)=>{
    res.send(
      (err === null) ? {orderHistory:docs,findSuccess:true} : { msg: err,findSuccess:false }
    );
  })
});

module.exports = router;


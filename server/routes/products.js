const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const { Subscriber } = require('../models/Subscriber');


//=========================
//          Product
//=========================

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ filesave: false, err });
    }
    return res.json({ filesave: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
})
//

router.post('/uploadpost', (req, res) => {

  const product = new Product(req.body)

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  })
})

router.post('/getPosts', (req, res) => {

  let limit = req.body.limit ? parseInt(req.body.limit): 100
  let skip = req.body.skip ? parseInt(req.body.skip):0

  Product.find()
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, postNumber:posts.length,posts });
    })
});


router.post('/myPosts', (req, res) => {
  Product.find({ writer: { $in: req.body.id } })
    .populate('writer')
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts })
    })
})
//처음에한 바보짓
// router.post('/myPosts', (req, res) => {
//   User.find({ email: req.body.email })
//     .exec((err, userEmail) => {
//       if (err) return res.status(400).send(err);
//       // return res.status(200).json({ success: true, userEmail });

//       let User = userEmail


//       Product.find({ writer: { $in: User } })
//         .populate('writer')
//         .exec((err, posts) => {
//           if (err) return res.status(400).send(err);
//           res.status(200).json({ success: true, posts })
//         })

//     });
// })

router.get('/post_by_id', (req, res) => {
  let type = req.query.type;
  let postIds = req.query.id;
  
  if(type ==="array"){
    let ids =req.query.id.split(',');
    postIds = ids.map((item)=>{
      return item
    })
  }


  Product.find({ _id: { $in: postIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    })
})

router.get('/user_by_id', (req, res) => {

  let userIds = req.query.id;

  Product.find({ writer: { $in: userIds } })
    .populate('writer')
    .exec((err, user) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(user);
    })
});

router.post('/deletePost', (req, res) => {

  Product.findOneAndDelete({ _id: req.body._id })
    .exec((err, post) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, post });
    })
})



router.post("/editpost", (req, res) => {

  Product.findOneAndUpdate({ _id: req.body._id },
    {
      title: req.body.title,
      images: req.body.images,
      description: req.body.description
    },
    (err, post) => {
      if (err) return res.json({ edit: false, err });
      return res.status(200).json({
        edit: true,
        post
      })
    }

  )
});

router.post("/getSubscription", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom })
    .exec((err, subscribeInfo) => {
      if (err) return res.status(400).send(err);
      // res.status(200).json({ success: true, subscribeInfo })

      let subscriptionList = [];
      subscribeInfo.map((subscription, i) => {
        subscriptionList.push(subscription.userTo)
      })

      Product.find({ writer: { $in: subscriptionList } })
        .populate('writer')
        .exec((err, products) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, products })
        })
    })

})

module.exports = router;
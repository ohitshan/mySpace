const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const multer = require('multer');


//=========================
//          User
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

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
});

router.post('/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "no user"
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: 'wrong password'
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })


    })
  })
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    introduction: req.user.introduction,
    favorites: req.user.favorites,
    history: req.user.history,
    score: req.user.score
  })
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
});

router.post("/editProfile", auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id },
    {
      name: req.body.name,
      image: req.body.image,
      introduction: req.body.introduction
    },
    (err, user) => {
      if (err) return res.json({ edit: false, err });
      return res.status(200).json({
        edit: true,
        name: req.user.name,
        // image:
      })
    }

  )
});

router.post("/addToFavorites", auth, (req, res) => {
  User.findOne({ _id: req.user._id },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      // res.status(200).json({success:true, userInfo})

      let alreadyHavefavorites = false;

      userInfo.favorites.forEach((product) => {
        if (product.id === req.body.postId) {
          alreadyHavefavorites = true;
        }
      })

      if (alreadyHavefavorites) {

        User.findOneAndUpdate(
          { _id: req.user._id, "favorites.id": req.body.postId },
          {
            $pull: {
              favorites: {
                id: req.body.postId
              }
            }
          },
          // { $inc: { "cart.$.quantity": 1 } },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, userInfo })
          }
        )
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              favorites: {
                id: req.body.postId,
                quantity: 1,
                date: Date.now()
              }
            }
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, userInfo })
          }
        )
      }


    })
})


router.post("/getFavorites", auth, (req, res) => {
  User.findOne({ _id: req.user._id },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo })
    }
  )
})


router.post("/score", auth, (req, res) => {
  console.log(req.body.game, req.body.score)
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull:
        {
          score: { id: req.body.game }
        }
      },
      { new: true },
      (err, userInfo) => {
        if (err) return res.status(400).send(err);
      }
    )
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push:
      {
        score: { id: req.body.game, score: req.body.score }
      }
    },
    { new: true },
    (err, userInfo) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, userInfo })
    }
  )


})

module.exports = router;
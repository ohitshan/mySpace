const express = require('express');
const { Dislike } = require('../models/Dislike');
const router = express.Router();
const { Like } = require("../models/Like");



//=================================
//            Like
//=================================


router.post("/getLikes", (req, res) => {
  let variable = {}

  if (req.body.postId) {
    variable = { postId: req.body.postId }
  }
  Like.find(variable)
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes })
    })
})

router.post("/getDislikes", (req, res) => {
  let variable = {}

  if (req.body.postId) {
    variable = { postId: req.body.postId }
  }
  Dislike.find(variable)
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes })
    })
})


router.post("/like", (req, res) => {

  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId }
  }

  const like = new Like(variable);

  like.save((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, likeInfo })
  })

})

router.post("/unlike", (req, res) => {

  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId }
  }


  Like.findOneAndDelete(variable)
    .exec((err, info) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, info })
    })
})


router.post("/dislike", (req, res) => {

  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId }
  }

  const dislike = new Dislike(variable);

  dislike.save((err, dislikeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, dislikeInfo })
  })

})

router.post("/undislike", (req, res) => {

  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId }
  }


  Dislike.findOneAndDelete(variable)
    .exec((err, info) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, info })
    })
})

module.exports = router;
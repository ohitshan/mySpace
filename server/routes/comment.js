const express = require('express');
const { Comment } = require('../models/Comment');
const router = express.Router();



//=================================
//            Comment
//=================================

router.post("/getComments", (req, res) => {

  Comment.find({ postId: req.body.postId })
    .populate('userId')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments })
    })
})

router.post("/getReplyComments", (req, res) => {

  Comment.find({ postId: req.body.postId, responseTo: req.body.responseTo })
    .populate('userId')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments })
    })
})




router.post("/comment", (req, res) => {


  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate('userId')
      .exec((err, result) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comment })
      })
  })

})



module.exports = router;
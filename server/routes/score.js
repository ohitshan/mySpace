const express = require('express');
const router = express.Router();
const { Score } = require('../models/Score');


//=========================
//          Score
//=========================


//최고기록 변화를 볼수있게
router.post('/recordScore', (req, res) => {

  const score = new Score(req.body)

  Score.find({ userId: req.body.userId, game: req.body.game })
    .exec((err, scoreInfo) => {
      if (err) return res.status(400).send(err);
      // return res.status(200).json({ success: true, scoreInfo })
      if (scoreInfo.length === 0) {
        score.save((err, save) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).json({ success: true, save });
        })
      } else {
        if (scoreInfo[0].win) {
          Score.findOneAndUpdate(
            { userId: req.body.userId, game: req.body.game },
            {
              $inc: {
                win: 1
              }
            },
            { new: true },
            (err, Info) => {
              if (err) return res.status(400).send(err);
              res.status(200).json({ success: true, Info })
            }
          )
        } else if(scoreInfo[0].score) {
          if (scoreInfo[0].score >= req.body.score) return
          Score.findOneAndUpdate(
            { userId: req.body.userId, game: req.body.game },
            {
              $set: {
                userId: req.body.userId, game: req.body.game, score: req.body.score
              }
            },
            { new: true },
            (err, Info) => {
              if (err) return res.status(400).send(err);
              res.status(200).json({ success: true, Info })
            }
          )
        }else{
          if (scoreInfo[0].time <= req.body.time) return
          Score.findOneAndUpdate(
            { userId: req.body.userId, game: req.body.game },
            {
              $set: {
                userId: req.body.userId, game: req.body.game, time: req.body.time
              }
            },
            { new: true },
            (err, Info) => {
              if (err) return res.status(400).send(err);
              res.status(200).json({ success: true, Info })
            }
          )
        }
        // else{
        //   Score.findOneAndUpdate(
        //     {userId:req.body.userId,game:req.body.game},
        //     {}
        //   )
        // }
      }
    })

  // Score.find({ userId: req.body.userId, game: req.body.game })
  //   .exec((err, scoreInfo) => {
  //     if (err) res.status(400).send(err);
  //     // res.status(200).json({ success: true, scoreInfo })
  //     if (scoreInfo[scoreInfo.length - 1] && scoreInfo[scoreInfo.length - 1].score > req.body.score) return
  //     score.save((err, save) => {
  //       if (err) return res.status(400).json({ success: false, err });
  //       res.status(200).json({ success: true, save });
  //     })
  //   })
})


router.post('/getScore', (req, res) => {
  Score.find({ game: req.body.game })
    .populate('userId')
    .sort({ "score": -1 })
    .exec((err, score) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, score: score.splice(0, 5) })
    })
})

router.post('/getTime', (req, res) => {
  Score.find({ game: req.body.game })
    .populate('userId')
    .sort({ "time": 1 })
    .exec((err, time) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, time: time.splice(0, 5) })
    })
})

router.post('/getReactionTime', (req, res) => {
  Score.find({ game: req.body.game })
    .populate('userId')
    .sort({ "time": 1 })
    .exec((err, time) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, time})
    })
})

router.post('/getWin', (req, res) => {
  Score.find({ game: req.body.game })
    .populate('userId')
    .sort({ "win": -1 })
    .exec((err, score) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, score: score.splice(0, 5) })
    })
})






module.exports = router;
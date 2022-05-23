const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Subscriber } = require('../models/Subscriber');
const { Product } = require('../models/Product');
const ffmpeg = require('fluent-ffmpeg');

//=========================
//          Video
//=========================

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const upload = multer({ storage: storage }).single("file");

router.post('/uploadVideos', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ filesave: false, err });
    }
    return res.json({ filesave: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
})


router.post('/thumbnail', (req, res) => {

  let filePath = '';
  let fileDuration = '';

  //videoinfo
  ffmpeg.ffprobe(req.body.filepath, function (err, metadata) {
    console.dir(req.body.filepath);
    console.log(metadata)
    fileDuration = metadata.format.duration
  });

  //thumbnail
  ffmpeg(req.body.filepath)
    .on('filenames', function (filenames) {
      console.log('will generate' + filenames.join(', '))
      console.log(filenames)

      filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () {
      console.log('screenshot taken');
      return res.json({
        success: true,
        filepath: filePath,
        fileDuration: fileDuration
      })
    })
    .on('error', function (err) {
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 1,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filenmae: 'thumbnail-%b.png'
    })
})


router.post('/saveVideo', (req, res) => {
  const video = new Product(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, video })
  })
})

// router.get('/getVideos', (req, res) => {
//   Product.find()
//     .populate('writer')
//     .exec((err, posts) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({ success: true, posts });
//     })
// });




module.exports = router;
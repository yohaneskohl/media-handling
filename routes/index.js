var express = require("express");
var router = express.Router();
const mime = require('mime-types');
const { image, video, document, audio } = require("../libs/multer");

router.post("/upload/image", image.single("image"), (req, res) => {
  let imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  res.render("uploadedImages", { image_url: imageUrl });

  //   jika mau tampilan json

  //     res.json({
  //     image_url: imageUrl
  //   })
});

// upload multiple images
router.post("/upload/images", image.array("image"), (req, res) => {
  let imagesUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/images/${file.filename}`});
    res.json({ images_url: imagesUrl });
});

// single video (mp4,mpeg)
router.post("/upload/video", video.single("video"), (req, res) => {
  let videoUrl = `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`;
  res.render("uploadedVideos", { video_url: videoUrl });
});

// Upload multiple videos
router.post("/upload/videos", video.array("video"), (req, res) => {
    let videosUrl = req.files.map((file) => {
      return `${req.protocol}://${req.get("host")}/videos/${file.filename}`;
    });
    res.json({ videos_url: videosUrl });
  });
  

// Upload single document (PDF, DOC, DOCX)
router.post("/upload/document", document.single("document"), (req, res) => {
    let documentUrl = `${req.protocol}://${req.get("host")}/documents/${req.file.filename}`;
    res.render("uploadedDocuments", { document_url: documentUrl });
  });
  
  // Upload multiple documents
  router.post("/upload/documents", document.array("document"), (req, res) => {
    let documentsUrl = req.files.map((file) => {
      return `${req.protocol}://${req.get("host")}/documents/${file.filename}`;
    });
    res.json({ documents_url: documentsUrl });
  });
  
// upload audio
router.post("/upload/audio", audio.single("audio"), (req, res) => {
  let audioUrl = `${req.protocol}://${req.get("host")}/audios/${req.file.filename}`;
  let audioMimeType = mime.lookup(req.file.path);
  res.render("uploadedAudios", { audio_url: audioUrl, audio_mime_type: audioMimeType });
});

// Upload multiple audio
router.post("/upload/audios", audio.array("audio"), (req, res) => {
  let audiosUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/audios/${file.filename}`;
  });
  res.json({ audios_url: audiosUrl });
});

module.exports = router;
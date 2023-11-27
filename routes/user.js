const express = require('express');
const router = express.Router();

const {createNews,getNews,recieveEmail} = require('../controllers/user');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createNews', upload.single('img'), createNews);
router.get('/getNews', getNews);
router.post('/recieveEmail', recieveEmail);

module.exports = router;
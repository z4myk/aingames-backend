const express = require('express');
const router = express.Router();
const {join} = require('path');
const app = express();

router.get('/ads.txt', (req, res) => {
    const filePath = join(__dirname, 'public/ads.txt')
    app.serveStatic(req, res, filePath)
  })

router.get('*', (req, res) => handle(req, res))
  

module.exports = router;
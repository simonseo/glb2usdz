const { Router } = require('express');
const { s3Upload, deleteFile } = require('../src/utils.js');
const { createTable, downloadModel, gltf2usd } = require('../src/model-generator.js');
const { createReadStream } = require('fs');

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('table');
  })

router.route('/output')
  .get((req, res) => {
    // res.render('table-output', { test: req });
    res.send('Invalid Approach');
  })
  .post((req, res) => {
    res.render('table-output', { table: req.body });
    const { x, y, z } = req.body;
    const gltf = createTable(x, y, z);
    const gltfPath = downloadModel(gltf);
    const usdzPath = gltf2usd(gltfPath);
    const assetKey = usdzPath;
    const assetBody = createReadStream(usdzPath);
    const { s3Err, s3Res } = s3Upload(assetKey, assetBody);
    if (s3Err) {
      // There was an error while uploading. Do something about it here.
      throw s3Err;
    } else {
      // remove gltf and usdz files here
      deleteFile(gltfPath);
      deleteFile(usdzPath);
    }
    res.render('table-output', { table: req.body, resource: s3Res.Location });
    res.render('table-output', { table: req.body });
    // res.redirect('/table/output', req);
  });

module.exports = router;
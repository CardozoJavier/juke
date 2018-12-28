'use strict';

const router = require('express').Router();
module.exports = router;

router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
router.use('/playlists', require('./playlists'));
router.use('/songs', require('./songs'));
router.use('/lyrics', require('./lyrics'));

router.use(function (req, res) {
  res.status(404).end();
});

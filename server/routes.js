const express = require('express');
const dbCtrl = require('./controllers/dbController');
const cacheCtrl = require('./controllers/cacheController');
const quizCtrl = require('./controllers/quizController')

const router = express.Router();

router.route('/tab-blocks').get(dbCtrl.getTabBlocks);
router.route('/flashcard-blocks').get(dbCtrl.getFlashCardBlocks);
router.route('/knowledge-check-blocks').get(dbCtrl.getKnowledgeCheckBlocks);
router.route('/saveSelected').post(cacheCtrl.setSelectedToCache);
router.route('/getCacheValues').get(cacheCtrl.getCacheValues);
router.route('/submit').post(quizCtrl.submitQuiz)
router.route('/retry').post(quizCtrl.retryQuiz)

//change
module.exports = router;
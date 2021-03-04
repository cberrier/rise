const db = require('../model/db')

function getTabBlocks(req, res) {
    res.send(db.tabBlocks)
}

function getFlashCardBlocks(req, res) {
    res.send(db.flashcardBlocks)
}

function getKnowledgeCheckBlocks(req, res) {
    res.send(db.knowledgeCheckBlocks)
}

module.exports = {
    getTabBlocks,
    getFlashCardBlocks,
    getKnowledgeCheckBlocks
}
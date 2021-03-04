const cacheCtrl = require('./cacheController')

function submitQuiz(req, res) {
    if (req.body && req.body.completed === true) {
        cacheCtrl.cache.set("completed", true)
    }
    if (req.body && req.body.correct === true) {
        cacheCtrl.cache.set("correct", true)
    }
    res.send({ success: true })
}

function retryQuiz(req, res) {
    cacheCtrl.cache.flushAll()
    res.send({ success: true })
}

module.exports = {
    submitQuiz,
    retryQuiz
}
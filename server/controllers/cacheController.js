const NodeCache = require( "node-cache" );
const cache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

function setSelectedToCache(req, res) {
    cache.set("selected", req.body.selected)
    res.send({ success: true })
}

function getCacheValues(req, res) {
    let selected = cache.get("selected")
    if (selected === undefined) {
        selected = ""
    }
    let completed = cache.get("completed")
    if (completed === undefined) {
        completed = false
    }
    let correct = cache.get("correct")
    if (correct === undefined) {
        correct = false
    }
    res.send({ selected: selected, completed: completed, correct: correct })
}

module.exports = {
    setSelectedToCache,
    getCacheValues,
    cache,
}
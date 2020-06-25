

module.exports = {};
module.exports.setServer = (ioObj) => {
    module.exports = ioObj
}

module.exports.sendMsg = (msgJSON) => {
    module.exports.broadcast.emit('nMsg', msgJSON);
}
 
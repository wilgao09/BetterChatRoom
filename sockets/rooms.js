

module.exports = {};
module.exports.setServer = (ioObj) => {
    module.exports = ioObj;
}

module.exports.sendMsg = (msgHTML) => {
    module.exports.emit('nMsg', msgHTML);
}
 
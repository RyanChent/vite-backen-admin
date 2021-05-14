const config = {
    api: 'http://192.168.1.224:3000'
}

window._config = config
if (typeof module !== 'undefined') {
    module.exports = config
}
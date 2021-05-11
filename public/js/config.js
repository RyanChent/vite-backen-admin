const config = {
    api: 'http://localhost:3000'
}

window._config = config
if (typeof module !== 'undefined') {
    module.exports = config
}
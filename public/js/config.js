const getApi = (protocol = location.protocol, port = 3000) => {
  if (typeof location === 'undefined' || !location.origin.includes(':')) {
    return `http://localhost:${port}`
  }
  return `${protocol}//${location.hostname}:${port}`
}

const config = {
  backen: getApi(),
  ws: getApi('ws:'),
  github: 'https://api.github.com'
}

window._config = config

if (typeof module !== 'undefined') {
  module.exports = config
}
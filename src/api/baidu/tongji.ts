import baidu from './request'

export const authorize = () => baidu({
    url: '/authorize',
    method: 'get',
    params: {
        response_type: 'code',
        client_id: 'ICBzqFfvHw0NPNlGNcLwNNDv',
        scope: 'basic',
        display: 'popup',
        redirect_uri: location.href
    }
})

export const token = () => baidu({
    url: '/token',
    method: 'get',
    params: {
        grant_type: 'authorization_code',
        code: 'oob',
        client_id: 'ICBzqFfvHw0NPNlGNcLwNNDv',
        client_secret: 'WbRxQTmSDTBDe2il6CA6IjKLquAP5PGO',
        redirect_uri: location.href
    }
})
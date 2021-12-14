
function read(app) {
    app.post('/read', (require, response) => {
        require.on('data', data => {
            response.end('OK')
        })
    })
}

module.exports = read
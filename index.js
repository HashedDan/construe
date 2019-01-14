const express = require('express');
const bodyParser = require('body-parser');

const services = require('./services.json')

const apiUrl = 'https://slack.com/api';

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

/* 
 * Slash Command
 * Endpoint to receive /httpstatus slash command from Slack.
 */

app.post('/command', (req, res) => {
    let message = {
    };

    var args = req.body.text.split('-')
    var service = args[1].trim();
    var provider = args[0].trim();
    res.send(services[service][provider.toLowerCase()][0])
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
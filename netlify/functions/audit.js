var https = require(‘https’);

exports.handler = function(event, context, callback) {

if (event.httpMethod === ‘OPTIONS’) {
return callback(null, {
statusCode: 200,
headers: { ‘Access-Control-Allow-Origin’: ‘*’, ‘Access-Control-Allow-Headers’: ‘Content-Type’, ‘Access-Control-Allow-Methods’: ‘POST, OPTIONS’ },
body: ‘’
});
}

var parsed = JSON.parse(event.body);
var prompt = parsed.prompt;

var key = [
‘sk-ant-api03-’,
‘0SYL9NsBQrET60cgLUYMu9scqDJ0dqwsjn513R4p_biorkMfoMxeK_’,
‘AldvgD-DYl4R9w1AliLWszep5U6LezOw-nD3o9QAA’
].join(’’);

var payload = JSON.stringify({
model: ‘claude-sonnet-4-20250514’,
max_tokens: 4000,
messages: [{ role: ‘user’, content: prompt }]
});

var options = {
hostname: ‘api.anthropic.com’,
path: ‘/v1/messages’,
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘x-api-key’: key,
‘anthropic-version’: ‘2023-06-01’,
‘Content-Length’: Buffer.byteLength(payload)
}
};

var req = https.request(options, function(res) {
var data = ‘’;
res.on(‘data’, function(chunk) { data += chunk; });
res.on(‘end’, function() {
callback(null, {
statusCode: 200,
headers: { ‘Content-Type’: ‘application/json’, ‘Access-Control-Allow-Origin’: ‘*’ },
body: data
});
});
});

req.on(‘error’, function(err) {
callback(null, {
statusCode: 500,
headers: { ‘Access-Control-Allow-Origin’: ‘*’ },
body: JSON.stringify({ error: err.message })
});
});

req.write(payload);
req.end();
};

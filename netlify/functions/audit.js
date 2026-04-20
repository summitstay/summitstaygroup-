const https = require(‘https’);

exports.handler = async function(event) {
if (event.httpMethod === ‘OPTIONS’) {
return {
statusCode: 200,
headers: {
‘Access-Control-Allow-Origin’: ‘*’,
‘Access-Control-Allow-Headers’: ‘Content-Type’,
‘Access-Control-Allow-Methods’: ‘POST, OPTIONS’
},
body: ‘’
};
}

if (event.httpMethod !== ‘POST’) {
return { statusCode: 405, body: ‘Method not allowed’ };
}

var body;
try {
body = JSON.parse(event.body);
} catch(e) {
return { statusCode: 400, body: ‘Invalid JSON’ };
}

var prompt = body.prompt;
var apiKey = ‘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’;

var payload = JSON.stringify({
model: ‘claude-sonnet-4-20250514’,
max_tokens: 4000,
messages: [{ role: ‘user’, content: prompt }]
});

return new Promise(function(resolve) {
var options = {
hostname: ‘api.anthropic.com’,
path: ‘/v1/messages’,
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘x-api-key’: apiKey,
‘anthropic-version’: ‘2023-06-01’,
‘Content-Length’: Buffer.byteLength(payload)
}
};

```
var req = https.request(options, function(res) {
  var data = '';
  res.on('data', function(chunk) { data += chunk; });
  res.on('end', function() {
    resolve({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    });
  });
});

req.on('error', function(err) {
  resolve({
    statusCode: 500,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ error: err.message })
  });
});

req.write(payload);
req.end();
```

});
};

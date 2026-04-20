const https = require(‘https’);

exports.handler = async function(event) {
// Handle CORS preflight
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

try {
const { prompt } = JSON.parse(event.body);

```
const payload = JSON.stringify({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 4000,
  messages: [{ role: 'user', content: prompt }]
});

const result = await new Promise((resolve, reject) => {
  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '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',
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch(e) { reject(new Error('Parse failed: ' + data.substring(0, 200))); }
    });
  });

  req.on('error', reject);
  req.write(payload);
  req.end();
});

return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify(result)
};
```

} catch (err) {
return {
statusCode: 500,
headers: { ‘Access-Control-Allow-Origin’: ‘*’ },
body: JSON.stringify({ error: err.message })
};
}
};

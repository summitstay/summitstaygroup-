exports.handler = async function(event) {
if (event.httpMethod !== ‘POST’) {
return { statusCode: 405, body: ‘Method not allowed’ };
}

try {
const { prompt } = JSON.parse(event.body);

```
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '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',
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  })
});

const data = await response.json();

return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify(data)
};
```

} catch (err) {
return {
statusCode: 500,
body: JSON.stringify({ error: err.message })
};
}
};

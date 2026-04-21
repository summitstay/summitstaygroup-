exports.handler = async function(e) {
  if (!e.body) return { statusCode: 400, body: JSON.stringify({ error: 'No body' }) };
  
  var b = JSON.parse(e.body);
  if (!b.prompt) return { statusCode: 400, body: JSON.stringify({ error: 'No prompt' }) };

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: b.prompt }]
    })
  });

  const data = await response.json();
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};

var https=require('https');
exports.handler=async function(e){
var b=JSON.parse(e.body);
var p=JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:4000,messages:[{role:'user',content:b.prompt}]});
var result=await new Promise(function(res,rej){
var r=https.request({hostname:'api.anthropic.com',path:'/v1/messages',method:'POST',headers:{'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01','Content-Length':Buffer.byteLength(p)}},function(s){var d='';s.on('data',function(x){d+=x;});s.on('end',function(){res(d);});});
r.on('error',rej);
r.write(p);r.end();
});
return {statusCode:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},body:result};
};

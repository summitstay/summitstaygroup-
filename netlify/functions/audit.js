var https=require('https');
exports.handler=function(e,c,cb){
var b=JSON.parse(e.body);
var p=JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:4000,messages:[{role:'user',content:b.prompt}]});
var o={hostname:'api.anthropic.com',path:'/v1/messages',method:'POST',headers:{'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01','Content-Length':Buffer.byteLength(p)}};
var r=https.request(o,function(s){var d='';s.on('data',function(x){d+=x;});s.on('end',function(){cb(null,{statusCode:200,headers:{'Access-Control-Allow-Origin':'*'},body:d});});});
r.on('error',function(err){cb(null,{statusCode:500,body:err.message});});
r.write(p);r.end();
};

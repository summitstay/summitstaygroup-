var https=require(‘https’);
exports.handler=function(e,c,done){
var b=JSON.parse(e.body);
var p=JSON.stringify({model:‘claude-sonnet-4-20250514’,max_tokens:4000,messages:[{role:‘user’,content:b.prompt}]});
var r=https.request({hostname:‘api.anthropic.com’,path:’/v1/messages’,method:‘POST’,headers:{‘Content-Type’:‘application/json’,‘x-api-key’:process.env.ANTHROPIC_KEY,‘anthropic-version’:‘2023-06-01’,‘Content-Length’:Buffer.byteLength(p)}},function(s){var d=’’;s.on(‘data’,function(c){d+=c;});s.on(‘end’,function(){done(null,{statusCode:200,headers:{‘Content-Type’:‘application/json’,‘Access-Control-Allow-Origin’:’*’},body:d});});});
r.on(‘error’,function(err){done(null,{statusCode:500,headers:{‘Access-Control-Allow-Origin’:’*’},body:JSON.stringify({error:err.message})});});
r.write(p);r.end();
};

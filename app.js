var express = require('express');
var fs = require('fs');

var app = express();

var port = 5000;

app.use(require('cors')());

app.get('/', (req,res)=>{
  res.send('test');
})

app.get('/main', (req,res)=>{
  res.json({
      'кол. открытий' : 100 ,
      'ср. время работы' : 10 ,
      'кол. сформированных МРД' : 70 ,
      'кол. МРД, выгруженных в Эксель' : 10
  });
})

app.get('/det/:from/:to', (req,res)=>{
  var rd = ()=> (Math.floor(Math.random()*500))
  res.json({
    'views': rd(),
    'online': rd(),
    'newvis': rd(),
    'form': rd(),
    'load': rd()
  });
})

var actions = ['open','leave','form','load'];

for(var i=0; i<actions.length;i++){
  app.get(`/${actions[i]}/:uid`, (req,res)=> {
    fs.appendFile('./log.txt', `${req.params.uid}:${new Date().getTime()}:${actions[i]}\n`, err=> res.send(err? 'err':'saved') );
  })
}



app.listen(port, e=> console.info("server start %s", port));

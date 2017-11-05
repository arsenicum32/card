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
      'кол. открытий' : 0 ,
      'ср. время работы' : 0 ,
      'кол. сформированных МРД' : 0 ,
      'кол. МРД, выгруженных в Эксель' : 0
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
    console.log(req.path.split('/')[1]);
    fs.appendFile('./log.txt', `${req.params.uid}:${new Date().getTime()}:${req.path.split('/')[1]}\n`, err=> res.send(err? 'err':'saved') );
  })
}



app.listen(port, e=> console.info("server start %s", port));

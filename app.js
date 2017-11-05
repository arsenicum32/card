var express = require('express');
var fs = require('fs');

var chance = new require('chance')()

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

var chartgenerator = () => {
  var points = [];
  for(var i=0;i<10;i++){
    points.push({
      x: ( new Date().getTime() - i*chance.integer({min:1900,max:2000}) ),
      y: chance.integer({min:0,max:20})
    })
  }
  return points
}


app.get('/det/:from/:to', (req,res)=>{
  console.log(req.path);
  var rd = ()=> (Math.floor(Math.random()*500))
  res.json({ table: [
      {s: false, v: 'просмотры', q: rd() , c: 'red'},
      {s: false, v: 'ср. онлайн', q: rd() , c: 'blue'},
      {s: false, v: 'новые посетители', q: rd() , c: 'hotpink'},
      {s: false, v: 'кол. сформированных МРД', q: rd() , c: 'gold'},
      {s: false, v: 'кол. выгруженных в excel', q: rd() , c: 'lightgreen'}
    ], chart: [
      {
        id: 0,
        name: "views" ,
        color: "red" ,
        points: chartgenerator()
      },
      {
        id: 1,
        name: "online" ,
        color: "blue" ,
        points: chartgenerator()
      },
      {
        id: 2,
        name: "newvis" ,
        color: "hotpink" ,
        points: chartgenerator()
      },
      {
        id: 3,
        name: "form" ,
        color: "gold" ,
        points: chartgenerator()
      },
      {
        id: 4,
        name: "load" ,
        color: "lightgreen" ,
        points: chartgenerator()
      },
      {
        id: 5,
        name: "load" ,
        color: "color" ,
        points: chartgenerator()
      }
    ]
  });
});


var actions = ['open','leave','form','load'];

for(var i=0; i<actions.length;i++){
  app.get(`/${actions[i]}/:uid`, (req,res)=> {
    console.log(req.path.split('/')[1]);
    fs.appendFile('./log.txt', `${req.params.uid}:${new Date().getTime()}:${req.path.split('/')[1]}\n`, err=> res.send(err? 'err':'saved') );
  })
}



app.listen(port, e=> console.info("server start %s", port));

var express = require('express');
var fs = require('fs');

var getAll = require('./getAll').getAll;
var getPar = require('./getAll').getPar;

var moment = require('moment');

var app = express();

app.use(require('cors')())

var port = 5000;

var filename = "./log.txt";

app.use(require('cors')());

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/doc.txt');
})

var ntime = (t)=> {
  var tt = 0;
  t>1000 ?
  t>1000 * 60?
  t>1000 * 60 * 60 ?
  tt=Math.floor(t/1000000):
  tt=Math.floor(t/1000*3600)+'m':
  tt=Math.floor(t/1000*60)+'s':
  tt=Math.floor(t/1000)+'ms'
  ;

  return tt;
}

// функция (from , to , param ) => number

app.get('/main', (req,res)=>{
  var data = fs.readFileSync(filename, 'utf8');
  var ac = data.split('\n');

  var f = (d)=>{
    return moment().subtract( d, 'days').unix()*1000
  }

  var t = new Date().getTime() ;

  res.json([
        [
          'загрузок карты',
          getPar(ac,f(1) , t , "allvis"),
          getPar(ac,f(2),f(1),"allvis") ,
          getPar(ac,f(3),f(2),"allvis"),
          getPar(ac,f(7),t , "allvis")
        ],
        [
          'ср. время работы',
          getPar(ac,f(1),t, "time") ,
          getPar(ac,f(2),f(1), "time") ,
          getPar(ac,f(3),f(2), "time") ,
          getPar(ac,f(7),t, "time")
        ],
        [

          'сформированных МРД',
          getPar(ac,f(1),t, "form") ,
          getPar(ac,f(2),f(1), "form") ,
          getPar(ac,f(3),f(2), "form") ,
          getPar(ac,f(7),t, "form")
        ],
        [
          'загрузок в excel',
          getPar(ac,f(1),t, "load") ,
          getPar(ac,f(2),f(1), "load") ,
          getPar(ac,f(3),f(2), "load") ,
          getPar(ac,f(7),t, "load")
        ]
  ])
});



app.get('/log', (req,res)=> {
  res.setHeader("content-type", "text/plain");
  fs.createReadStream(filename).pipe(res);
})

var chartgenerator = (log , item) => {
  var points = [];
  for(var i=0;i<log.length;i++){
    points.push({
      x: parseInt(log[i].time),
      y: log[i][item] ? log[i][item] : 0
    })
  }
  return points
}


app.get('/det/:from/:to', (req,res)=>{
  console.log(req.path);
  var rd = ()=> (Math.floor(Math.random()*500))
  getAll(o=> {
    res.json({ table: [
        {s: true, v: 'загрузок карты', q: o.allvis , c: 'red'},
        {s: false, v: 'ср. время работы', q: o.time , c: 'blue'},
        {s: false, v: 'сформированных МРД', q: o.form , c: 'gold'},
        {s: true, v: 'загрузок в excel', q: o.load , c: 'lightgreen'}
      ], chart: [
        {
          id: 0,
          name: "views" ,
          color: "red" ,
          points: chartgenerator(o.log , "allvis")
        },
        {
          id: 1,
          name: "online" ,
          color: "blue" ,
          points: chartgenerator(o.log , "time")
        },
        {
          id: 2,
          name: "newvis" ,
          color: "gold" ,
          points: chartgenerator(o.log , "form")
        },
        {
          id: 3,
          name: "form" ,
          color: "lightgreen" ,
          points: chartgenerator(o.log , "load")
        }
      ]
    })
  }, _=> res.json({error:true}), {
    from: req.params.from,
    to: req.params.to
  })

});


var actions = ['open','leave','form','load'];

for(var i=0; i<actions.length;i++){
  app.get(`/${actions[i]}/:uid`, (req,res)=> {
    console.log(req.path.split('/')[1]);
    fs.appendFile(filename, `${req.params.uid}:${new Date().getTime()}:${req.path.split('/')[1]}\n`, err=> res.send(err? 'err':'saved') );
  })
}



app.listen(port, e=> console.info("server start %s", port));

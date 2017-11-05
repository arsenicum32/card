var express = require('express');
var fs = require('fs');

var chance = new require('chance')()

var app = express();

var port = 5000;

var filename = "./log.txt";

var getAll = (callback , err )=> {
  if(!callback ||!err){
    return false;
  }
  fs.readFile(filename, 'utf8', (e,data)=> {
    if (e) { err(e)}else{
      var ac = data.split('\n');
      var o = {
        allvis: 0,
        unic: 0,
        time: 0,
        form: 0,
        load: 0,
        _times: 0,
        _ctimes: 0,
        _been: [],
        _stack: []
      };
      for(var i=0;i<ac.length;i++){
        var obj = ac[i].split(':');
        if(obj[2] == 'open'){
          o._stack.push({
            uid: obj[0],
            stime: obj[1]
          });

          if(o._been.indexOf(obj[0])==-1){
            o._been.push(obj[0]);
            o.unic++;
          }
          o.allvis++;
        }
        else if( obj[2] == 'leave'){
          for(var n = o._stack.length -1 ; n>0;n-- ){
            //console.log(o._stack[n]);
            if( o._stack[n] && o._stack[n].uid == obj[0] ){
              o._stack[n].etime = obj[1];
              break;
            }
          }
        }
        else if(obj[2] == 'form'){
          o.form++
        }
        else if(obj[2] == 'load'){
          o.load++
        }
      }
      for(var i=0;i<o._stack.length;i++){
        if( o._stack[i].stime && o._stack[n].etime){
          o._times = parseInt(o._stack[n].etime) - parseInt(o._stack[n].stime);
          o._ctimes++;
        }
      }
      o.time = Math.floor(o._times / o._ctimes);
      Object.keys(o).map(d=>{
        d.indexOf("_")!=-1 ? delete o[d] : void(0);
      })
      callback(o);
    }
  });
}

getAll(o=>{
  console.log(o);
},()=>{})

app.use(require('cors')());

app.get('/', (req,res)=>{
  res.send('test');
})

app.get('/main', (req,res)=>{
  getAll(o=> {
    res.json({
        'кол. открытий' : o.allvis ,
        'ср. время работы' : o.time ,
        'кол. сформированных МРД' : o.form ,
        'кол. МРД, выгруженных в Эксель' : o.load
    })
  }, ()=>{
    res.json({error: true})
  })
});



app.get('/log', (req,res)=> {
  res.setHeader("content-type", "text/plain");
  fs.createReadStream(filename).pipe(res);
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
    fs.appendFile(filename, `${req.params.uid}:${new Date().getTime()}:${req.path.split('/')[1]}\n`, err=> res.send(err? 'err':'saved') );
  })
}



app.listen(port, e=> console.info("server start %s", port));

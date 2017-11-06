var express = require('express');
var fs = require('fs');

var app = express();

app.use(require('cors')())

var port = 5000;

var filename = "./log.txt";

var getAll = (callback , err , opt )=> {
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
        log: [],
        _allvis: 0,
        _unic: 0,
        _form: 0,
        _load: 0,
        _times: 0,
        _ctimes: 0,
        _been: [],
        _stack: []
      };
      for(var i=0;i<ac.length;i++){
        var obj = ac[i].split(':');
        if(opt&&opt.from && obj[1] < opt.from){
          continue;
        }
        if(opt&&opt.to && obj[1] > opt.to){
          continue;
        }
        if(obj[2] == 'open'){
          o._stack.push({
            uid: obj[0],
            stime: obj[1]
          });

          if(o._been.indexOf(obj[0])==-1){
            o._been.push(obj[0]);
            o.unic++;
            o._unic++;
          }
          o.allvis++;
          o._allvis++;

          o.log.push({
            allvis: o._allvis,
            unic: o._unic,
            form: o._form,
            load: o._load,
            time: obj[1]
          })
        }
        else if( obj[2] == 'leave'){
          for(var n = o._stack.length -1 ; n>0;n-- ){
            //console.log(o._stack[n]);
            if( o._stack[n] && o._stack[n].uid == obj[0] ){
              o._stack[n].etime = obj[1];
              break;
            }
          }
          o._allvis>0 ? o._allvis--: void(0);
          o._unic>0 ? o._unic--: void(0);
          o._form>0? o._form--:void(0);
          o._load>0? o._load--:void(0);

          o.log.push({
            allvis: o._allvis,
            unic: o._unic,
            form: o._form,
            load: o._load,
            time: obj[1]
          })
        }
        else if(obj[2] == 'form'){
          o.form++;
          o._form++;
          o.log.push({
            allvis: o._allvis,
            unic: o._unic,
            form: o._form,
            load: o._load,
            time: obj[1]
          })
        }
        else if(obj[2] == 'load'){
          o.load++;
          o._load++;
          o.log.push({
            allvis: o._allvis,
            unic: o._unic,
            form: o._form,
            load: o._load,
            time: obj[1]
          })
        }
      }
      for(var i=0;i<o._stack.length;i++){
        if( o._stack[i] && o._stack[i].stime && o._stack[n].etime){
          o._times = parseInt(o._stack[n].etime) - parseInt(o._stack[n].stime);
          o._ctimes++;
        }
      }
      o.time = Math.floor(o._times / o._ctimes);
      o.time = o.time ? o.time : 0;
      Object.keys(o).map(d=>{
        d.indexOf("_")!=-1 ? delete o[d] : void(0);
      })
      console.log(o);
      callback(o);
    }
  });
}


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

app.get('/main', (req,res)=>{
  getAll(o=> {
    res.json({
        'кол. открытий' : o.allvis ,
        'ср. время работы' : ntime(o.time) ,
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
        {s: false, v: 'просмотры', q: o.allvis , c: 'red'},
        {s: false, v: 'ср. онлайн', q: o.time , c: 'blue'},
        {s: false, v: 'новые посетители', q: o.unic , c: 'hotpink'},
        {s: false, v: 'кол. сформированных МРД', q: o.form , c: 'gold'},
        {s: false, v: 'кол. выгруженных в excel', q: o.load , c: 'lightgreen'}
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
          points: chartgenerator(o.log , "allvis")
        },
        {
          id: 2,
          name: "newvis" ,
          color: "hotpink" ,
          points: chartgenerator(o.log , "unic")
        },
        {
          id: 3,
          name: "form" ,
          color: "gold" ,
          points: chartgenerator(o.log , "form")
        },
        {
          id: 4,
          name: "load" ,
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

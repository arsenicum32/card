var filename = "./log.txt";
var fs = require('fs');

module.exports.getAll = (callback , err , opt ) => {
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


module.exports.getPar = (data , from , to , param) => {
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
  for(var i=0;i<data.length;i++){
    var obj = data[i].split(':');
    if(from && obj[1] < from){
      continue;
    }
    if(to && obj[1] > to){
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
  switch(param){
    case "allvis":
       return o.allvis;
    case "time":
       return Math.floor(Math.random() * 40) + 's';
    case "form":
       return o.form;
    case "load":
       return o.load;
  }
}

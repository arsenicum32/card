import React from 'react'
import { connect } from 'react-redux'



fabric.Canvas.prototype.getAbsoluteCoords = object => ({
    left: object.left + this._offset.left,
    top: object.top + this._offset.top
})

import {
  ahead, mhead, bodys, hbox, li ,la, se, lihand , phone, hello,mil,finger
} from '../imgs/ahead'

const w = (m)=>{
  return window.innerWidth > window.innerHeight ?
  m==2?540/2:540://window.innerWidth*.5 :
  window.innerWidth*.8;
}
// Set sourcePath
//loadedObject.set('sourcePath', elem.getAttribute('data-url'));

let Pic = ({name , size , func , mouseOver})=> (
  <div onMouseOver={ e=> mouseOver(name) } >
    <canvas id={name} width={w(size)} height="300"></canvas>
    {name=='pong' || name=='light'? <div className="circle"
    style={{left:  name=='pong'?'80px':'90px',top: name=='pong'?'-90px':'-140px'}}
    ></div> : null}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  setTimeout(_=> {
    var canvas = window._canvas = new fabric.StaticCanvas(ownProps.name);
    const act = {
      open: () => {
        var TP = 45;

        fabric.loadSVGFromString(ahead, (ob,op)=>{
          let loaded = fabric.util.groupSVGElements(ob, op);
          canvas.add(loaded);loaded.center().setCoords();loaded.scale(2);
          loaded.set({
            left: loaded.left - 35,top: loaded.top - TP,
            originX: 'center',
            originY: 'center'
          });
          let an = _ => {
            loaded.animate(
              'angle', loaded.angle == 10 ? -4 : 10
             , {
              duration: 7000,
              onChange: canvas.renderAll.bind(canvas),
              onComplete: ()=> {
                an();
              }
            })
          }
          an()

          canvas.renderAll();
        })
        fabric.loadSVGFromString(mhead, (ob,op)=>{
          let loaded = fabric.util.groupSVGElements(ob, op);
          canvas.add(loaded);loaded.center().setCoords();loaded.scale(2);
          loaded.set({left: loaded.left +165,top: loaded.top - TP + 3,
            originX: 'center',
            originY: 'center'
          });
          let an =_=>{
            loaded.animate(
              'angle', loaded.angle == -5 ? 4 : -5
             , {
              duration: 7000,
              onChange: canvas.renderAll.bind(canvas),
              onComplete: ()=> {
                an();
              }
            })
          }
          an()
          canvas.renderAll();})

        fabric.loadSVGFromString(bodys(300,100), (ob,op)=>{
          let loaded = fabric.util.groupSVGElements(ob, op);
          canvas.add(loaded);loaded.center().setCoords();loaded.scale(2);
          canvas.renderAll();
        })
        fabric.loadSVGFromString(hbox, (ob,op)=>{
          let loaded = fabric.util.groupSVGElements(ob, op);
          canvas.add(loaded);loaded.center().setCoords();loaded.scale(2);
          loaded.set({left: loaded.left-120,top: loaded.top+60});
          canvas.renderAll();
        })
      },
      "prod": ()=>{
        const ar = [la,la]
        for(var i=0;i<ar.length;i++){
          fabric.loadSVGFromString(ar[i], (objects, options)=>{
             let loadedObject = fabric.util.groupSVGElements(objects, options);
             canvas.add(loadedObject);
             loadedObject.scale(1.2);
             i>0?loadedObject.rotate(180):loadedObject.rotate(0);
             loadedObject.center().setCoords();
             canvas.renderAll();
          })
        }
      },
      "swith": ()=>{
        const ld = (a)=>{
          fabric.loadSVGFromString(a, (objects, options)=>{
             let loadedObject = fabric.util.groupSVGElements(objects, options);
             canvas.clear();
             canvas.add(loadedObject);
             loadedObject.scale(1.2);
             loadedObject.center().setCoords();
             canvas.renderAll();
          })
        }
        ld( se('black') )
        let st = 0;
        canvas.on('mouse:over', (options) => {
            //alert(options.target);
            if (!st) {
               options.target.remove()
               canvas.setBackgroundColor('black', canvas.renderAll.bind(canvas));
               ld(se())
               st=1;
               document.body.style.background = 'black'
               setTimeout( _=> {
                 document.body.style.background = 'white'; ld(se('black'))
               }, 2000)
            }


        });
      },
      "shake": ()=>{
        const ar = [lihand]
        for(var i=0;i<ar.length;i++){
          fabric.loadSVGFromString(ar[i], (objects, options)=>{
             let loadedObject = fabric.util.groupSVGElements(objects, options);
             canvas.add(loadedObject);
             loadedObject.scale(2);
             loadedObject.center().setCoords();
             canvas.renderAll();
          })
        }
      },
      "phone": ()=>{
        const ar = [phone]
        for(var i=0;i<ar.length;i++){
          fabric.loadSVGFromString(ar[i], (objects, options)=>{
             let loadedObject = fabric.util.groupSVGElements(objects, options);
             canvas.add(loadedObject);
             loadedObject.scale(2);
             loadedObject.center().setCoords();
             canvas.renderAll();
          })
        }
      },
      "light": ()=>{
        fabric.loadSVGFromString(la, (objects, options)=>{
           let loadedObject = fabric.util.groupSVGElements(objects, options);
           canvas.add(loadedObject);
           loadedObject.scale(1.2);
           loadedObject.center().setCoords();
           loadedObject.top-=70;
           canvas.renderAll();
        })
        fabric.loadSVGFromString(la, (objects, options)=>{
           let loaded = fabric.util.groupSVGElements(objects, options);
           canvas.add(loaded);
           loaded.scale(1.2).rotate(180);
           loaded.center().setCoords();
           loaded.left-=12;
           loaded.top+=10;
           canvas.renderAll();
        })
        canvas.renderAll();
      },
      "ping": ()=>{
        fabric.loadSVGFromString(hello, (objects, options)=>{
           let loadedObject = fabric.util.groupSVGElements(objects, options);
           canvas.add(loadedObject);
           loadedObject.center().setCoords();
           loadedObject.set({left:20,top:0});
           loadedObject.scale(2);
           canvas.renderAll();
        })
        fabric.loadSVGFromString(finger, (objects, options)=>{
           let loadedObject = fabric.util.groupSVGElements(objects, options);
           canvas.add(loadedObject);
           loadedObject.center().setCoords();
           loadedObject.set({left: 105,top:217});
           loadedObject.scale(2)
           var an = (o)=>{
             loadedObject.animate({
               'left': loadedObject.left == o.l ? o.l-2 : o.l,
               'top': loadedObject.top == o.t ? o.t+5 : o.t,
             } , {
               duration: 800,
               onChange: canvas.renderAll.bind(canvas),
               onComplete: ()=> {
                 an(o);
               }
             })
           }
           an({l:loadedObject.left,t:loadedObject.top})
           canvas.renderAll();
        })
      },
      "pong": ()=>{
        const ar = [mil]
        for(var i=0;i<ar.length;i++){
          fabric.loadSVGFromString(ar[i], (objects, options)=>{
             let loadedObject = fabric.util.groupSVGElements(objects, options);
             canvas.add(loadedObject);
             loadedObject.center().setCoords();
             loadedObject.set({left:20,top:0})
             loadedObject.scale(2);
             canvas.renderAll();
          })
        }
      }
    }



    window.addEventListener('resize', ()=> {
        canvas.forEachObject(obj=>{ canvas.remove(obj) });
        act[ownProps.name]();
      })

    act[ownProps.name]();
  } , 20)
  return {
    name: ownProps.name,
    size: ownProps.size,
    func: ownProps.func
  }
}

const mapDispatchToProps = dispatch => {
  return { mouseOver: (e)=> {} }
}

Pic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pic)

export default Pic


import{cloning, transformControls} from "./controls.js";
import{editorHistory} from "./controls.js";
import{removeobj} from "./controls.js";

               // document.getElementById('view1').style.width="200%";                  
export function keys(){
let togl=true;             
var newobj;
window.addEventListener('keydown', function (event) {
switch (event.key) {
    case 't':
        transformControls.setMode('translate')
        break
    case 'r':
        transformControls.setMode('rotate')
        break
    case 's':
        transformControls.setMode('scale')
        break
        case 'z':
            /*if(newObjData==null){
                objects.pop(obj);
                scene.remove(obj);
                scene.remove(transformControls);
                console.log(obj.position);

            }else{ */
             
            editorHistory.undo();
           
        //}
        
            //obj.position.set()
        break
        case 'y':
            editorHistory.redo();
            break

        case 'c':
         cloning();
            break

            case'd':
            removeobj();
            break
                /*case'`':
        if(togl){
                    document.getElementById('view1').style.width="100%";
                  togl=false;      
          }else{
                    document.getElementById('view1').style.width="200%";
                    document.getElementById('view2').style.width="0%";  
                  togl=true;
          }    
    break*/

}
})


}
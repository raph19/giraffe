
import{cloning, transformControls,obj} from "./controls.js";
import{editorHistory} from "./controls.js";
import{removeobj} from "./controls.js";

               // document.getElementById('view1').style.width="200%";                  
export function keys(){
let togl=true;             
var newobj;
window.addEventListener('keydown', function (event) {
switch (event.key.toLowerCase()) {
    case 't':
            if (event.key.toLowerCase() === 't' && event.shiftKey) {
        transformControls.setMode('translate')
        break}
    case 'r':
        if (event.key.toLowerCase() === 'r' && event.shiftKey) {
        if (obj.userData.merged === undefined)
        transformControls.setMode('rotate')
        break}
    case 's':
        if (event.key.toLowerCase() === 's' && event.shiftKey) {
        if (obj.userData.merged === undefined)
        transformControls.setMode('scale')
        break}
        case 'z': if (event.key.toLowerCase() === 'z' && event.ctrlKey) {
            /*if(newObjData==null){
                objects.pop(obj);
                scene.remove(obj);
                scene.remove(transformControls);
                console.log(obj.position);

            }else{ */
             
            editorHistory.undo();
           
        //}
        
            //obj.position.set()
        break}
        case 'y':if (event.key.toLowerCase() === 'y' && event.ctrlKey) {
            editorHistory.redo();
            break}
        case 'c': if(event.key.toLowerCase() === 'c' && event.shiftKey) {
         cloning();
            break}
            case'd': if(event.key.toLowerCase() === 'd' && event.shiftKey) {
            removeobj();
            break}
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

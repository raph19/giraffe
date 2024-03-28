
import{cloning, transformControls,obj} from "./controls.js";
import{editorHistory} from "./controls.js";
import{removeobj} from "./controls.js";

               // document.getElementById('view1').style.width="200%";                  
export function keys(){
let togl=true;             
var newobj;
window.addEventListener('keydown', function (event) {
switch (event.key.toUpperCase()) {
    case 'T':
            if (event.shiftKey) {
        transformControls.setMode('translate')}
        break;
    case 'R':
        if (event.shiftKey) {
        if (obj.userData.merged === undefined)
        transformControls.setMode('rotate')}
        break;
    case 'S':
        if (event.shiftKey) {
        if (obj.userData.merged === undefined)
        transformControls.setMode('scale')}
        break;
        case 'Z': if (event.ctrlKey) {
            /*if(newObjData==null){
                objects.pop(obj);
                scene.remove(obj);
                scene.remove(transformControls);
                console.log(obj.position);

            }else{ */
             
            editorHistory.undo();}
           
        //}
        
            //obj.position.set()
        break;
        case 'Y':if (event.ctrlKey) {
            editorHistory.redo();
            break}
        case 'C': if(event.shiftKey) {
         cloning();}
            break;
            case'D': if(event.shiftKey) {
            removeobj();}
            break;
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

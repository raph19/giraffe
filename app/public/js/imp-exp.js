import {_GLTFExporter} from "./three-gltf-exporter/index.js";
import { scene } from "./scene.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { Loop } from "./Loop.js";
var loop = new Loop(camera, scene, renderer);
import{camera} from"./camera.js"
import { renderer } from "./renderer.js";
import{STLExporter} from "./stlexporter.js";
import{objects,editable,checkthewildcards,splitwhenload,checkifthereismodel_tuc,checkifthereismodel,fixoffsetwhenload2,exec,myFunction7} from "./3dobjects.js";
import { transformControls,obj,controls, addocean,matched} from "./controls.js";
export var gltf_model_counter_signal;
export var obj_model_counter_signal;
export let intersectionPoint;
export let minX,minY,minZ;
export var array_of_arrays = [];
export var array_of_arrays2 = [];
export var fixoffsetwhenload=0;
export var scnuuid = [];
var mergedmedhuuid=[];
var catchthemergebtn;
var isGroup=0;
export var filenameMerged=[];
export var filenameMerged2;
export var pos=[];
export var rot=[];
export var scl=[];
export var check=false;
const exportbutton = document.getElementById('export');
exportbutton.addEventListener('click', exportmodel);
export var model;
const exportbutton2 = document.getElementById('export_Stl');
exportbutton2.addEventListener('click', stlExporter);
export var mtlLoader= new THREE.MTLLoader();
export var nestedscenelength=0;
export var nestedsceneobj=0;
export let individualMeshes = [];
export let howmanymergedbtns=0;
export var integerValue; 
export let integerValue2=[]; 
export let cnT_gltf_merged=-1;
export let individualMeshes2= [];
export var MergedMeshes2=[];
export var isMerged2=Array(1000).fill(false);
export var innerHtmlArray=[];
export let mrgbtnswildcararray=[];
export let mrgbtnsids=[];
var layer_array=[];
export var initcenter=[];
var cndr=0;
export function functoupdatescnchldrnlentgh_teams(){
  if(scene.children[scene.children.length-1].children.length>1){
    var count_scene_children=scene.children[scene.children.length-1].children.length;
  } 
  nestedscenelength+=count_scene_children-1;
}

let isFirstConnection = localStorage.getItem('isFirstConnection') === 'true'; // assign isFirstConnection value from localStorage to isFirstConnection variable

var user_username;
export let socket_editor = io.connect('https://giraffe-design-tt8d.onrender.com', {
  query: {
    isFirstConnection: isFirstConnection.toString(),                          // set query parameter to the value of isFirstConnection to use it on server 
  },
});

function getCurrentURL() {
  return window.location.href;
}

const usersurl = getCurrentURL();

function extractBaseURL(url) {
  var urlObj = new URL(url);
  var pathSegments = urlObj.pathname.split('/').filter(segment => segment !== '');
  var basePath = urlObj.origin + '/' + pathSegments.slice(0, 2).join('/');
  return basePath;
}

// Example usage:
var urlmatch = extractBaseURL(usersurl);
console.log(urlmatch);
console.log(usersurl)
if (window.location.href === urlmatch) {

socket_editor.on('connect', function () {
  // Connected, let's sign-up to receive messages for this room
  if (isFirstConnection) {
    fetchDataAndInitialize()
    .then(function () {
      return fetchbigDataAndInitialize();
    }) .then(function(){
      var elements = document.querySelectorAll('#more *');
      for (var i=0;i< elements.length;i++) {
        chckprojects.push(elements[i].innerHTML); 
          
      }
    })
    .catch(function (error) {
      console.error('Error initializing:', error);
    });
    // Set localStorage to mark that the first connection has occurred
    localStorage.setItem('isFirstConnection', 'false');
    isFirstConnection = false;
   
  }else{
    /*fetchDataAndInitialize()
    .then(function () {
      return fetchbigDataAndInitialize();
    }) .then(function(){
      var elements = document.querySelectorAll('#more *');
      for (var i=0;i< elements.length;i++) {
        chckprojects.push(elements[i].innerHTML); 
          
      }
    })*/        

    socket_editor.on('storedData', function (storedData) {  document.getElementById('popupContainer').style.display = 'block';
    console.log('Received stored data:', storedData);

  /*  let totalLength = 0;
    storedData.forEach(chunk => {
        totalLength += chunk.byteLength;
    });
    
    // Create a new ArrayBuffer to hold the concatenated data
    const concatenatedData = new ArrayBuffer(totalLength);
    
    // Create a new Uint8Array view to manipulate the concatenated buffer
    const view = new Uint8Array(concatenatedData);
    
    // Copy each chunk into the concatenated buffer
    let offset = 0;
    storedData.forEach(chunk => {
        view.set(new Uint8Array(chunk), offset);
        offset += chunk.byteLength;
    });
*/
    // Create a Blob from the concatenated data
    const blob = new Blob([storedData[0]] , {type: 'text/plain'});
    var upload = URL.createObjectURL(blob);  

    const loader = new GLTFLoader();

    // Pass the blob URL directly to the loader
    loader.load(upload, (gltf) => {
     // for(var i=0;i<gltf.scene.children[0].children.length;i++){
              //  objects.push(gltf.scene.children[0].children[i]);
               // layer_array.push(gltf.scene.children[0].children[i]);
               for(var i=0;i<gltf.scene.children.length;i++){
               if(gltf.scene.children[i].name==="Sky"||gltf.scene.children[i].userData.name==="Sky"){
                gltf.scene.remove(gltf.scene.children[i]);
                i--;
    }
  }
  gltf.scene.userData.bye=1;
 /* scene.add(gltf.scene);
  for(var i=0;i<gltf.scene.children.length;i++)
{
  if(gltf.scene.children[i].userData.catchmergebtn===undefined){
    scene.add(gltf.scene.children[i]);
    i--;
        }
      }
               scene.traverse(object =>{
          if(object.userData.layerid!==undefined){
objects.push(object);
//object.userData.catchmergebtn=0;
layer_array.push(object);
          }
        })*/
        //  }
        fetchDataAndInitialize()
        .then(function () {
          return fetchbigDataAndInitialize();
        }).then(function(){
          var elements = document.querySelectorAll('#more *');
          for (var i=0;i< elements.length;i++) {
            chckprojects.push(elements[i].innerHTML); 
              
          }
        })
        //.then(function () {
          // Call your window load function after the data fetching is complete
          //fetchbigDataAndInitialize()
          .then(function () {
            var countthechildrenofthescene=0;
            var retrievedArray = JSON.parse(localStorage.getItem("filenameMerged"));
            var retrievedid = JSON.parse(localStorage.getItem("id"));
            var retrievewildcard = JSON.parse(localStorage.getItem("mrgbtnswildcararray"));
            var retrievedscnuuid = JSON.parse(localStorage.getItem("scnuuid"));
            var retrievedtime =    JSON.parse(localStorage.getItem("time"));
            document.getElementById("lastSavedAt").innerHTML = retrievedtime;
            var smaller=0;
            var bigger=0;
            if(retrievedArray!=null){
            for(var i=0; i<retrievedArray.length;i++){
              const idValue = parseInt(retrievedid[i]);
              const wildValue = parseInt(retrievewildcard[i]);
              for(var rr=0;rr<gltf.scene.children.length;rr++){
               if(gltf.scene.children[rr].name!=="Sky"&&gltf.scene.children[rr].userData.catchmergebtn===undefined&&gltf.scene.children[rr].userData.layerid<wildValue){
                scene.add(gltf.scene.children[rr]);
                objects.push(scene.children[scene.children.length-1]);
                //object.userData.catchmergebtn=0;
                layer_array.push(scene.children[scene.children.length-1]);
                const layer = document.createElement("button");
          layer.setAttribute('id', 5+lnt+smaller+countthechildrenofthescene+howmanymergedbtns);
          layer.setAttribute('class', "layer");
          layer.setAttribute("wildcard",199+smaller+countthechildrenofthescene+howmanymergedbtns);
          document.body.appendChild(layer);
          const node = document.getElementById(5+lnt+smaller+countthechildrenofthescene+howmanymergedbtns);
          document.getElementById("layers").appendChild(node);
          document.getElementById(5+lnt+smaller+countthechildrenofthescene+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
          smaller++;
          rr--;
              }else if(gltf.scene.children[rr].name==="Sky"||gltf.scene.children[rr].userData.name==="Sky"){
                gltf.scene.remove(gltf.scene.children[rr]);
                rr--;
    }
  }
    cnT_gltf_merged++;
    const geoms = [];
    const meshes = [];
    const individualMeshes2=[];
    scnuuid[cnT_gltf_merged]=retrievedscnuuid[i];

    gltf.scene.updateMatrixWorld(true, true);
    gltf.scene.traverse(e => { 
        if (e.isMesh&&e.userData.catchmergebtn!==undefined&&e.userData.catchmergebtn===i) {
            meshes.push(e);
            individualMeshes2.push(e);
            const geometry = (e.geometry.index) ? e.geometry.toNonIndexed() : e.geometry.clone();
            geoms.push(geometry);
        }
    });
    countthechildrenofthescene=individualMeshes2.length;
    for (let i = 0; i < individualMeshes2.length - 1; i++) {
      for (let j = i + 1; j < individualMeshes2.length; j++) {
          if (individualMeshes2[i].userData.layerid !== undefined && 
            individualMeshes2[i + 1].userData.layerid !== undefined &&
            individualMeshes2[i].userData.layerid > individualMeshes2[i + 1].userData.layerid &&
            individualMeshes2[i].userData.catchmergebtn !== undefined) {
              // Swap the elements if condition is met
              let temp = individualMeshes2[i];
              individualMeshes2[i] = individualMeshes2[i + 1];
              individualMeshes2[i + 1] = temp;
          }
      }
  }
    array_of_arrays.push(individualMeshes2)
    geoms.forEach((g, i) => g.applyMatrix4(meshes[i].matrixWorld));
    const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms, true);
    gg.applyMatrix4(gltf.scene.matrix.clone().invert());
    gg.userData.materials = meshes.map(m => m.material);
    const mesh = new THREE.Mesh(gg, gg.userData.materials);
    mesh.userData.intersectionPoint = mesh.position.clone(); 
    MergedMeshes2.push(mesh);
          var c2_wilds=0;
          mergedMeshes2(i);
          splitMergedMesh2(array_of_arrays2[i],i);
const elementsWithAttribute = document.querySelectorAll('[wildcard]');
c2_wilds=elementsWithAttribute.length;
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"
const layer = document.createElement("button");

layer.setAttribute('id',idValue);
layer.setAttribute('class', "layer");
layer.setAttribute("wildcard", wildValue);
layer.setAttribute('catchmergedbtn',i);

document.body.appendChild(layer);
const node = document.getElementById(idValue);
document.getElementById("layers").appendChild(node);
howmanymergedbtns++;
node.addEventListener('click', function(event) {
  node.style.background="#252525";

  node.style.color="#fff";
  node.style.position="relative";
  node.style.border = "1px solid white";
  node.style.borderRadius ="4px";
  var catchMergedBtnValue = event.target.getAttribute('catchmergedbtn');
  mergedMeshes2(catchMergedBtnValue);
});
var retrievedArray = JSON.parse(localStorage.getItem("filenameMerged"));
document.getElementById(idValue).innerHTML = retrievedArray[i];
filenameMerged[cnT_gltf_merged]=retrievedArray[i];
innerHtmlArray.push(filenameMerged[cnT_gltf_merged]);
howmany++;
            
  if(individualMeshes2[individualMeshes2.length-1]!=null){
  for(var ii=0; ii<individualMeshes2.length;ii++){  
    const layer = document.createElement("button");
    layer.setAttribute('id', idValue+1+ii);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard",wildValue+1+ii);
    layer.setAttribute('catchmergedbtn',i);

    //layer.setAttribute('catchmergedbtn',c2_wilds);

    document.body.appendChild(layer);
    const node = document.getElementById(idValue+1+ii);
    node.addEventListener('click', function (event){
      var catchMergedBtnKiddoValue = event.target.getAttribute('catchmergedbtn');
      var element = document.querySelector('[mergedbtn="' + catchMergedBtnKiddoValue + '"]');
if (element) {
  element.removeAttribute('style');}
      splitMergedMesh2(array_of_arrays2[catchMergedBtnKiddoValue],catchMergedBtnKiddoValue);
    
  })
    document.getElementById("layers").appendChild(node);
    document.getElementById(idValue+1+ii).innerHTML = individualMeshes2[ii].userData.name;
    //layer_array[ii].userData.layerid=howmanymergedbtns+5+ii+194+lnt+nestedscenelength+nestedsceneobj;
  
}
ii=0;
}
}
for(var vv=0;vv<gltf.scene.children.length;vv++){
  if(gltf.scene.children[vv].userData.catchmergebtn===undefined&&gltf.scene.children[vv].userData.layerid>scene.children[scene.children.length-1].userData.layerid){
   scene.add(gltf.scene.children[vv]);
   objects.push(scene.children[scene.children.length-1]);
   //object.userData.catchmergebtn=0;
   layer_array.push(scene.children[scene.children.length-1]);
   const layer = document.createElement("button");
  layer.setAttribute('id', scene.children.length-1+lnt+howmanymergedbtns);
  layer.setAttribute('class', "layer");
  layer.setAttribute("wildcard",scene.children[scene.children.length-1].userData.layerid);
  document.body.appendChild(layer);
  const node = document.getElementById(scene.children.length-1+lnt+howmanymergedbtns);
  document.getElementById("layers").appendChild(node);
  document.getElementById(scene.children.length-1+lnt+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
  vv--;}
  }
layer_array= []; 
          }else{var counterchld=0;var count=0;var count2=0;var count3=0; var count4=0;
           var counters_array=[];
            for(var i=0;i<gltf.scene.children.length;i++){
              for(var kk=1;kk<gltf.scene.children.length;kk++){
                if(gltf.scene.children[0].children.length>0){
                    if(gltf.scene.children[kk].userData.layerid!==undefined&&gltf.scene.children[kk].userData.layerid<gltf.scene.children[0].children[0].userData.layerid){
                      count++;
                      counters_array.push(count-1);
                    }else if(gltf.scene.children[kk].userData.layerid!==undefined){
                    if(count4===0){                      
                       count2++;
                       count2+= gltf.scene.children[0].children.length+count;
                       counters_array.push(count2-1);
                       count4++;
                       }else{
                          count2++;
                          counters_array.push(count2-1);
                    }
                }
                }
              }
            if(gltf.scene.children[i].children.length===0){
            count3++;
              if(gltf.scene.children[i].name!=="Sky"){
               scene.add(gltf.scene.children[i]);
               objects.push(scene.children[scene.children.length-1]);
               //object.userData.catchmergebtn=0;
               if(counters_array.length>0){
               const layer = document.createElement("button");
         layer.setAttribute('id', 5+lnt+counters_array[count3-1]);
         layer.setAttribute('class', "layer");
         layer.setAttribute("wildcard",199+counters_array[count3-1]);
         document.body.appendChild(layer);
         const node = document.getElementById(5+lnt+counters_array[count3-1]);
         document.getElementById("layers").appendChild(node);
         document.getElementById(5+lnt+counters_array[count3-1]).innerHTML = scene.children[scene.children.length-1].userData.name;
               }else{
                const layer = document.createElement("button");
                layer.setAttribute('id', 5+lnt+count3-1);
                layer.setAttribute('class', "layer");
                layer.setAttribute("wildcard",199+count3-1);
                document.body.appendChild(layer);
                const node = document.getElementById(5+lnt+count3-1);
                document.getElementById("layers").appendChild(node);
                document.getElementById(5+lnt+count3-1).innerHTML = scene.children[scene.children.length-1].userData.name;
               }
         //counterchld++;
         i--;
             }else if(gltf.scene.children[i].name==="Sky"||gltf.scene.children[i].userData.name==="Sky"){
               gltf.scene.remove(gltf.scene.children[i]);
               i--;  
 }           if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
}else{
  for (var uu = 0; uu < gltf.scene.children[i].children.length - 1; uu++) {
    for (var j = uu + 1; j < gltf.scene.children[i].children.length; j++) {
        if (gltf.scene.children[i].children[uu].userData.layerid !== undefined && 
          gltf.scene.children[i].children[uu + 1].userData.layerid !== undefined &&
          gltf.scene.children[i].children[uu].userData.layerid > gltf.scene.children[i].children[uu + 1].userData.layerid &&
          gltf.scene.children[i].children[uu].userData.catchmergebtn !== undefined) {
            // Swap the elements if condition is met
            var temp = gltf.scene.children[i].children[uu];
            gltf.scene.children[i].children[uu] = gltf.scene.children[i].children[uu + 1];
            gltf.scene.children[i].children[uu + 1] = temp;
        }
    }
}
  
  for(var rr=0;rr<gltf.scene.children[i].children.length;rr++){
    if(gltf.scene.children[0].children[rr].name!=="Sky"){
     scene.add(gltf.scene.children[0].children[rr]);
     objects.push(scene.children[scene.children.length-1]);
     //object.userData.catchmergebtn=0;
     const layer = document.createElement("button");
layer.setAttribute('id', 5+lnt+counterchld+count);
layer.setAttribute('class', "layer");
layer.setAttribute("wildcard",199+counterchld+count);
document.body.appendChild(layer);
const node = document.getElementById(5+lnt+counterchld+count);
document.getElementById("layers").appendChild(node);
document.getElementById(5+lnt+counterchld+count).innerHTML = scene.children[scene.children.length-1].userData.name;
counterchld++;
rr--;
   }else if(gltf.scene.children[0].children[rr].name==="Sky"||gltf.scene.children[0].children[rr].userData.name==="Sky"){
     gltf.scene.remove(gltf.scene.children[0].children[rr]);
     rr--;
}
}           if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
}
}
          }document.getElementById('popupContainer').style.display = 'none';
  })
       // })
        .catch(function (error) {
          console.error('Error initializing:', error);
        }); 
        });
       

});
 

   
  }
  socket_editor.emit('editor', urlmatch);
  
});
}
function saveScene(){
  return new Promise((resolve, reject) => {

  const exporter2 = new _GLTFExporter();
  scene.remove(transformControls);
   //exporter2.parse(scene, (gltf) => {
      socket_editor.emit('newWave');
      checkifthereismodel_tuc();splitwhenload();
  exporter2.parse(scene, function(gltf) {
    
    const output = JSON.stringify( gltf, null, 2 );
    const blob= new Blob([output]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
     var arrayBuffer = reader.result;socket_editor.emit('savesceneonreload', arrayBuffer);
     resolve();
     // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
     //while (offset < arrayBuffer.byteLength) {
      //const chunk = arrayBuffer.slice(offset, offset + CHUNK_SIZE);
       // Send the chunk via Socket.IO
      //offset += CHUNK_SIZE;
    //}
    });
    reader.readAsArrayBuffer(blob); 
  }, {});
  })
}
//setInterval(saveScene, 20000);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function elementWithInnerHTMLExists(innerHtmlToCheck) {

  var elements = document.querySelectorAll('#layers *');
  for(var v=0;v<innerHtmlArray.length;v++){
  for (var i=0;i< elements.length;i++) {
      if (elements[i].innerHTML === innerHtmlToCheck[v]) {
          return true;
      }
  }

  return false;
}
}
export function scnchldrn2(){
  nestedscenelength=0;
  for(var cntr1=5;cntr1<scene.children.length;cntr1++){
    if(scene.children[cntr1].userData.loaded===true){
      nestedscenelength += scene.children[cntr1].children.length-1;
    }
  }
  }
  export function scnobjs2(){
    nestedsceneobj=0;
    for(var cntr1=5;cntr1<scene.children.length;cntr1++){
      if(scene.children[cntr1].userData.objloaded===true){
        if(scene.children[cntr1].children.length>0){
        nestedsceneobj += scene.children[cntr1].children.length-1;
        }else{
          nestedsceneobj+=1;
        }
      }
    }
    }
//////////////////////////Export scene to gltf////////////////////////////////

function exportmodel() {
  document.getElementById('popupContainer').style.display = 'block';
  setTimeout(() => {
   
  const exporter = new _GLTFExporter();
  // Parse the input and generate the glTF output
  scene.remove(transformControls);
  checkifthereismodel_tuc();splitwhenload();
  const clonedScene = new THREE.Scene();    
  
      scene.children.forEach((child) => {if ( child.userData.name!='Sky' && child.type!='CameraHelper'&& child.type!='HemisphereLight'&& child.type!='SpotLight'){
        const clonedObject = child.clone();
        clonedScene.add(clonedObject);
      }
      });  

  exporter.parse(clonedScene, function(gltf) {
	
		const output = JSON.stringify( gltf, null, 2 );
		saveString( output, 'scene.gltf' );
  }, {});}, 1000);

}

function saveString(text, filename) {

  save(new Blob([text], {
    type: 'text/plain'
  }), filename);
}
const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  document.getElementById('popupContainer').style.display = 'none';

  // URL.revokeObjectURL( url ); breaks Firefox...

}
///////////////////////////////////////////////////////////////////////


//////////////////////////Load 3D-model////////////////////////////////
const loader = new GLTFLoader();
export var loader2 = new THREE.OBJLoader();

var uploaded_model;
var uploaded_model_obj;
export var chck;
export var uploaded;
export var uploaded_obj;
export var uploadedmtl;
const input = document.querySelector("#model-input");
input.addEventListener("change", (event) => { splitwhenload();    checkifthereismodel_tuc();  


  var file = event.target.files[0];
  if(file.name.includes("glb")){
    var upmodel = URL.createObjectURL(file);  
 
    const reader = new FileReader();
    reader.addEventListener("load", () => {
     var upload = reader.result;
     // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
      
    });
    reader.readAsArrayBuffer(file); //read contents of the file
    document.getElementById("model").onclick = function() { if (exec===false){ scnchldrn2();  scnobjs();     
      loader.load(upmodel, (glb) => {
       
  if (elementWithInnerHTMLExists(innerHtmlArray)) {
    chck=true;
    } else {
    chck=false;
    }
            let hasMesh = false;
     /*       for(var j=0;j<gltf.scene.children[2].children.length-1;j++){
              gltf.scene.children[2].children[j].geometry.computeBoundingSphere(); 
              if(isNaN(gltf.scene.children[2].children[j].geometry.boundingSphere.radius))  gltf.scene.children[2].children[j].geometry.boundingSphere.radius=0;
            }
        */
         //scene.add(glb.scene.children[0])
         
      model = glb.scene;      
      
      scene.add(model);
      model.userData.objloaded=true;
      if(checkifthereismodel===false && chck===false){
        if(scene.children[scene.children.length-1]!=null){
          scene.remove(transformControls);

          const layer = document.createElement("button");
          layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
          layer.setAttribute('class', "layer");
          layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

          document.body.appendChild(layer);
          const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
          document.getElementById("layers").appendChild(node);
          document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
        }
        
    }else{
        if(scene.children[scene.children.length-1]!=null){
          scene.remove(transformControls);

          const layer = document.createElement("button");
          layer.setAttribute('id', scene.children.length+lnt+nestedscenelength);
          layer.setAttribute('class', "layer");
          layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

          document.body.appendChild(layer);
          const node = document.getElementById(scene.children.length+lnt+nestedscenelength);
          document.getElementById("layers").appendChild(node);
          document.getElementById(scene.children.length+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
        }        
    }checknest();
      checkthewildcards2();
      checkthewildteam();

      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      const clip = glb.animations[0];
    
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(clip);
      action.play();
    
      model.tick = (delta) => mixer.update(delta);    
      loop.updatables.push(model);
      loop.start();
//scene.add(model)
     //flamingo =model;
    //var updatables=[];
      // move the target to the center of the front bird
     // controls.target.copy(flamingo.position);
    
      //loop.updatables.push(flamingo);
        //if(gltf.scene.children[2]==null){

         // }else{
        /*for(var j=0;gltf.scene.children[2].children.length;j++){
          if ( gltf.scene.children[2].children[j].isMesh  ) objects.push( gltf.scene.children[2].children[j] );
          if ( gltf.scene.children[2].children[j].isMesh ) gltf.scene.children[2].children[j].castShadow = true;  if (gltf.scene.children[2].children[j].isMesh) hasMesh = true;      
          gltf.scene.children[2].children[j].userData.editable=true;    
        }*/
        
    //  }
    });
  }
      }
    
    //scene.add( upmodel);

    
  }
  if(file.name.includes("gltf")){
    gltf_model_counter_signal=1;
    obj_model_counter_signal=0;
    console.log((file.size/1024)/1024);
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('/js/draco/');
    loader.setDRACOLoader(dracoLoader);

    scene.remove(transformControls);

   uploaded_model = URL.createObjectURL(file);  
   
  const reader = new FileReader();
  reader.addEventListener("load", () => {
   uploaded = reader.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader.readAsArrayBuffer(file); //read contents of the file
  console.log((file.size/1024)/1024);

  document.getElementById("model").onclick = function() { if (exec===false){scnchldrn2();  scnobjs();
  loader.load(uploaded_model, (gltf) => {
   
  if (elementWithInnerHTMLExists(innerHtmlArray)) {
    chck=true;
    } else {
    chck=false;
    }
        let hasMesh = false;
 /*       for(var j=0;j<gltf.scene.children[2].children.length-1;j++){
          gltf.scene.children[2].children[j].geometry.computeBoundingSphere(); 
          if(isNaN(gltf.scene.children[2].children[j].geometry.boundingSphere.radius))  gltf.scene.children[2].children[j].geometry.boundingSphere.radius=0;
        }
    */
   if(gltf.scene.children.length===1&&gltf.scene.children[0].children.length===0){
if(gltf.scene.children[0].userData.name==="Sky"){ 
  gltf.scene.remove(gltf.scene.children[0]);
scene.add(gltf.scene);
gltf.scene.userData.objloaded=true;
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
 iterate();
}
        else{
          for(var k=gltf.scene.children.length-1;k>=0;k--){
            if(gltf.scene.children[k].type==='DirectionalLight'|| gltf.scene.children[k].type==='CameraHelper' || gltf.scene.children[k].userData.name==='Sky' ||gltf.scene.children[k].type==='HemisphereLight' || gltf.scene.children[k].type==='SpotLight')
            gltf.scene.remove(gltf.scene.children[k]);
        }scene.add(gltf.scene);
        gltf.scene.userData.objloaded=true;
        if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
           iterate();
       
      }
      if(checkifthereismodel===false && chck===false){
          if(scene.children[scene.children.length-1]!=null){
            scene.remove(transformControls);

            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
            document.getElementById("layers").appendChild(node);
            document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
          }
      }else{
          if(scene.children[scene.children.length-1]!=null){
            scene.remove(transformControls);
  
            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
  
            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
            document.getElementById("layers").appendChild(node);
            document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
          }
      }
     // }else{   if(gltf.scene.children[0].userData.name==="Sky"){ 
     // gltf.scene.remove(gltf.scene.children[0]);
    //scene.add(gltf.scene);
    }else if(gltf.scene.children.length>1){
    isGroup++; cnT_gltf_merged++;
    for(var cntt=0;cntt<array_of_arrays.length;cntt++){
    if(cnT_gltf_merged!==0&&isMerged2[cntt]===true){
      splitMergedMesh2(array_of_arrays2[cntt],cntt);
    }else if(cnT_gltf_merged!==0&&isMerged2[cntt]===false)
    {mergedMeshes2(cntt);fixoffsetwhenload=1;
      splitMergedMesh2(array_of_arrays2[cntt],cntt);       

    }
  }checkifthereismodel_tuc(); 
      if(gltf.scene.children[0].userData.name==="Sky"){ 
  gltf.scene.remove(gltf.scene.children[0]);
scene.add(gltf.scene);
//gltf.scene.userData.objloaded=true;
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
 iterate();
}
        else{
          for(var k=gltf.scene.children.length-1;k>=0;k--){
            if(gltf.scene.children[k].type==='DirectionalLight'|| gltf.scene.children[k].type==='CameraHelper' || gltf.scene.children[k].userData.name==='Sky' ||gltf.scene.children[k].type==='HemisphereLight' || gltf.scene.children[k].type==='SpotLight')
            gltf.scene.remove(gltf.scene.children[k]);
        }scene.add(gltf.scene);
        //gltf.scene.userData.objloaded=true;
        if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
           iterate();
       
      }
      const geoms = [];
      const meshes = [];
      const individualMeshes2=[];
      scnuuid[cnT_gltf_merged]=gltf.scene.uuid;
      gltf.scene.name=file.name.split('.').slice(0, -1).join('.');
      gltf.scene.updateMatrixWorld(true, true);
      gltf.scene.traverse(e => {
          if (e.isMesh) {
              meshes.push(e);
              individualMeshes2.push(e);
              const geometry = (e.geometry.index) ? e.geometry.toNonIndexed() : e.geometry.clone();
              geoms.push(geometry);
          }
      });
      array_of_arrays.push(individualMeshes2)
      geoms.forEach((g, i) => g.applyMatrix4(meshes[i].matrixWorld));
      const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms, true);
      gg.applyMatrix4(gltf.scene.matrix.clone().invert());
      gg.userData.materials = meshes.map(m => m.material);
      const mesh = new THREE.Mesh(gg, gg.userData.materials);
      mesh.userData.intersectionPoint = mesh.position.clone(); 
      MergedMeshes2.push(mesh);

            var c2_wilds=0;
const elementsWithAttribute = document.querySelectorAll('[wildcard]');
c2_wilds=elementsWithAttribute.length;
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
for(var tt=0; tt<scene.children.length;tt++){
  if(scene.children[tt].type==="Scene"&&scene.children[tt].userData.tomerge!==undefined){
     cndr+=scene.children[tt].children.length+1;
  }
}
if(cndr!==0){
  const layer = document.createElement("button");
  layer.setAttribute('id',c2_wilds+ 5+ lnt+cndr);
  layer.setAttribute('class', "layer");
  layer.setAttribute("wildcard", 9999999999);
  mrgbtnsids.push(c2_wilds+ 5+ lnt+cndr);
  localStorage.setItem("id", JSON.stringify(mrgbtnsids));
  
  document.body.appendChild(layer);
  const node = document.getElementById(c2_wilds+5 + lnt+cndr);
  document.getElementById("layers").appendChild(node);
  howmanymergedbtns++;
  node.addEventListener('click', function(event) {
    node.style.background="#252525";

    node.style.color="#fff";
    node.style.position="relative";
    node.style.border = "1px solid white";
    node.style.borderRadius ="4px";

      var catchMergedBtnValue = event.target.getAttribute('catchmergedbtn');
      mergedMeshes2(catchMergedBtnValue);
  });
    document.getElementById(c2_wilds+5 + lnt+cndr).innerHTML = file.name.split('.').slice(0, -1).join('.');
    filenameMerged[cnT_gltf_merged]=file.name.split('.').slice(0, -1).join('.');
    localStorage.setItem("filenameMerged", JSON.stringify(filenameMerged));
    localStorage.setItem("scnuuid", JSON.stringify(scnuuid));
    innerHtmlArray.push(filenameMerged[cnT_gltf_merged]);
    checkifthereismodel_tuc();
        if(checkifthereismodel===false&&chck===false){
            scene.remove(transformControls);
  
            for(var c=0;c<scene.children[scene.children.length-1].children.length/*to teleytaio poy piraja length-1*/;c++){
              const layer = document.createElement("button");
              layer.setAttribute('id', howmanymergedbtns+scene.children.length-1 + c + lnt+nestedscenelength+cndr-1);
              layer.setAttribute('class', "layer");
              layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
  
              document.body.appendChild(layer);
              const node = document.getElementById(howmanymergedbtns+scene.children.length-1 + c +lnt+nestedscenelength+cndr-1);
              document.getElementById("layers").appendChild(node);
             /* node.addEventListener('click', function (event){
                var catchMergedBtnKiddoValue = event.target.getAttribute('catchmergedbtn');
                splitMergedMesh2(array_of_arrays2[catchMergedBtnKiddoValue],catchMergedBtnKiddoValue);
              
            })*/
              if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
                document.getElementById(howmanymergedbtns+scene.children.length-1+cndr-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;
  
              }else if(scene.children[scene.children.length-1].children[c].type==="Mesh"){
                document.getElementById(howmanymergedbtns+scene.children.length-1+cndr-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
              }else{
                scene.children[scene.children.length-1].children[c].name="model_tuc"
              document.getElementById(howmanymergedbtns+scene.children.length-1+cndr-1 + c+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
              }
            }
        }else{
            scene.remove(transformControls);
  
            for(var c=0;c<scene.children[scene.children.length-1].children.length/*to teleytaio poy piraja length-1*/;c++){
              const layer = document.createElement("button");
              layer.setAttribute('id', scene.children.length-1+cndr-1 +howmanymergedbtns+ c + lnt+nestedscenelength);
              layer.setAttribute('class', "layer");
              layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
  
              document.body.appendChild(layer);
              const node = document.getElementById(scene.children.length-1+cndr-1+howmanymergedbtns + c +lnt+nestedscenelength);
              document.getElementById("layers").appendChild(node);
              node.addEventListener('click', function (event){
                var catchMergedBtnKiddoValue = event.target.getAttribute('catchmergedbtn');
                var element = document.querySelector('[mergedbtn="' + catchMergedBtnKiddoValue + '"]');
                if (element) {
                  element.removeAttribute('style');}
                splitMergedMesh2(array_of_arrays2[catchMergedBtnKiddoValue],catchMergedBtnKiddoValue);
              
            })
              if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
                document.getElementById(scene.children.length-1+cndr-1 + howmanymergedbtns+ c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;
  
              }else if(scene.children[scene.children.length-1].children[c].type==="Mesh"){
                document.getElementById(scene.children.length-1+cndr-1 + howmanymergedbtns+ c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
              }else{
                scene.children[scene.children.length-1].children[c].name="model_tuc"
              document.getElementById(scene.children.length-1+cndr-1 + howmanymergedbtns+ c+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
              }
            }
        }     
}else{
  const layer = document.createElement("button");
layer.setAttribute('id',c2_wilds+ 5+ lnt);
layer.setAttribute('class', "layer");
layer.setAttribute("wildcard", 9999999999);
mrgbtnsids.push(c2_wilds+ 5+ lnt);
localStorage.setItem("id", JSON.stringify(mrgbtnsids));

document.body.appendChild(layer);
const node = document.getElementById(c2_wilds+5 + lnt);
document.getElementById("layers").appendChild(node);
howmanymergedbtns++;
node.addEventListener('click', function(event) {
  node.style.background="#252525";
  node.style.border = "1px solid white";
  node.style.borderRadius ="4px";
  node.style.color="#fff";
  node.style.position="relative";


    var catchMergedBtnValue = event.target.getAttribute('catchmergedbtn');
    mergedMeshes2(catchMergedBtnValue);
});
  document.getElementById(c2_wilds+5 + lnt).innerHTML = file.name.split('.').slice(0, -1).join('.');
  filenameMerged[cnT_gltf_merged]=file.name.split('.').slice(0, -1).join('.');
  localStorage.setItem("filenameMerged", JSON.stringify(filenameMerged));
  localStorage.setItem("scnuuid", JSON.stringify(scnuuid));
  innerHtmlArray.push(filenameMerged[cnT_gltf_merged]);
  checkifthereismodel_tuc();
      if(checkifthereismodel===false&&chck===false){
          scene.remove(transformControls);

          for(var c=0;c<scene.children[scene.children.length-1].children.length/*to teleytaio poy piraja length-1*/;c++){
            const layer = document.createElement("button");
            layer.setAttribute('id', howmanymergedbtns+scene.children.length-1 + c + lnt+nestedscenelength);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(howmanymergedbtns+scene.children.length-1 + c +lnt+nestedscenelength);
            document.getElementById("layers").appendChild(node);
           /* node.addEventListener('click', function (event){
              var catchMergedBtnKiddoValue = event.target.getAttribute('catchmergedbtn');
              splitMergedMesh2(array_of_arrays2[catchMergedBtnKiddoValue],catchMergedBtnKiddoValue);
            
          })*/
            if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
              document.getElementById(howmanymergedbtns+scene.children.length-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;

            }else if(scene.children[scene.children.length-1].children[c].type==="Mesh"){
              document.getElementById(howmanymergedbtns+scene.children.length-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }else{
              scene.children[scene.children.length-1].children[c].name="model_tuc"
            document.getElementById(howmanymergedbtns+scene.children.length-1 + c+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }
          }
      }else{
          scene.remove(transformControls);

          for(var c=0;c<scene.children[scene.children.length-1].children.length/*to teleytaio poy piraja length-1*/;c++){
            const layer = document.createElement("button");
            layer.setAttribute('id', scene.children.length-1 +howmanymergedbtns+ c + lnt+nestedscenelength);
            layer.setAttribute('class', "layer");
            layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

            document.body.appendChild(layer);
            const node = document.getElementById(scene.children.length-1+howmanymergedbtns + c +lnt+nestedscenelength);
            document.getElementById("layers").appendChild(node);
            node.addEventListener('click', function (event){
              var catchMergedBtnKiddoValue = event.target.getAttribute('catchmergedbtn');
              var element = document.querySelector('[mergedbtn="' + catchMergedBtnKiddoValue + '"]');
              if (element) {
                element.removeAttribute('style');}
              splitMergedMesh2(array_of_arrays2[catchMergedBtnKiddoValue],catchMergedBtnKiddoValue);
            
          })
            if(scene.children[scene.children.length-1].children[c].type==="Object3D"){
              document.getElementById(scene.children.length-1 + howmanymergedbtns+ c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].children[0].name;

            }else if(scene.children[scene.children.length-1].children[c].type==="Mesh"){
              document.getElementById(scene.children.length-1 + howmanymergedbtns+ c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }else{
              scene.children[scene.children.length-1].children[c].name="model_tuc"
            document.getElementById(scene.children.length-1 + howmanymergedbtns+ c+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[c].name;
            }
          }
      }     
}


    }else if(gltf.scene.children.length===1&&gltf.scene.children[0].children.length>1){
      isGroup++;
              scene.add(gltf.scene);
              gltf.scene.userData.objloaded=true;
              if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
                 iterate();
             
            if(checkifthereismodel===false&&chck===false){
                scene.remove(transformControls);
      
                for(var c=0;c<scene.children[scene.children.length-1].children[0].children.length/*to teleytaio poy piraja length-1*/;c++){
                  const layer = document.createElement("button");
                  layer.setAttribute('id', scene.children.length-1 + c + lnt+nestedscenelength);
                  layer.setAttribute('class', "layer");
                  layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
      
                  document.body.appendChild(layer);
                  const node = document.getElementById(scene.children.length-1 + c +lnt+nestedscenelength);
                  document.getElementById("layers").appendChild(node);
                  if(scene.children[scene.children.length-1].children[0].children[c].type==="Object3D"){
                    document.getElementById(scene.children.length-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[0].children[c].children[0].name;
      
                  }else if(scene.children[scene.children.length-1].children[0].children[c].type==="Mesh"){
                    document.getElementById(scene.children.length-1 + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[0].children[c].name;
                  }/*else{
                    scene.children[scene.children.length-1].children[0].children[c].name="model_tuc"
                  document.getElementById(scene.children.length-1 + c+lnt+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].children[0].children[c].name;
                  }*/
                }
            }else{
                scene.remove(transformControls);
      
                for(var c=0;c<scene.children[scene.children.length-1].children[0].children.length/*to teleytaio poy piraja length-1*/;c++){
                  const layer = document.createElement("button");
                  layer.setAttribute('id', scene.children.length + c + lnt+nestedscenelength);
                  layer.setAttribute('class', "layer");
                  layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
      
                  document.body.appendChild(layer);
                  const node = document.getElementById(scene.children.length + c +lnt+nestedscenelength);
                  document.getElementById("layers").appendChild(node);
                  if(scene.children[scene.children.length-1].children[0].children[c].type==="Object3D"){
                    document.getElementById(scene.children.length + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[0].children[c].children[0].name;
      
                  }else if(scene.children[scene.children.length-1].children[0].children[c].type==="Mesh"){
                    document.getElementById(scene.children.length + c +lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[0].children[c].name;
                  }/*else{
                    scene.children[scene.children.length-1].children[0].children[c].name="model_tuc"
                  document.getElementById(scene.children.length-1 + c+lnt+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].children[0].children[c].name;
                  }*/
                }
            }     

    }
/*
  const geoms=[]
  const meshes=[]
  gltf.scene.updateMatrixWorld(true,true)
  gltf.scene.traverse(e=>e.isMesh && meshes.push(e) && (geoms.push(( e.geometry.index ) ? e.geometry.toNonIndexed() : e.geometry().clone())));
  geoms.forEach((g,i)=>g.applyMatrix4(meshes[i].matrixWorld));
  const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms,true);
  gg.applyMatrix4(gltf.scene.matrix.clone().invert());
  gg.userData.materials = meshes.map(m=>m.material);
  const mesh = new THREE.Mesh( gg,gg.userData.materials);
  objects.push(mesh);
  //mesh.children=meshes;
    mesh.castShadow = true; 
    mesh.receiveShadow = true; 

    mesh.userData.editable=true;
 //iterate();
scene.add(mesh);
if(lnt!=null){

  if(scene.children[scene.children.length-1]!=null){

    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+lnt);
    layer.setAttribute('class', "layer");
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+lnt);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+lnt).innerHTML = file.name.split('.').slice(0, -1).join('.');
  }
  for(var c=1;c<meshes.length-1;c++){
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+lnt+c);
    layer.setAttribute('class', "layer");
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+lnt+c);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+lnt+c).innerHTML = meshes[c].name;
  }*/




//}
//}
      function iterate(){
 gltf.scene.traverse( function( object) {
					if ( object.isMesh ) objects.push( object );
					if ( object.isMesh)  object.castShadow = true;  
         if ( object.isMesh) object.receiveShadow = true;
          if (object.isMesh ) hasMesh = true;      
          if (object.isMesh) object.userData.editable=true;    
          if (object.isMesh) object.material.side=THREE.DoubleSide
        } );
      }
        
    
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
     // }else{
    /*for(var j=0;gltf.scene.children[2].children.length;j++){
      if ( gltf.scene.children[2].children[j].isMesh  ) objects.push( gltf.scene.children[2].children[j] );
      if ( gltf.scene.children[2].children[j].isMesh ) gltf.scene.children[2].children[j].castShadow = true;  if (gltf.scene.children[2].children[j].isMesh) hasMesh = true;      
      gltf.scene.children[2].children[j].userData.editable=true;    
    }*/
    
//  }
if(isGroup===0){
checknest();
  checkthewildcards2();
  checkthewildteam();

}else{
  checknest();
  checkthewildcards5();
  checkthewildteam();

  isGroup=0;
}
});
  }
  }

  }else if(file.name.includes("obj")){
    gltf_model_counter_signal=0;
    obj_model_counter_signal=1;

   uploaded_model_obj = URL.createObjectURL(file);  
   
   
  const reader2 = new FileReader();
  reader2.addEventListener("load", () => {
   uploaded_obj = reader2.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader2.readAsArrayBuffer(file); //read contents of the file
  
  input.addEventListener("change", (event) => {
    if(event.target.files[0].name.includes("mtl")){
    const file2 = event.target.files[0];
    var uploaded_mtl = URL.createObjectURL(file2);  
   
   
  const reader2 = new FileReader();
  reader2.addEventListener("load", () => {
    uploadedmtl = reader2.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  reader2.readAsArrayBuffer(file2); //read contents of the file
/////////////////////////////////////////////////////////////////////////////////obj loader//////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("model").onclick = function() { if (exec===false){scnchldrn2();  scnobjs();
  
mtlLoader.load(
    uploaded_mtl,
    (materials) => {
        materials.preload();
        console.log(materials);                         
loader2.setMaterials(materials);
        // const objLoader = new OBJLoader()            
          loader2.load( uploaded_model_obj, (obj) => {   
            
  if (elementWithInnerHTMLExists(innerHtmlArray)) {
    chck=true;
    } else {
    chck=false;
    }
      let hasMesh = false;
      if(obj.children[0].type=='Mesh'){
        obj.children[0].geometry.computeFaceNormals();
        obj.children[0].geometry.computeVertexNormals();
  scene.add(obj.children[0]);
  obj.userData.objloaded=true;
  if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
  if(checkifthereismodel===false&&chck===false){
    scene.remove(transformControls);

    if(scene.children[scene.children.length-1]!=null){

      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");

      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
    }
}else{
    scene.remove(transformControls);

    if(scene.children[scene.children.length-1]!=null){

      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");

      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = file.name.split('.').slice(0, -1).join('.');
    }
}
        objects.push( scene.children[scene.children.length-1] );
        scene.children[scene.children.length-1] .castShadow = true;  
        scene.children[scene.children.length-1] .receiveShadow = true;
       hasMesh = true;      
       scene.children[scene.children.length-1] .userData.editable=true;    
       scene.children[scene.children.length-1] .material.side=THREE.DoubleSide;
checknest();
checkthewildcards2();
checkthewildteam();
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
    }else if(obj.children[0].type=='Points'){ 
      const originalGeometry = obj.children[0].geometry.clone();
      const originalMaterials = Array.isArray(obj.children[0].material) ? obj.children[0].material : [obj.children[0].material];
      
      // Iterate through groups and create separate meshes
      for (let i = 0; i < originalGeometry.groups.length; i++) {
          const group = originalGeometry.groups[i];
      
          const startIndex = group.start;
          const count = group.count;
      
          const scaledVertices = [];
          const scaledNormals = [];
          const scaledUVs = [];
          let hasNaN = false; // Flag to track if NaN values are found in this group
      
          // Extract vertices, normals, and UVs for this group
          for (let j = 0; j < count * 3; j += 3) {
              const x = originalGeometry.attributes.position.array[startIndex * 3 + j] / 545;
              const y = originalGeometry.attributes.position.array[startIndex * 3 + j + 1] / 545;
              const z = originalGeometry.attributes.position.array[startIndex * 3 + j + 2] / 545;
      
              // Check for NaN values
              if (isNaN(x) || isNaN(y) || isNaN(z)) {
                  hasNaN = true;
                  break; // Exit loop if NaN value found
              }
      
              scaledVertices.push(x, y, z);
      
              const nx = originalGeometry.attributes.normal.array[startIndex * 3 + j];
              const ny = originalGeometry.attributes.normal.array[startIndex * 3 + j + 1];
              const nz = originalGeometry.attributes.normal.array[startIndex * 3 + j + 2];
      
              scaledNormals.push(nx, ny, nz);
      
              const u = originalGeometry.attributes.uv.array[(startIndex + j / 3) * 2];
              const v = originalGeometry.attributes.uv.array[(startIndex + j / 3) * 2 + 1];
      
              scaledUVs.push(u, v);
          }
      
          // If NaN values are found, skip this group
          if (hasNaN) {
              continue;
          }
      
          // Create BufferGeometry
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(scaledVertices, 3));
          geometry.setAttribute('normal', new THREE.Float32BufferAttribute(scaledNormals, 3));
          geometry.setAttribute('uv', new THREE.Float32BufferAttribute(scaledUVs, 2));
      
          // Assign material to this group
          const materialIndex = group.materialIndex;
          const material = originalMaterials[materialIndex];
      
          // Create Mesh
          const mesh = new THREE.Mesh(geometry, material);
          mesh.name = `${file.name.split('.').slice(0, -1).join('.')}_group_${i}`;
          mesh.position.set(348, -23, -85); // Adjust position based on your needs
      
          // Adjust position based on bounding box
          geometry.computeBoundingBox();
          //mesh.position.set(348, -23, -85);
          objects.push(mesh);
          mesh.castShadow = true; 
          mesh.receiveShadow = true; 
          mesh.userData.editable=true;
          // Recalculate the center of the bounding box
          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);
          const offsetX = -348; // Example offset values
          const offsetY = 23;
          const offsetZ = 85;
          center.x += offsetX;
          center.y += offsetY;
          center.z += offsetZ;
          
          // Position the mesh at the recalculated center
          // mesh.position.copy(center);
          mesh.userData.intersectionPoint = center.clone();
          individualMeshes.push(mesh);
      
          // Add mesh to scene
          scene.add(mesh);
      }
    /*  const geoms = [];
      const meshes = [];
      scene.updateMatrixWorld(true, true);
      scene.traverse(e => {
          if (e.isMesh && e.name.includes("model_tuc")) {
              meshes.push(e);
              geoms.push((e.geometry.index) ? e.geometry.toNonIndexed() : e.geometry.clone());
          }
      });
      geoms.forEach((g, i) => g.applyMatrix4(meshes[i].matrixWorld));
      const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms, true);
      gg.applyMatrix4(scene.matrix.clone().invert());
      gg.userData.materials = meshes.map(m => m.material);
      const mesh = new THREE.Mesh(gg, gg.userData.materials);
      const boundingBox = new THREE.Box3().setFromObject(mesh);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      const offsetX = -348; // Example offset values
      const offsetY = 23;
      const offsetZ = 85;
      center.x += offsetX;
      center.y += offsetY;
      center.z += offsetZ;
      objects.push(mesh);

      mesh.name='model_tuc';
      mesh.userData.editable = true;
      mesh.userData.intersectionPoint = center.clone();

      scene.add(mesh);*/
      var c_wilds=0;
let takeit;
const elementsWithAttribute = document.querySelectorAll('[wildcard]');
c_wilds=elementsWithAttribute.length;
takeit=c_wilds;
if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"
const layer = document.createElement("button");
layer.setAttribute('id',c_wilds+ 5+nestedscenelength + lnt);
layer.setAttribute('class', "layer");
layer.setAttribute("wildcard", 9999999999);

document.body.appendChild(layer);
const node = document.getElementById(c_wilds+5+nestedscenelength + lnt);
document.getElementById("layers").appendChild(node);
howmanymergedbtns++;
node.addEventListener('click',  function (){
  node.style.background="#252525";
  node.style.position="relative";
  node.style.border = "1px solid white";
  node.style.borderRadius ="4px";
  node.style.color="#fff";

    mergeMeshes();
  
});
  document.getElementById(c_wilds+5+nestedscenelength + lnt).innerHTML = "model_tuc";
  filenameMerged2=file.name.split('.').slice(0, -1).join('.');
  innerHtmlArray.push(filenameMerged2);
  if(checkifthereismodel===false&&chck===false){
  scene.remove(transformControls);
  for(var c=5+c_wilds;c<scene.children.length;c++){
    const layer = document.createElement("button");
    layer.setAttribute('id',1+c+nestedscenelength + lnt);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[c].id);

    document.body.appendChild(layer);
    const node = document.getElementById(1+c+nestedscenelength + lnt);
    node.addEventListener('click', function (){
        undoMerge(originalIndividualMeshes);
      
    })
    document.getElementById("layers").appendChild(node);

      document.getElementById(1+c+nestedscenelength + lnt).innerHTML = scene.children[c].name;

  }
  }else{
      scene.remove(transformControls);
      for(var c=5+c_wilds-(howmanymergedbtns-1);c<scene.children.length;c++){
        const layer = document.createElement("button");
        layer.setAttribute('id',howmanymergedbtns+c+nestedscenelength + lnt);
        layer.setAttribute('class', "layer");
        layer.setAttribute("wildcard", scene.children[c].id);
    
        document.body.appendChild(layer);
        const node = document.getElementById(howmanymergedbtns+c+nestedscenelength + lnt);
        node.addEventListener('click', function (){
            undoMerge(originalIndividualMeshes);
          
        })
        document.getElementById("layers").appendChild(node);
    
          document.getElementById(howmanymergedbtns+c+nestedscenelength + lnt).innerHTML = scene.children[c].name;
      }
  }
c_wilds=0;
checknest();
checkthewildcards4();
checkthewildteam();

   }
//scene.add(mesh);

});
  });
}
}
}
  });
  }
});function checknest(){
  if(scene.children[scene.children.length-1].children.length>1){
    var count_scenemodel_children=scene.children[scene.children.length-1].children.length
  }
  nestedsceneobj+=count_scenemodel_children-1;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export let mergedMesh = null;
export let originalIndividualMeshes
export let isMerged = false;
let mergedMeshMovedPosition = null; 
function mergeMeshes() {
  if(isMerged===false){
   originalIndividualMeshes = individualMeshes.map(mesh => mesh.clone());

   transformControls.detach();
   scene.remove(transformControls);

  const geoms = [];
    const materials = [];

    // Iterate through individual meshes
    individualMeshes.forEach(mesh => {
        const geometry = mesh.geometry.clone();
        geometry.applyMatrix4(mesh.matrixWorld); // Apply mesh's world matrix to the geometry

        // Collect geometry and material of each mesh
        geoms.push(geometry);
        materials.push(mesh.material);
    });

    // Merge geometries and materials into a single mesh
    const combinedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geoms, true);
    const combinedMaterials = materials.length > 1 ? materials : [materials[0]];

    // Create the merged mesh
    const mergedMesh = new THREE.Mesh(combinedGeometry, combinedMaterials);
    mergedMesh.name = filenameMerged2;
    combinedGeometry.computeBoundingBox();
       objects.push(mergedMesh);
       mergedMesh.castShadow = true; 
       mergedMesh.receiveShadow = true; 
       mergedMesh.userData.editable=true;
       mergedMesh.userData.merged=true;

    const boundingBox = combinedGeometry.boundingBox;
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    
    // Position the mesh at the recalculated center
   // mesh.position.copy(center);
   center.copy(boundingBox.min).add(boundingBox.max).multiplyScalar(0.5);

   mergedMesh.userData.intersectionPoint = center.clone();
   
    scene.add(mergedMesh);

    mergedMesh.onBeforeRender = function() {
      mergedMeshMovedPosition = mergedMesh.position.clone(); 
  };
mergedMesh.userData.layerid=individualMeshes[0].userData.layerid-1;

    individualMeshes.forEach(mesh => {
      scene.remove(mesh)
      const index = objects.indexOf(mesh);
      if (index !== -1) {
          objects.splice(index, 1);
      }} );
    
     // const intersectionPoint = mergedMesh.userData.intersectionPoint;

     // transformControls.position.set(intersectionPoint);
      //scene.add(transformControls);
     // transformControls.attach(mergedMesh); 
    // Clear the individualMeshes array
    individualMeshes = [];

    isMerged = true;
    return originalIndividualMeshes;
    }
}
//////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
export function undoMerge(originalIndividualMeshes) {
  if (!isMerged || objects.length === 0 || originalIndividualMeshes.length === 0) {
      console.log("No merge operation to undo or no objects to remove.");
      return;
  }
  transformControls.detach();
  scene.remove(transformControls);

  // Remove the merged mesh from the scene
  const mergedMeshIndex = objects.findIndex(obj => obj.name === filenameMerged2);
  if (mergedMeshIndex !== -1) {
      const mergedMesh = objects[mergedMeshIndex];
      scene.remove(mergedMesh);
      objects.splice(mergedMeshIndex, 1);
  }

  // Add back the original individual meshes to the scene
  originalIndividualMeshes.forEach(mesh => {
      objects.push(mesh);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.editable = true;

      // Calculate the position of the individual mesh relative to the moved position of the merged mesh
      const newPosition = mesh.position.clone().add(mergedMeshMovedPosition);
      mesh.position.copy(newPosition); // Set the position
      individualMeshes.push(mesh);
      scene.add(mesh);
  });

  // Reset the isMerged flag
  isMerged = false;
}
 //////////////////////////////////////////////////////////////////////
 var cntmrg=0;
 export var mergedMeshMovedPosition2=[];
 export var mergedMeshMovedRotation2=[];
 export var mergedMeshMovedScale2=[];


export var originalIndividualMeshes2;
 const size = 1000; // Change this value to whatever size you need

// Create an array filled with zeros
export let arrayOfZeros = new Array(size).fill(0)

 export function mergedMeshes2(arraytomerge){

if(isMerged2[arraytomerge]===false){  
  arrayOfZeros[arraytomerge]=arrayOfZeros[arraytomerge]+1;

  /*if(cntmrg===0){
  originalIndividualMeshes2 = individualMeshes2.map(mesh => mesh.clone());

  transformControls.detach();
  scene.remove(transformControls);
  objects.push(MergedMeshes2[0]);
  //mesh.children=meshes;
  MergedMeshes2[0].castShadow = true; 
  MergedMeshes2[0].receiveShadow = true; 
  MergedMeshes2[0].userData.editable=true;


  MergedMeshes2[0].userData.layerid=individualMeshes2[0].userData.layerid-1;

  MergedMeshes2[0].name = 'tospitakipueftiaja';

    for(var yy=5;yy<scene.children.length;yy++){
      if (scene.children[yy].uuid===scnuuid){
        individualMeshes2.forEach(mesh => {
          scene.remove(scene.children[yy]);
          const index = objects.indexOf(mesh);
          if (index !== -1) {
              objects.splice(index, 1);
          }} );
      }else{
        individualMeshes2.forEach(mesh => {
          scene.remove(mesh)
          const index = objects.indexOf(mesh);
          if (index !== -1) {
              objects.splice(index, 1);
          }} );
      }
    }
   
  individualMeshes2 = [];

scene.add(MergedMeshes2[0]);
MergedMeshes2[0].onBeforeRender = function() {
  mergedMeshMovedPosition2 = MergedMeshes2[0].position.clone(); 
};
  isMerged2=true;  cntmrg=1;

  return originalIndividualMeshes2;
  }else{
    */
     transformControls.detach();
    scene.remove(transformControls);
    const geoms = [];
    const meshes = [];
    array_of_arrays2[arraytomerge] = array_of_arrays[arraytomerge].map(mesh => mesh.clone()); // Mapping and cloning
    array_of_arrays[arraytomerge].forEach(e => {
      if (e.isMesh) {
          meshes.push(e);
          const geometry = (e.geometry.index) ? e.geometry.toNonIndexed() : e.geometry.clone();
          geoms.push(geometry);
      }
  });
  geoms.forEach((g, i) => g.applyMatrix4(meshes[i].matrixWorld));
  const gg = new THREE.BufferGeometryUtils.mergeBufferGeometries(geoms, true);
  //gg.applyMatrix4(gltf.scene.matrix.clone().invert());
  gg.userData.materials = meshes.map(m => m.material);
  const mesh = new THREE.Mesh(gg, gg.userData.materials);
  objects.push(mesh);
  //mesh.children=meshes;
  mesh.castShadow = true; 
  mesh.receiveShadow = true; 
  mesh.userData.editable=true;
  mesh.name = filenameMerged[arraytomerge];
  mergedmedhuuid[arraytomerge] = mesh.uuid;
  mesh.userData.merged=true;
  //if(mergedMeshMovedPosition2[arraytomerge]===undefined){
     mesh.onBeforeRender = function() {
     mergedMeshMovedPosition2[arraytomerge] = mesh.position.clone(); 
 };
//}else{
 // mergedMeshMovedPosition2[arraytomerge].x=0;
 // mergedMeshMovedPosition2[arraytomerge].y=0;
 // mergedMeshMovedPosition2[arraytomerge].z=0;
//}
 gg.computeBoundingBox();
  const boundingBox = gg.boundingBox;
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  // Position the mesh at the recalculated center
 // mesh.position.copy(center);
 center.copy(boundingBox.min).add(boundingBox.max).multiplyScalar(0.5);

 mesh.userData.intersectionPoint = center.clone();
   scene.add(mesh);

   if( arrayOfZeros[arraytomerge]===1){
    initcenter[arraytomerge]=mesh.userData.intersectionPoint;
  }
 mesh.userData.layerid=array_of_arrays[arraytomerge][0].userData.layerid-1;
 mesh.userData.catchmergebtn=arraytomerge;
 for(var yy=5;yy<scene.children.length;yy++){
  if (scene.children[yy].uuid===scnuuid[arraytomerge]||scene.children[yy].userData.bye!==undefined){
           scene.remove(scene.children[yy]);
           array_of_arrays[arraytomerge].forEach(mesh => {
      const index = objects.indexOf(mesh);
      if (index !== -1) {
          objects.splice(index, 1);
      }} );
  }else{
    array_of_arrays[arraytomerge].forEach(mesh => {
      scene.remove(mesh)
      const index = objects.indexOf(mesh);
      if (index !== -1) {
          objects.splice(index, 1);
      }} );
  }
}
   
    // const intersectionPoint = mergedMesh.userData.intersectionPoint;

    // transformControls.position.set(intersectionPoint);
     //scene.add(transformControls);
    // transformControls.attach(mergedMesh); 
   // Clear the individualMeshes array
   array_of_arrays[arraytomerge] = [];

   isMerged2[arraytomerge]=true;     return array_of_arrays2[arraytomerge];
//}
   }
   
}
 

 export function splitMergedMesh2(ar2,BtnKiddo) {
  if(isMerged2[BtnKiddo]===true){
  transformControls.detach();
  scene.remove(transformControls);

  // Remove the merged mesh from the scene
  const mergedMeshIndex = objects.findIndex(el => el.uuid === mergedmedhuuid[BtnKiddo]);
  if (mergedMeshIndex !== -1) {
      const mergedMesh = objects[mergedMeshIndex];
      scene.remove(mergedMesh);
      objects.splice(mergedMeshIndex, 1);
  }else{
  const mergedMeshIndex = objects.findIndex(elem => elem.uuid === mergedmedhuuid[mergedmedhuuid.length-1]);
  if (mergedMeshIndex !== -1) {
      const mergedMesh = objects[mergedMeshIndex];
      scene.remove(mergedMesh);
      objects.splice(mergedMeshIndex, 1);
  }
}

  // Iterate through the children of the merged mesh
 // Add back the original individual meshes to the scene
 ar2.forEach(mesh => {
  objects.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.editable = true;

  // Calculate the position of the individual mesh relative to the moved position of the merged mesh
  if(fixoffsetwhenload===0 && fixoffsetwhenload2===0){
  if(mergedMeshMovedPosition2[BtnKiddo]!==null&&mergedMeshMovedPosition2[BtnKiddo]!==undefined){
  var newPosition = mesh.position.clone().add(mergedMeshMovedPosition2[BtnKiddo]);
  mesh.position.copy(newPosition); // Set the position
  array_of_arrays[BtnKiddo].push(mesh);
  scene.add(mesh);
}else if(mergedMeshMovedPosition2[BtnKiddo]===undefined){
  var newPosition = mesh.position.clone();
  mesh.position.copy(newPosition); // Set the position
  array_of_arrays[BtnKiddo].push(mesh);
  scene.add(mesh);
}else{
  array_of_arrays[BtnKiddo].push(mesh);
  scene.add(mesh);  }
}else{
  if(mergedMeshMovedPosition2[BtnKiddo]!==null&&mergedMeshMovedPosition2[BtnKiddo]!==undefined){
    var newPosition = mesh.position.clone();
    mesh.position.copy(newPosition); // Set the position
    array_of_arrays[BtnKiddo].push(mesh);
    scene.add(mesh);
  }else if(mergedMeshMovedPosition2[BtnKiddo]===undefined){
    var newPosition = mesh.position.clone();
    mesh.position.copy(newPosition); // Set the position
    array_of_arrays[BtnKiddo].push(mesh);
    scene.add(mesh);
  }else{
    array_of_arrays[BtnKiddo].push(mesh);
    scene.add(mesh);  }
    
}
});fixoffsetwhenload=0;
  
  isMerged2[BtnKiddo]=false;
}
}
//////////////////////////Export scene to stl///////////////////////////

function stlExporter (){

var exporterstl= new STLExporter();
const clonedScene = new THREE.Scene();    
  
      scene.children.forEach((child) => {if ( child.userData.name!='Sky' && child.type!='CameraHelper'){
        const clonedObject = child.clone();
        clonedScene.add(clonedObject);
      }
      });
var str = exporterstl.parse( clonedScene ); // Export the scene
var blob = new Blob( [str], { type : 'text/plain' } ); // Generate Blob from the string
//saveAs( blob, 'file.stl' ); //Save the Blob to file.stl

//Following code will help to save the file without FileSaver.js
var link1 = document.createElement('a');
link1.style.display = 'none';

document.body.appendChild(link1);
link1.href = URL.createObjectURL(blob);
link1.download = 'Scene.stl';
link1.click();
}
///////////////////////////////////////////////////////////////////////


/////////////////////////save to our mongoDB///////////////////////////
export var project_name=document.getElementById("form");
console.log(project_name.value);
if(document.getElementById("form2")!=null){
var team_name=document.getElementById("form2");
console.log(project_name.value);
}
if(document.getElementById("form3")!=null){

var join_team_name=document.getElementById("form3");
console.log(project_name.value);
}
if(document.getElementById("form4")!=null){

var post_name=document.getElementById("form4");
console.log(post_name.value);
}
/*if(scened){

if(document.getElementById("form").value=data[0].projects[catchid].project_name.valueOf()){

  const btn_ovrt = document.getElementById('save_button');
  btn_ovrt.addEventListener('click', function(e) {
    console.log('button was clicked');
    transformControls.detach(obj);
    fetch('/overwrite', {method: 'POST',body: JSON.stringify({scene,project_name:project_name.value}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'}})
  
      .then(function(response) {
        if(response.ok) {
          console.log('saved');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}

}else{*/
var user_username;
const btn_save = document.getElementById('save_button');
if (btn_save !== null && btn_save !== 'undefined') {

btn_save.addEventListener('click', function(e) {
  document.getElementById('popupContainer').style.display = 'block';

  if (document.getElementById('project_name-error').innerHTML!=="&#10006;"&&document.getElementById('project_name-error').innerHTML!==""){
  console.log('button was clicked');
  transformControls.detach(obj);
  splitwhenload();
/*
var sceneeeeee= JSON.stringify(scene);
  
  const scene_tosave = new Blob([sceneeeeee], {type: 'text/plain'});


  var reader3 = new FileReader();
  var fileByteArray = [];
  reader3.readAsArrayBuffer(scene_tosave);
  reader3.onloadend = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
         var arrayBuffer = evt.target.result,
             array = new Uint8Array(arrayBuffer);
         for (var i = 0; i < array.length; i++) {
             fileByteArray.push(array[i]);
          }
      }
      
      */
      const size = new TextEncoder().encode(JSON.stringify(scene)).length
      const kiloBytes = size / 1024;
      const megaBytes = kiloBytes / 1024;
     console.log(megaBytes);
     if(megaBytes>16){
     // Create form element
     const forma = document.createElement('form');

     // Prevent default form submission behavior
     forma.addEventListener('submit', function(event) {
         event.preventDefault();
     });
     
     // Set form attributes
     forma.setAttribute('action', '/save_file_grid_fs');
     forma.setAttribute('method', 'POST');
     forma.setAttribute('enctype', 'multipart/form-data');
     
     // Create file input element
     const big_data_file = document.createElement('input');
     big_data_file.setAttribute('type', 'file');
     big_data_file.setAttribute('name', 'big_data_file');
     big_data_file.setAttribute('id', 'scene_input');
     
     // Append file input to form
     forma.appendChild(big_data_file);
     
     // Create a dummy file (assuming project_name and scene variables exist)
     let fileName = project_name.value;
     let file = new File([JSON.stringify(scene)], fileName, { type: 'text/plain', lastModified: new Date().getTime() }, 'utf-8');
     
     // Convert file to Blob object
     const blob = new Blob([file], { type: 'text/plain' });
     
     // Create FormData object to hold form data
     let formData = new FormData(forma);
     formData.append('big_data_file', blob,fileName);
     
     // Submit the form data asynchronously using Fetch API
     fetch('/save_file_grid_fs', {
         method: 'POST',
         body: formData
     })
     .then(response => {
         if (!response.ok) {
             throw new Error('Failed to save file to server');
         }
         console.log('File saved to server');
         // Handle success (optional)
         socket_editor.emit('save_big_data_and get_it_back',fileName, (err) => {
          if (err) {
            alert(err);
          }
        });
     }).then(function() {
      // Define the event listener
      function handleSavebigScene(arg) {
        document.getElementById("more").innerHTML += '<button>' + arg + '</button>';
        // Detach the event listener after the first execution
        socket_editor.off('save_big_data_and get_it_back', handleSavebigScene);addids();
      }
    
      // Attach the event listener
      socket_editor.on('save_big_data_and get_it_back', handleSavebigScene); 
      if(document.getElementById("more").innerHTML==="No projects yet"){
        document.getElementById("more").innerHTML=""
      }
      document.getElementById('popupContainer').style.display = 'none';

    })
     .catch(error => {
         console.error('Error saving file to server:', error);
         // Handle error (optional)
     });
     
     // Remove the form after submission (optional)
     //forma.remove();
          /*socket_editor.emit('save_big_data_sceneandgetitbackimmediately',fileName, (err) => {
            if (err) {
              alert(err);
            }
          });
          socket_editor.on('save_big_data_sceneandgetitbackimmediately', (arg) => {

            document.getElementById("more").innerHTML += '<button>' + arg + '</button>';
                addids();

        });
        
      /*    
      fetch('/save_file_grid_fs', {method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'}})
    
        .then(function(response) {
          if(response.ok) {
            console.log('saved');
            return;
          }
          throw new Error('Request failed.');
        })
        .catch(function(error) {
          console.log(error);
        });*/
     }else{
     fetch('/saved', {method: 'POST',body: JSON.stringify({scene,project_name:project_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {        console.log('saved');
 socket_editor.emit('savesceneandgetitback',project_name.value, (err) => {
        if (err) {
          alert(err);
        }
      });
    } else {
      throw new Error('Request failed.');
    }
    }).then(function() {
        // Define the event listener
        function handleSaveScene(arg) {
          document.getElementById("more").innerHTML += '<button>' + arg + '</button>';
          // Detach the event listener after the first execution
          socket_editor.off('savesceneandgetitback', handleSaveScene);addids();
          projects_counter++;
        }
      
        // Attach the event listener
        socket_editor.on('savesceneandgetitback', handleSaveScene); 
        if(document.getElementById("more").innerHTML==="No projects yet"){
          document.getElementById("more").innerHTML=""
        }
        document.getElementById('popupContainer').style.display = 'none';

      })
    .catch(function(error) {
      console.log(error);
    });
//////////////non blocking example//////////
console.log('non blocking example');
  } 
}
});
}

const btn_save2 = document.getElementById('save_button2');
if (btn_save2 !== null && btn_save2 !== 'undefined') {

btn_save2.addEventListener('click', function(e) { if (document.getElementById('team_name-error').innerHTML!=="&#10006;"&&document.getElementById('team_name-error').innerHTML!==""){
  console.log('button was clicked');
  transformControls.detach(obj);
  fetch('/save_team', {method: 'POST',body: JSON.stringify({team_name:team_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        socket_editor.emit('saveteamandgetitback',team_name.value, (err) => {
          if (err) {
            alert(err);
          }
        });
       // return;
      }
      //throw new Error('Request failed.');
    }).then(function() {
      socket_editor.on('saveteamandgetitback', (arg) =>{
      var bottomBox = document.getElementById('bottom_box');
      if (!bottomBox) {
          // If bottom_box doesn't exist, create it
          var bottomBoxDiv = document.createElement('div');
          bottomBoxDiv.id = 'bottom_box';
  
          // Create room button
          var roomDiv = document.createElement('div');
          roomDiv.id = 'room';
          var joinRoomButton = document.createElement('button');
          joinRoomButton.id = 'join_room';
          joinRoomButton.textContent = 'Join Room';
          roomDiv.appendChild(joinRoomButton);
          bottomBoxDiv.appendChild(roomDiv);
  
          // Append bottom_box to the body
          document.body.appendChild(bottomBoxDiv);
          document.getElementById("room").style.color = '#fafafa';

          var teamstocolaborateDiv = document.createElement('div');
    teamstocolaborateDiv.id = 'teamstocolaborate';
    document.body.appendChild(teamstocolaborateDiv);
    document.getElementById("join_room").onclick=function(){myFunction7();};
    document.getElementById("share").style.visibility = 'visible';
    document.getElementById("share").style.top = '64%';
    document.getElementById("share").style.left = '7.57%';  }
      // Create or append buttons for each team
      var teamContainer = document.getElementById('teamstocolaborate');
          var val = arg;
          var button = document.createElement('button');
          button.id = 'room_buttons';
          var link = document.createElement('a');
          link.href = usersurl + '/room/' + encodeURIComponent(val);
          link.id = 'room_links';
          link.textContent = val;
          button.appendChild(link);
          teamContainer.appendChild(button);
    })
  })
    .catch(function(error) {
      console.log(error);
    });
}
});
}

const btn_save3 = document.getElementById('save_button3');
if (btn_save3 !== null && btn_save3 !== 'undefined') {

btn_save3.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
  fetch('/join_team', {method: 'POST',body: JSON.stringify({team_name:join_team_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        socket_editor.emit('jointeamandgetitback',join_team_name.value, (err) => {
          if (err) {
            alert(err);
          }
        });
        return;
      }
      throw new Error('Request failed.');
    }).then(function() {
      socket_editor.on('jointeamandgetitback', (arg) =>{
      var bottomBox = document.getElementById('bottom_box');
      if (!bottomBox) {
          // If bottom_box doesn't exist, create it
          var bottomBoxDiv = document.createElement('div');
          bottomBoxDiv.id = 'bottom_box';
  
          // Create room button
          var roomDiv = document.createElement('div');
          roomDiv.id = 'room';
          var joinRoomButton = document.createElement('button');
          joinRoomButton.id = 'join_room';
          joinRoomButton.textContent = 'Join Room';
          roomDiv.appendChild(joinRoomButton);
          bottomBoxDiv.appendChild(roomDiv);
  
          // Append bottom_box to the body
          document.body.appendChild(bottomBoxDiv);
          document.getElementById("room").style.color = '#fafafa';

          var teamstocolaborateDiv = document.createElement('div');
    teamstocolaborateDiv.id = 'teamstocolaborate';
    document.body.appendChild(teamstocolaborateDiv);
    document.getElementById("join_room").onclick=function(){myFunction7();};
    document.getElementById("share").style.visibility = 'visible';
    document.getElementById("share").style.top = '64%';
    document.getElementById("share").style.left = '7.57%';  }
      // Create or append buttons for each team
      var teamContainer = document.getElementById('teamstocolaborate');
          var val = arg;
          var button = document.createElement('button');
          button.id = 'room_buttons';
          var link = document.createElement('a');
          link.href = usersurl + '/room/' + encodeURIComponent(val);
          link.id = 'room_links';
          link.textContent = val;
          button.appendChild(link);
          teamContainer.appendChild(button);
    })
  })
    .catch(function(error) {
      console.log(error);
    });
});
/////////////////////////////////looad-save/////////////////////
const btn_save4 = document.getElementById('save_button4');
btn_save4.addEventListener('click', function(e) {
  console.log('button was clicked');
  transformControls.detach(obj);
  const size = new TextEncoder().encode(JSON.stringify(scene)).length
      const kiloBytes = size / 1024;
      const megaBytes = kiloBytes / 1024;
     console.log(megaBytes);
     if(megaBytes>16){
      {fetch('/get_files_grid_fs', {method: 'GET'})
      .then(function(response) {
         if(response.ok) return response.json();
         throw new Error('Request failed.');
       })
       .then(function(data) {
      
        for (var g = 0; g < data.length; g++) {
           if(data[g].filename===document.getElementById("form").value){
            const filetopost=data[g].filename;
            fetch('/big_data_post', {method: 'POST',body: JSON.stringify({filetopost,post_name:post_name.value}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'}})
           }
         }      
      
      })
      }

     }else{
  fetch('/posts', {method: 'POST',body: JSON.stringify({scene,post_name:post_name.value}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    .then(function(response) {
      if(response.ok) {
        console.log('saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  }
});
}
////////////////////////////////////////////////////////////////////


///////////////////load from our mongoDB////////////////////////////
/*const btn_load_projects = document.getElementById('pop');
btn_load_projects.addEventListener('click', function(e) {

  {fetch('/projects', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {        console.log('loaded');
      return response.json();}
      throw new Error('Request failed.');
    })
    .then(function(data) {

      for (var j = 0; j < data[0].projects.length; j++) {
       console.log(data[0].projects[j])
        document.getElementById("more").innerHTML += '<button>' + data[0].projects[j].project_name.valueOf() + '</button>';
      }
addids();
    })

    .catch(function(error) {
   console.log(error);
 });
}

});
*/
let projects_big_data;
let projects_small;
export var all_saved_projects;
var projects_counter;
var big_projects_counter;

export function fetchDataAndInitialize() {

 {return fetch('/projects', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {        console.log('loaded');
      return response.json();}
      throw new Error('Request failed.');
    })
    .then(function(data) {
      projects_small= data.length;
      if(data[0].projects.length==0){

      document.getElementById("more").innerHTML = "No projects yet";
      }else{
      for (var j = 0; j < data[0].projects.length; j++) {
       console.log(data[0].projects[j])
        document.getElementById("more").innerHTML += '<button>' + data[0].projects[j].project_name.valueOf() + '</button>';
      //let project_counter=j;
    }
addids();
      } projects_counter=data[0].projects.length;
    })
  
    .catch(function(error) {
   console.log(error);
 });
}}

//////////////non blocking example//////////
console.log('non blocking example');
export function fetchbigDataAndInitialize() {
{return fetch('/get_files_grid_fs', {method: 'GET'})
.then(function(response) {  console.log('loaded');
   if(response.ok) return response.json();
   throw new Error('Request failed.');
 })
 .then(function(data) {
     projects_big_data=data.length;
if(data.length>0&&document.getElementById("more").innerHTML==="No projects yet"){
  document.getElementById("more").innerHTML=""
}
  for (var b = 0; b < data.length; b++) {
     document.getElementById("more").innerHTML += '<button>' + data[b].filename.valueOf() + '</button>';
   }
   big_projects_counter = data.length;
all_saved_projects = big_projects_counter+ projects_counter;
addids();



})

}

}
export let lnt=0; 
export function addids() {
var cls = document.getElementById("more");
var length=cls.children.length;
lnt=length;
for ( var n=0; n < length; n++) {
    cls.children[n].id= (n + 1); 
}
}

export function addids2() {
  var cls = document.getElementById("more_teams");
  var length=cls.children.length;
  lnt=length;
  for ( var n=0; n < length; n++) {
      cls.children[n].id= (n + 1); 
  }
  }
export function scnchldrn(){
  nestedscenelength=0;
  for(var cntr1=5;cntr1<scene.children.length-1;cntr1++){
    if(scene.children[cntr1].userData.loaded===true){
      nestedscenelength += scene.children[cntr1].children.length-1;
    }
  }
  }
function scnobjs(){
    nestedsceneobj=0;
    for(var cntr1=5;cntr1<scene.children.length-1;cntr1++){
      if(scene.children[cntr1].userData.objloaded===true){
        nestedsceneobj += scene.children[cntr1].children.length-1;
      }
    }
    }
//reach requested project//
var scntoadd = new THREE.Scene;
const btn_load = document.getElementById('more');
export var scened;
if (btn_load !== null && btn_load !== 'undefined') {

btn_load.addEventListener('click', function(event) {scene.remove(transformControls);
  document.getElementById('popupContainer').style.display = 'block';

const  thisisthefilerequested= event.target.innerHTML;
  console.log('button was clicked');
  checkifthereismodel_tuc();splitwhenload();
if(event.target.id>projects_counter){
  document.getElementById("form").value=thisisthefilerequested;
  {fetch('/get_file_grid_fs', {method: 'POST', body: JSON.stringify({thisisthefilerequested}),/*})
  .then(function(response) {
     if(response.ok) return response.json();
     throw new Error('Request failed.');
   }) .then(function(data) {
   
    const serializedScene = JSON.stringify(data);
  var big_data_scened = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));

  scene.add(big_data_scened);
  big_data_scened.traverse( function( object ) {       
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') objects.push( object );
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.castShadow = true;
    if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.receiveShadow = true;
   
} ); 
  
  });
  }*/
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})
    .then(function (response) {
      if (response.ok) {
        // If the response is successful, handle the data here
        return response.json(); // Parse the response as JSON
      }
      throw new Error('Request failed.');
    })
    .then(function (jsonData) {
      // Handle the JSON data here
      console.log('Received JSON data:', jsonData);
      // You can work with the JSON data here
      const serializedScene = JSON.stringify(jsonData);
      var big_data_scened = new THREE.ObjectLoader().parse(JSON.parse(serializedScene));
    for(var bds=0;bds<big_data_scened.children.length;bds++){
      if(big_data_scened.children[bds].type==='Mesh'&&big_data_scened.children[bds].name!=='Sky'&& big_data_scened.children[bds].userData.name!=='Sky'){
             const clonedObject = big_data_scened.children[bds].clone();
          scntoadd.add(clonedObject);  
      }
    }      scntoadd.userData.loaded=true;

      scene.add(scntoadd);

      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      scntoadd.traverse( function( object ) {       
        if ( object.isMesh && object.userData.name!=='Sky' && object.name!=='Water'&&object.type!=="object3D") objects.push( object );
    } ); 
    for(var k=scntoadd.children.length-1;k>=0;k--){
    if(scntoadd.children[k].name==='Water'){
       check=true;
        const x = scntoadd.children[k].position.x;
        const y = scntoadd.children[k].position.y;
        const z = scntoadd.children[k].position.z;

        const _x = scntoadd.children[k].rotation._x;
        const _y = scntoadd.children[k].rotation._y;
        const _z = scntoadd.children[k].rotation._z;

        const ex = scntoadd.children[k].scale.x;
        const yi = scntoadd.children[k].scale.y;
        const zed = scntoadd.children[k].scale.z;

        pos.push( x, y, z );
        rot.push(_x,_y,_z);
        scl.push(ex,yi,zed);
        scntoadd.remove(scntoadd.children[k]);

addocean();
   check=false; }
  }
  scnchldrn();  scnobjs2(); checkifthereismodel_tuc();
  if(checkifthereismodel===false&&chck===false){
    if(scene.children[scene.children.length-1]!=null){
      for(var ldscn=0;ldscn<scene.children[scene.children.length-1].children.length;ldscn++){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+ldscn+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[ldscn].id+lnt+ldscn+nestedscenelength);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      if(scene.children[scene.children.length-1].children[ldscn].children.length>0){
        document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[ldscn].children[0].userData.name;

  }else{
    document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[ldscn].userData.name;

  }
      }
    }
}else{
    if(scene.children[scene.children.length-1]!=null){
      for(var ldscn=0;ldscn<scene.children[scene.children.length-1].children.length;ldscn++){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+ldscn+nestedscenelength+howmanymergedbtns);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[ldscn].id+lnt+ldscn+nestedscenelength);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength+howmanymergedbtns);
      document.getElementById("layers").appendChild(node);
      if(scene.children[scene.children.length-1].children[ldscn].children.length>0){
        document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].children[ldscn].children[0].userData.name;

  }else{
    document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].children[ldscn].userData.name;

  }
      }
    }
}        if(scene.children[scene.children.length-1].children.length>1){
  var count_scene_children=scene.children[scene.children.length-1].children.length;
} 
nestedscenelength+=count_scene_children-1;
checkthewildcards3();
checkthewildteam();

document.getElementById('popupContainer').style.display = 'none';

  // return catchid;
  })
   }
}else{
 {fetch('/projects', {method: 'GET'})
   .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      //console.log(data[0].projects[19].scene); 

      const serializedScene = JSON.stringify( data[0].projects[event.target.id -1].scene);
      let catchid=event.target.id-1;
      scened = new THREE.ObjectLoader().parse( JSON.parse( serializedScene ) );
      scened.userData.loaded=true;
      scene.add(scened);
      if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible";
      if(data[0].projects[event.target.id -1].project_name.length>0){
        document.getElementById("form").value=data[0].projects[event.target.id -1].project_name.valueOf();
      }
      scened.traverse( function( object ) {       
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') objects.push( object );
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.castShadow = true;
        if ( object.isMesh && object.userData.name!='Sky' && object.name!='Water') object.receiveShadow = true;
       
    } );     
    for(var k=scened.children.length-1;k>=0;k--){
      if(scened.children[k].type==='Object3D'||scened.children[k].type==='DirectionalLight'|| scened.children[k].type==='CameraHelper' || scened.children[k].userData.name==='Sky' ||scened.children[k].type==='HemisphereLight' || scened.children[k].type==='SpotLight')
    scened.remove(scened.children[k]);
    else if(scened.children[k].name==='Water'){
       check=true;
        const x = scened.children[k].position.x;
        const y = scened.children[k].position.y;
        const z = scened.children[k].position.z;

        const _x = scened.children[k].rotation._x;
        const _y = scened.children[k].rotation._y;
        const _z = scened.children[k].rotation._z;

        const ex = scened.children[k].scale.x;
        const yi = scened.children[k].scale.y;
        const zed = scened.children[k].scale.z;

        pos.push( x, y, z );
        rot.push(_x,_y,_z);
        scl.push(ex,yi,zed);
            scened.remove(scened.children[k]);

addocean();
   check=false; }
  }
/////////////////////////////////////add loaded scene to layers////////////////////////////////////////
scnchldrn();  scnobjs2(); checkifthereismodel_tuc();
if (elementWithInnerHTMLExists(innerHtmlArray)) {
  chck=true;
  } else {
  chck=false;
  }
if(checkifthereismodel===false&&chck===false){
    if(scene.children[scene.children.length-1]!=null){
      for(var ldscn=0;ldscn<scene.children[scene.children.length-1].children.length;ldscn++){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+ldscn+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[ldscn].id+lnt+ldscn+nestedscenelength);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+ldscn+nestedscenelength).innerHTML = scene.children[scene.children.length-1].children[ldscn].userData.name;
      }
    }

}else{
    if(scene.children[scene.children.length-1]!=null){
      for(var ldscn=0;ldscn<scene.children[scene.children.length-1].children.length;ldscn++){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length+lnt+ldscn+nestedscenelength+howmany);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].children[ldscn].id+lnt+ldscn+nestedscenelength+howmany);

      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length+lnt+ldscn+nestedscenelength+howmany);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length+lnt+ldscn+nestedscenelength+howmany).innerHTML = scene.children[scene.children.length-1].children[ldscn].userData.name;
      }
    }

}        if(scene.children[scene.children.length-1].children.length>1){
  var count_scene_children=scene.children[scene.children.length-1].children.length;
} 
nestedscenelength+=count_scene_children-1;
checkthewildcards3();
checkthewildteam();

document.getElementById('popupContainer').style.display = 'none';


   return catchid;})
    .catch(function(error) {
      console.log(error);
    });
}  
} 



  });
}
/////////////////////////////////////////////////////////////////

///////////////////texture load//////////////////
var uploaded_texture;
export var up_text;
var up_text2;

var loader3= new THREE.TextureLoader();
const input3 = document.querySelector("#texture-input");
input3.addEventListener("change", (event) => {
  const file3 = event.target.files[0];

  
   uploaded_texture = URL.createObjectURL(file3);  
   
  const reader3 = new FileReader();
  reader3.addEventListener("load", () => {
    up_text = reader3.result;
   // document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;

  });
  reader3.readAsArrayBuffer(file3); //read contents of the file
  const reader4 = new FileReader();
  reader4.addEventListener("load", () => {
    up_text2 = reader4.result;
    const previewImageDiv = document.getElementById('preview-image');

    // Set the background image
    previewImageDiv.style.backgroundImage = `url(${up_text2})`;

    // Set the background size based on the dimensions of the parent div
    const parentWidth = previewImageDiv.offsetWidth;
    const parentHeight = previewImageDiv.offsetHeight;
    previewImageDiv.style.backgroundSize = `${parentWidth}px ${parentHeight}px`;

  });
  reader4.readAsDataURL(file3); //read contents of the file

  document.getElementById("texture").onclick = function() {

  loader3.load(uploaded_texture,
    
    function ( texture ) {
		// in this example we create the material when the texture is loaded
		obj.material = new THREE.MeshBasicMaterial( {
			map: texture,
      side:THREE.DoubleSide
		 } );
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);
      }
      });
var counter_wild=0;
var counter_wild2=0;
var counter_wilds=0;

///////////////check wildcards2/////////////
export function checkthewildcards2(){
  //const dynamicAttribute = 'wildcard';
  //const attributeValue = mesh.id; 
  
  // all elements with the attribute "wildcard"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  counter_wilds=elementsWithAttribute.length;
  // Change the IDs of each element
;counter_wild=0;counter_wild2=0;
  for (var n = scene.children.length-1; n < scene.children.length; n++) {
    if (scene.children[n] instanceof THREE.Scene || scene.children[n].type==="Group") {
      for (var l = 0; l <= scene.children[n].children.length-1;/*teleytaiopoualajaapo counterwilds;*/l++) {
        scene.children[n].children[l].userData.layerid = l + 199 + counter_wilds-1;
        if(scene.children[n].children[l].children.length>0){scene.children[n].children[l].children[0].userData.layerid=l + 199 + counter_wilds-1;scene.children[n].children[l].userData.layerid=0;}
        if(scene.children[n].children.length===1){
                  var elementId = l+counter_wilds+4+lnt ;                                                       /////////////////////////anti n -counter_wilds+4
        }else{
          var elementId = counter_wilds+4-(scene.children[scene.children.length-1].children.length-1)+l+lnt;      /////////////////////////anti n -counter_wilds+4

        }
      const currentElement = document.getElementById(elementId);
  if(scene.children[n].children[l].isMesh){      
  if (currentElement && currentElement.innerHTML === scene.children[n].children[l].name)  {
    // Change the 'wildcard' attribute to something
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  }else if(currentElement && currentElement.innerHTML === scene.children[n].children[l].name.split('_').slice(0, -1).join('.')){
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );

  }
}else if(scene.children[n].children[l].type==="Object3D"&&scene.children[n].children[l].children.length>0)
{
  currentElement.setAttribute('wildcard',scene.children[n].children[l].children[0].userData.layerid);

}else if(scene.children[n].children[l].type==="Object3D"&&scene.children[n].children[l].children.length===undefined){
  currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );

}else{
  if (currentElement && currentElement.innerHTML === scene.children[n].children[l].children[0].name) {
    // Change the 'wildcard' attribute to something
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  }
}
      }
    }else if(scene.children[n].type==="Mesh"&&scene.children[scene.children.length-1].children.length>0){
      scene.children[n].userData.layerid =  199 + counter_wilds+5-(scene.children[scene.children.length-1].children.length-1) //+ lnt;// 199 + l
      var elementId =n-(scene.children[scene.children.length-1].children.length-1)+lnt;           /////////////////////////anti n -counter_wilds+4
var currentElement = document.getElementById(elementId);
//if (currentElement && currentElement.innerHTML === scene.children[n].name.split('_').slice(0, -1).join('.'))  {
  // Change the 'wildcard' attribute to something
  currentElement.setAttribute('wildcard',scene.children[n].userData.layerid );
    }else if(scene.children[n].type==="Mesh"&&scene.children[scene.children.length-1].children.length===0){

      scene.children[n].userData.layerid =  199 + counter_wilds-1 //+ lnt;// 199 + l
      var elementId =n+lnt;                                                                       /////////////////////////anti n -counter_wilds+4
var currentElement = document.getElementById(elementId);
//if (currentElement && currentElement.innerHTML === scene.children[n].name.split('_').slice(0, -1).join('.'))  {
  // Change the 'wildcard' attribute to something
  currentElement.setAttribute('wildcard',scene.children[n].userData.layerid );

    }
  }
  counter_wilds=0;
  }
var counter_wilds3=0;
    var scenesloadedcounter=0;
  export function checkthewildcards3(){
    //const dynamicAttribute = 'wildcard';
    //const attributeValue = mesh.id; 
    
    // all elements with the attribute "wildcard"
    const elementsWithAttribute = document.querySelectorAll('[wildcard]');
    counter_wilds3=elementsWithAttribute.length;
    counter_wild=0;counter_wild2=0;
    for (var n = scene.children.length-1; n < scene.children.length; n++) {
      if (scene.children[n] instanceof THREE.Scene || scene.children[n].type==="Group") {
        for (var l = 0; l <= scene.children[n].children.length-1;/*teleytaiopoualajaapo counterwilds;*/l++) {
          scene.children[n].children[l].userData.layerid = l + 199 +counter_wilds3-(scene.children[scene.children.length-1].children.length);
         if(scene.children[n].children[l].children.length>0){scene.children[n].children[l].children[0].userData.layerid=l + 199 +counter_wilds3-(scene.children[scene.children.length-1].children.length);scene.children[n].children[l].userData.layerid=0;}
          const elementId =  counter_wilds3+4-(scene.children[scene.children.length-1].children.length-1)+l+lnt;
        const currentElement = document.getElementById(elementId);
    if(scene.children[n].children[l].isMesh){      
    if (currentElement && currentElement.innerHTML === scene.children[n].children[l].userData.name)  {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
    }else if(currentElement && currentElement.innerHTML === scene.children[n].children[l].name.split('_').slice(0, -1).join('.')){
      currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  
    }
  }else if(scene.children[n].children[l].type==="Object3D"&&scene.children[n].children[l].children.length>0)
  {
    currentElement.setAttribute('wildcard',scene.children[n].children[l].children[0].userData.layerid );
  
  }else if(scene.children[n].children[l].type==="Object3D"&&scene.children[n].children[l].children.length===undefined)
  {
    currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
  
  }else{
    if (currentElement && currentElement.innerHTML === scene.children[n].children[l].children[0].name) {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[n].children[l].userData.layerid );
    }
  }
        }
      }else if(scene.children[n].type==="Mesh"){
        scene.children[n].userData.layerid =  199 + scene.children.length-6 ;// 199 + l
        var elementId =counter_wilds3+4+lnt;
  var currentElement = document.getElementById(elementId);
  //if (currentElement && currentElement.innerHTML === scene.children[n].name.split('_').slice(0, -1).join('.'))  {
    // Change the 'wildcard' attribute to something
    currentElement.setAttribute('wildcard',scene.children[n].userData.layerid );
  
  //}
      }
    }scenesloadedcounter++;          
    counter_wilds3=0;
    }
  
var counter_wilds4=0;
      var c2_wild=1;
     var c3_wild=0;
export var take;
    export function checkthewildcards4(){
      //const dynamicAttribute = 'wildcard';
      //const attributeValue = mesh.id; 
      
      // all elements with the attribute "wildcard"
      const elementsWithAttribute = document.querySelectorAll('[wildcard]');
      counter_wilds4=elementsWithAttribute.length;
      counter_wild=0;counter_wild2=0;
      elementsWithAttribute.forEach(element => {//const elid=parseInt(element.id, 10);
         if (element.innerHTML !== filenameMerged2){
          c3_wild++;
      }else{
        take=c3_wild;
        return;
      }
      })
      const merged= document.getElementById(take-(howmanymergedbtns)+counter_wilds4+5-(scene.children.length-5)+lnt)
      merged.setAttribute('wildcard',199 +take);
      var attributeValue = merged.getAttribute('wildcard');
     integerValue = parseInt(attributeValue); 
      for (var n = take-(howmanymergedbtns)+counter_wilds4+5-(scene.children.length-5)+lnt; n < scene.children.length; n++) {
      
            scene.children[n].userData.layerid =199 +take+lnt+c2_wild;
            const elementId = take-(howmanymergedbtns)+counter_wilds4+5-(scene.children.length-5-c2_wild)+lnt;
          const currentElement = document.getElementById(elementId);
          if (currentElement && currentElement.innerHTML === scene.children[n].name)  {
        currentElement.setAttribute('wildcard',scene.children[n].userData.layerid );
          }c2_wild++; 
      }       c3_wild=0;c2_wild=1;counter_wilds4=0;
      }
    var counter_wilds5=0;
      var c5_wild=1;
     var c6_wild=0;

   export  var howmany=-1;
    export function checkthewildcards5(){
         //const dynamicAttribute = 'wildcard';
      //const attributeValue = mesh.id; 
      howmany++;
      // all elements with the attribute "wildcard"
      if(howmany===0){
      const elementsWithAttribute = document.querySelectorAll('[wildcard]');
      counter_wilds5=elementsWithAttribute.length;
      //counter_wild=0;counter_wild2=0;
      elementsWithAttribute.forEach(element => {//const elid=parseInt(element.id, 10);
         if (element.innerHTML !== filenameMerged[howmany]){
          c6_wild++;
      }else{
        take=c6_wild;
        return;
      }
      })
      if(cndr!==0){const merged= document.getElementById((take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5)+lnt)-take+cnT_gltf_merged+cndr);
        var xx=(take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5)+lnt)-take;
        merged.setAttribute('wildcard',199 +take+cndr);
        merged.setAttribute('catchmergedbtn',howmany);
        merged.setAttribute('mergedbtn',howmany);

        var attributeValue = merged.getAttribute('wildcard');
        mrgbtnswildcararray.push(attributeValue);
        localStorage.setItem("mrgbtnswildcararray", JSON.stringify(mrgbtnswildcararray));
  
       integerValue2[howmany] = parseInt(attributeValue); 
          for (var l = 0; l <= scene.children[scene.children.length-1].children.length-1;/*teleytaiopoualajaapo counterwilds;*/l++) {
            if( scene.children[scene.children.length-1].children[l].type!=='Mesh'){
              scene.children[scene.children.length-1].children[l].children[0].userData.layerid =199 +take+c5_wild+cndr;
              scene.children[scene.children.length-1].children[l].children[0].userData.catchmergebtn=howmany;
              const elementId = (take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5-c5_wild)+lnt)-take+cnT_gltf_merged+cndr;
            const currentElement = document.getElementById(elementId);
            if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length>0)
      {if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name)  {
      currentElement.setAttribute('wildcard', scene.children[scene.children.length-1].children[l].children[0].userData.layerid);
      currentElement.setAttribute('catchmergedbtn',howmany);
   }
  }else if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length===undefined){
    currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
    currentElement.setAttribute('catchmergedbtn',howmany);
  
  }else{
      if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name) {
        // Change the 'wildcard' attribute to something
        currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
        currentElement.setAttribute('catchmergedbtn',howmany);
  
      }
    }
  }else{
  scene.children[scene.children.length-1].children[l].userData.layerid =199 +take+c5_wild+cndr;
  scene.children[scene.children.length-1].children[l].userData.catchmergebtn=howmany;
  
              const elementId = (take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5-c5_wild)+lnt)-take+cnT_gltf_merged+cndr;
            const currentElement = document.getElementById(elementId);
             if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].userData.name)  {
        // Change the 'wildcard' attribute to something
        currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
        currentElement.setAttribute('catchmergedbtn',howmany);
  
      }else if(currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].name){
        currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
        currentElement.setAttribute('catchmergedbtn',howmany);
  
      }
  }
            c5_wild++; 
        }       c6_wild=0;c5_wild=1;counter_wilds5=0;
      }else{
      const merged= document.getElementById((take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5)+lnt)-take+cnT_gltf_merged);
      var xx=(take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5)+lnt)-take;
      merged.setAttribute('wildcard',199 +take);
      merged.setAttribute('catchmergedbtn',howmany);
      merged.setAttribute('mergedbtn',howmany);

      var attributeValue = merged.getAttribute('wildcard');
      mrgbtnswildcararray.push(attributeValue);
      localStorage.setItem("mrgbtnswildcararray", JSON.stringify(mrgbtnswildcararray));

     integerValue2[howmany] = parseInt(attributeValue); 
        for (var l = 0; l <= scene.children[scene.children.length-1].children.length-1;/*teleytaiopoualajaapo counterwilds;*/l++) {
          if( scene.children[scene.children.length-1].children[l].type!=='Mesh'){
            scene.children[scene.children.length-1].children[l].children[0].userData.layerid =199 +take+c5_wild;
            scene.children[scene.children.length-1].children[l].children[0].userData.catchmergebtn=howmany;
            const elementId = (take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5-c5_wild)+lnt)-take+cnT_gltf_merged;
          const currentElement = document.getElementById(elementId);
          if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length>0)
    {if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name)  {
    currentElement.setAttribute('wildcard', scene.children[scene.children.length-1].children[l].children[0].userData.layerid);
    currentElement.setAttribute('catchmergedbtn',howmany);
 }
}else if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length===undefined){
  currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
  currentElement.setAttribute('catchmergedbtn',howmany);

}else{
    if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name) {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }
  }
}else{
scene.children[scene.children.length-1].children[l].userData.layerid =199 +take+c5_wild;
scene.children[scene.children.length-1].children[l].userData.catchmergebtn=howmany;

            const elementId = (take-(howmanymergedbtns)+counter_wilds5-(scene.children[scene.children.length-1].children.length-5-c5_wild)+lnt)-take+cnT_gltf_merged;
          const currentElement = document.getElementById(elementId);
           if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].userData.name)  {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }else if(currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].name){
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }
}
          c5_wild++; 
      }       c6_wild=0;c5_wild=1;counter_wilds5=0;
    }
    }else{
      const elementsWithAttribute = document.querySelectorAll('[wildcard]');
      counter_wilds5=elementsWithAttribute.length;
      //counter_wild=0;counter_wild2=0;
      elementsWithAttribute.forEach(element => {//const elid=parseInt(element.id, 10);
         if (element.innerHTML !== filenameMerged[howmany]){
          c6_wild++;
      }else{
        take=c6_wild;
        return;
      }
      })
      const merged= document.getElementById(scene.children.length+lnt+(howmany-1)+nestedscenelength);
      var xx=scene.children.length-1;
      merged.setAttribute('wildcard',199 +take+howmany);
      merged.setAttribute('catchmergedbtn',howmany);
      merged.setAttribute('mergedbtn',howmany);
      var attributeValue = merged.getAttribute('wildcard');
      mrgbtnswildcararray.push(attributeValue);
      localStorage.setItem("mrgbtnswildcararray", JSON.stringify(mrgbtnswildcararray));
     integerValue2[howmany] = parseInt(attributeValue); 
        for (var l = 0; l <= scene.children[scene.children.length-1].children.length-1;/*teleytaiopoualajaapo counterwilds;*/l++) {
          if( scene.children[scene.children.length-1].children[l].type!=='Mesh'){
            scene.children[scene.children.length-1].children[l].children[0].userData.layerid =199 +take+howmany+l+1;
            scene.children[scene.children.length-1].children[l].children[0].userData.catchmergebtn=howmany;

            const elementId = scene.children.length+lnt+c5_wild+(howmany-1)+nestedscenelength;
          const currentElement = document.getElementById(elementId);
          if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length>0)
    {if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name)  {
    currentElement.setAttribute('wildcard', scene.children[scene.children.length-1].children[l].children[0].userData.layerid);
    currentElement.setAttribute('catchmergedbtn',howmany);
 }
}else if(scene.children[scene.children.length-1].children[l].type==="Object3D"&&scene.children[scene.children.length-1].children[l].children.length===undefined){
  currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
  currentElement.setAttribute('catchmergedbtn',howmany);

}else{
    if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].children[0].name) {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }
  }
}else{
scene.children[scene.children.length-1].children[l].userData.layerid =199 +take+howmany+l+1;
scene.children[scene.children.length-1].children[l].userData.catchmergebtn=howmany;

            const elementId = scene.children.length+lnt+c5_wild+(howmany-1)+nestedscenelength;
          const currentElement = document.getElementById(elementId);
           if (currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].userData.name)  {
      // Change the 'wildcard' attribute to something
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }else if(currentElement && currentElement.innerHTML === scene.children[scene.children.length-1].children[l].name){
      currentElement.setAttribute('wildcard',scene.children[scene.children.length-1].children[l].userData.layerid );
      currentElement.setAttribute('catchmergedbtn',howmany);

    }
}
          c5_wild++; 
      }       c6_wild=0;c5_wild=1;counter_wilds5=0;
    
    }
  }


  const clearButton = document.getElementById('clear-button');

  clearButton.addEventListener('click', function() {
    howmanymergedbtns=0;
    howmany=-1;
    if(individualMeshes.length!==undefined&&individualMeshes.length>0){
    individualMeshes.splice(0,individualMeshes.length);}
    if(array_of_arrays.length!==undefined&&array_of_arrays.length>0){
    array_of_arrays.splice(0,array_of_arrays.length);}
    if(array_of_arrays2.length!==undefined&&array_of_arrays2.length>0){
    array_of_arrays2.splice(0,array_of_arrays2.length);}
    if(scnuuid.length!==undefined&&scnuuid.length>0){
      scnuuid.splice(0,scnuuid.length);}
      if(mergedmedhuuid.length!==undefined&&mergedmedhuuid.length>0){
        mergedmedhuuid.splice(0,mergedmedhuuid.length);}
        if(filenameMerged.length!==undefined&&filenameMerged.length>0){
          filenameMerged.splice(0,filenameMerged.length);}
          if(integerValue2.length!==undefined&&integerValue2.length>0){
            integerValue2.splice(0,integerValue2.length);}
            if(MergedMeshes2.length!==undefined&&MergedMeshes2.length>0){
              MergedMeshes2.splice(0,MergedMeshes2.length);}
              if(innerHtmlArray.length!==undefined&&innerHtmlArray.length>0){
                innerHtmlArray.splice(0,innerHtmlArray.length);}
    filenameMerged2=null;
    integerValue=undefined; 
    cnT_gltf_merged=-1;
    take=0;
    isMerged=false;
    isMerged2=Array(1000).fill(false);
    checkifthereismodel_tuc();
  });


  var chckprojects=[];
  document.getElementById('form').addEventListener('input', function() {  
    const project_nameError = document.getElementById('project_name-error');
    const project_name = this.value.trim();
    if (project_name !== '') {             
      if (chckprojects.includes(project_name)) {
        project_nameError.innerHTML = "&#10006;"
        project_nameError.style.color='red';
    } else {
      project_nameError.innerHTML = '&#10004;'
      project_nameError.style.color='green';
    }
    }else{
      project_nameError.innerHTML = "";
    }
  });

  var chckteams=[];

{fetch('/teams', {method: 'GET'})
.then(function(response) {
   if(response.ok) return response.json();
   throw new Error('Request failed.');
 })
 .then(function(data) {

  for (var g = 0; g < data.length; g++) {
    chckteams.push(data[g].team_name.team_name)

     }     
})
}
if(document.getElementById('form2')!=null){
document.getElementById('form2').addEventListener('input', function() {
  const team_nameError = document.getElementById('team_name-error');
  const team_name = this.value.trim();
  if (team_name !== '') {             
    if (chckteams.includes(team_name)) {
      team_nameError.innerHTML = "&#10006;"
      team_nameError.style.color='red';
  }else {
    team_nameError.innerHTML = '&#10004;'
    team_nameError.style.color='green';
  }
}else{
  team_nameError.innerHTML = "";
  }
});
}

// Attach an event listener to the beforeunload event
window.addEventListener('beforeunload', function(event) {
  // Call your function before the page is refreshed
  event.preventDefault(); // Prevent the default behavior (showing confirmation dialog)

});


function showPopup() {
  document.getElementById('popupContainer').style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
  document.getElementById('popupContainer').style.display = 'none';
}

function updateProgressBar(progress) {
  var progressBar = document.getElementById('progress');
  progressBar.style.width = progress + '%';
}
if (document.getElementById("save_workspace") !== null && document.getElementById("save_workspace") !== 'undefined') {
document.getElementById("save_workspace").onclick = function() {
    document.getElementById('popupContainer').style.display = 'block';

    // This timeout ensures that the UI update is done before executing saveScene()
    setTimeout(() => {
        saveScene().then(() => {
            document.getElementById('popupContainer').style.display = 'none';
        }).catch(error => {
            console.error("Error saving scene:", error);
            // Handle error here if necessary
        });
    }, 1000);

    const userTime = new Date();

    // Get the hour component of the user's local time
    const hour = userTime.getHours();
    
    // Get the minute component of the user's local time
    const minute = userTime.getMinutes();
    
    // Get the second component of the user's local time
    const second = userTime.getSeconds();
    
    // Update the innerHTML of the lastSavedAt div element
    document.getElementById("lastSavedAt").innerHTML = 'Last saved at: ' + hour + ':' + minute + ':' + second;
    localStorage.setItem('time', JSON.stringify(document.getElementById("lastSavedAt").innerHTML));

}
}

const clearonlogout = document.getElementById('logout');

// Add event listener to the button
clearonlogout.addEventListener('click', function() {
    // Clear everything in localStorage
    localStorage.clear();
});

window.onload = function() {
  document.getElementById('popupContainer').style.display = 'none';
};

function checkthewildteam(){
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
var checkthewild=0;
          var count=0;
          var count2=0;

  elementsWithAttribute.forEach(element => {
    const elid=parseInt(element.id, 10); 
    var wildcardValue = parseInt(element.getAttribute('wildcard'), 10)
    if (wildcardValue - elid+lnt !== 194) { 

      scene.traverse( function( object) {
        if(wildcardValue===object.userData.layerid){
          count2++;
        }})

      const newvalue = wildcardValue - elid+lnt;
      const wildvalue = 194 - newvalue;
      const newValue = wildcardValue + wildvalue;

      element.setAttribute('wildcard', newValue.toString());
      
          var atValue = wildcardValue;
          var atValueNum=parseInt(atValue, 10)
          scene.traverse( function( object) {
            if(checkthewild===0&&count===0&&count2===1){
                  if (atValueNum===object.userData.layerid)
                  {
                    object.userData.layerid=newValue;
                    checkthewild++;
                    count++;
                  }
                }else{
                    if (atValueNum===object.userData.layerid){
                        if(count===0&&count2===2){
                          object.userData.layerid=object.userData.layerid;
                          count++;
                        }else{
                          object.userData.layerid=newValue;
                          count++;
                        }
                    }
                  }
                
                } );
  }
            
          })


}

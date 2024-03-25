import{canvas,renderer}from "./renderer.js";
import {_GLTFExporter} from "./three-gltf-exporter/index.js";
import{mouse,view1Elem,transformControls,obj,controls,colorpicker,colorpicker2, uploaded_image,isDragging}from"./controls.js";
import{camera}from"./camera.js";
import{objects,geometry,splitwhenload,checkifthereismodel,checkifthereismodel_tuc}from"./3dobjects.js";
import{scene}from"./scene.js";
import{render}from"./render.js";
import { GLTFLoader } from "./GLTFLoader.js";
import {initcenter,arrayOfZeros,mrgbtnswildcararray, integerValue2,chck,howmany,uploaded,uploaded_obj,uploadedmtl,mtlLoader,loader2,gltf_model_counter_signal,obj_model_counter_signal,addids2,project_name,scnchldrn2,scnobjs2,checkthewildcards3,innerHtmlArray,lnt,elementWithInnerHTMLExists,nestedscenelength,scnchldrn,functoupdatescnchldrnlentgh_teams,individualMeshes,array_of_arrays,individualMeshes2,array_of_arrays2} from "./imp-exp.js";
let user_username;
var lastonline=[];
var team_id;
var admin_id;
var members_ids;
var counter_wilds=0;
var counteraki=0;
let isFirstConnection_onRoom = localStorage.getItem('isFirstConnection_onRoom') === 'true';
var chckprojects_teams=[];
var savelastposition=[]; var cound=-1;
var savemerges=[];
var usersloggedinteam=0;
var popup = document.getElementById("popupContainer2");
var btnYes = document.getElementById("btnYes");
var btnNo = document.getElementById("btnNo");
var popupcontent = document.getElementById("popupContent");
function closePopup() {
  popup.style.display = "none";
}
//layer_array_room=[];

let socket = io.connect('https://localhost:3000', {
  query: {
    isFirstConnection_onRoom: isFirstConnection_onRoom.toString(),         
  },
});
let startButton = document.getElementById("startButton");
var check=false;
let count;
const loader_team = new THREE.TextureLoader();
const loader = new GLTFLoader();

function cutUrl(url, segmentsToRemove) {
  // Use URL object to handle absolute URLs
  var urlObject = new URL(url);

  // Get path segments
  var pathSegments = urlObject.pathname.split('/');

  // Remove the specified number of segments from the beginning
  pathSegments = pathSegments.slice(segmentsToRemove);

  // Join the remaining path segments to form the modified path
  var modifiedPath = pathSegments.join('/');

  // Update the URL object with the modified path
  urlObject.pathname = modifiedPath;

  // Get the updated URL as a string
  var modifiedUrl = urlObject.href;

  return modifiedUrl;
}
var needtocut = window.location.href;var roomurl = cutUrl(needtocut, 3);
console.log(roomurl);


/*{fetch('/profile', {method: 'GET'})
.then(function(response) {
   if(response.ok) return response.json();
   throw new Error('Request failed.');
 })         .then(function(data){
  //var liker =data[0].username;
 user_username=data.user.username;
 console.log(user_username);*/
// Remove the first three segments
socket.on('connect', function() {
  const url_team = window.location.href;
  const parts = url_team.split('/');
  const teamname = parts[parts.length - 1]; // Get the last part of the URL
  fetch(`/team_ids?team_name=${encodeURIComponent(teamname)}`, { method: 'GET' })
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
        team_id=data[0]._id;
        admin_id = data[0].admin_id;
        members_ids = data[0].members_ids;
        fetch(`/users_team_admin?team_admin=${encodeURIComponent(admin_id)}`, { method: 'GET' })
            .then(function(response) {
                if (response.ok) return response.json();
                throw new Error('Failed to fetch user data for admin.');
            })
            .then(function(adminData) {
                // Process admin data here
                console.log('Admin:', adminData);
                for(var jj=0; jj<adminData.length;jj++){
                  const usr = document.createElement("div");
              usr.setAttribute('id', "user");
              usr.innerHTML = "<br>admin<br>" + adminData[jj].username;
              document.getElementById("users").appendChild(usr);
              }
            })
            .catch(function(error) {
                console.error('Error fetching user data for admin:', error);
            });
            const query = `team_members=${members_ids.map(id => encodeURIComponent(id)).join(',')}`;
            fetch(`/users_team_members?${query}`, { method: 'GET' })
                .then(function(response) {
                    if (response.ok) return response.json();
                    throw new Error('Failed to fetch user data for member.');
                })
        .then(function(memberData) {
            // Process member data here
            for (var jj = 0; jj < memberData.length; jj++) {
              const usr = document.createElement("div");
              usr.setAttribute('id', "user");
              if (jj === 0) {
                  usr.innerHTML = "<br>members<br>"+ memberData[jj].username;
              } else {
                  usr.innerHTML = "      " + memberData[jj].username;
              }
              document.getElementById("users").appendChild(usr);
          }
        })
                .catch(function(error) {
                    console.error('Error fetching user data for member:', error);
                });
      return  fetchDataAndInitialize_teams();
    })
    .then(function () {
      return fetchbigDataAndInitialize_teams();
    }).then(function(){
      var elements = document.querySelectorAll('#more_teams *');
      for (var i=0;i< elements.length;i++) {
        chckprojects_teams.push(elements[i].innerHTML); 
          
      }
    }).then(function () {
      // Fetch profile data
      return fetch('/profile', { method: 'GET' })
          .then(function (response) {
              if (response.ok) return response.json();
              throw new Error('Request failed.');
          })
          .then(function (data) {
              // Extract username from fetched data
              user_username = data.user.username;
              console.log(user_username);
              return user_username; // Pass username to the next then block
          });
  })
  .then(function (user_username) {
    // Emit user information to socket
    const userInfo = {
        username: user_username
    };
    const updatedUsers = {};

    // Emit 'user-info' event with userInfo data
    socket.emit('user-info', userInfo);
    
    // Return a Promise that resolves when the 'user-info' event is emitted
    return new Promise(function(resolve, reject) {
        const users = document.getElementById("users");
        // Listen for 'user-info' event and handle it              
        users.style.visibility = "visible";
    
        socket.on('user-info', (arg) => {
          usersloggedinteam++;
          var sign=0;
var sign1=0; 
var sign2=0;
var sign3=0;
var sign4=0;
          const userElements = document.querySelectorAll('#user');

          userElements.forEach((element) => {
              const username = element.textContent.trim();
              const innerHTML1 = element.innerHTML.replace("<br>members<br>", "");
              const innerHTML2 = element.innerHTML.replace("<br>admin<br>", "");
              const match = element.innerHTML.match(/<br>admin<br>(.*?)<div/);
              const innerHTML3 = match ? match[1] : '';
              const match2 = element.innerHTML.match(/<br>members<br>(.*?)<div/);
              const innerHTML4 = match2 ? match2[1] : '';

              const parser = new DOMParser();

              const doc = parser.parseFromString(`<div>${username}</div>`, 'text/html');
              const textContent = doc.body.textContent.trim();
              
              const doc1 = parser.parseFromString(`<div>${innerHTML1}</div>`, 'text/html');
              const textContent1 = doc1.body.textContent.trim();
              
              const doc2 = parser.parseFromString(`<div>${innerHTML2}</div>`, 'text/html');
              const textContent2 = doc2.body.textContent.trim();
              
              const doc3 = parser.parseFromString(`<div>${innerHTML3}</div>`, 'text/html');
              const textContent3 = doc3.body.textContent.trim();
              
              const doc4 = parser.parseFromString(`<div>${innerHTML4}</div>`, 'text/html');
              const textContent4 = doc4.body.textContent.trim();

              var isUserOnline;
              if(arg.includes(textContent)) {isUserOnline=true;sign=1;}else if(arg.includes(textContent1)){isUserOnline=true;sign1=1;}
              else if (arg.includes(textContent2)){
                {isUserOnline=true;sign2=1;}
              }else if(arg.includes(textContent3)){
                  isUserOnline=true;sign3=1;
                }else if(arg.includes(textContent4)){
                  isUserOnline=true;sign4=1;
                }
               
      
              // Remove existing indicators
              const existingIndicator = element.querySelector('.online-indicator, .offline-indicator');
              if (existingIndicator) {
                  existingIndicator.remove();
              }
      
              // Add online indicator if the user is online
              if (isUserOnline) {
                  const onlineIndicator = document.createElement('div');
                  onlineIndicator.setAttribute('class', "online-indicator");
                  onlineIndicator.setAttribute('id', "online-indicator");
                  onlineIndicator.style.display = "block";
                  element.appendChild(onlineIndicator);
      
                  const blink = document.createElement("span");
                  blink.setAttribute('class', "blink");
                  onlineIndicator.appendChild(blink);
                  if(lastonline.length<arg.length){
                  if(usersloggedinteam>1 && textContent!==user_username && textContent1!==user_username && textContent2!==user_username && textContent3!==user_username && textContent4!==user_username){
                    if(textContent===arg[arg.length-1] || textContent1===arg[arg.length-1] ||textContent2===arg[arg.length-1] ||textContent3===arg[arg.length-1] ||textContent4===arg[arg.length-1]){
                    if(sign===1){
                      var us=textContent;
                    }else if(sign1===1){
                      var us=textContent1;

                    }else if(sign2===1){
                      var us=textContent2;

                    }else if(sign3===1){
                      var us=textContent3;

                    }else if(sign4===1){
                      var us=textContent4;

                    }
                  
                    popup.style.display = "block";
                    document.getElementById("btnYes").style.border="none";
                    document.getElementById("btnYes").style.background="none";
                    document.getElementById("btnNo").style.border="none";
                    document.getElementById("btnNo").style.background="none";
                    let btnYesHTML = document.getElementById('btnYes').outerHTML;
                    let btnNoHTML = document.getElementById('btnNo').outerHTML;

                    // Set the innerHTML of popupcontent to only include the buttons
                    popupcontent.innerHTML = btnYesHTML + btnNoHTML;
                    let existingContent = popupcontent.innerHTML;
                    popupcontent.innerHTML=" Your teammate"+" " + us +" "+ "logged in!<br> Do you want to share workspace with"+" "+ us+"?" +"<br><br><br>"+existingContent;}}}
                    document.getElementById("btnYes").onclick = function() {
                      setTimeout(() => {
                        saveScene2().then(() => {
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
                    document.getElementById("lastSavedAt2").innerHTML = 'Last saved at: ' + hour + ':' + minute + ':' + second;
                    localStorage.setItem('time', JSON.stringify(document.getElementById("lastSavedAt2").innerHTML));
                      closePopup(); 
                    }
                    
                    document.getElementById("btnNo").onclick = function() {
                      closePopup(); 
                    }
                  
              }
              // Otherwise, add offline indicator
              else {
                  const offlineIndicator = document.createElement('div');
                  offlineIndicator.setAttribute('class', "offline-indicator");
                  offlineIndicator.setAttribute('id', "offline-indicator");
                  offlineIndicator.style.display = "block";
                  element.appendChild(offlineIndicator);
      
                  const blink = document.createElement("span");
                  blink.setAttribute('class', "blinkoff");
                  offlineIndicator.appendChild(blink);
              }
              element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()&& 
                !node.textContent.includes('admin') &&
                !node.textContent.includes('members')) {
                    const textWrapper = document.createElement('span');
                    textWrapper.style.paddingLeft = '21px';
                    textWrapper.appendChild(node.cloneNode(true));
                    node.replaceWith(textWrapper);
                }
            });
          });
          lastonline=arg;
    
            // Resolve the Promise once the event is handled
            resolve();
        });
    });
})
  .catch(function (error) {
      console.error('Error initializing:', error);
  });
/*  if (isFirstConnection_onRoom) {
  localStorage.setItem('isFirstConnection_onRoom', 'false');
  isFirstConnection_onRoom = false;
}else{
  socket.on('storedData', (storedData) => {
    console.log('Received stored data from server:', storedData);
    const blob_scene = new Blob([storedData], {type: 'text/plain'});
    const reloaded = URL.createObjectURL(blob_scene);  
    const loader = new GLTFLoader();
    loader.load(reloaded, (gltf) => {
      for(var ww=gltf.scene.children.length-1;ww>0;ww--){
      if(gltf.scene.children[ww].type==="Object3D"&&gltf.scene.children[ww].name!=="Scene"){
        gltf.scene.remove(gltf.scene.children[ww]);
      }else if(gltf.scene.children[ww].userData.name==="Sky"){
        gltf.scene.remove(gltf.scene.children[ww]);
      }else if(gltf.scene.children[ww].children.length===1){
        objects.push( gltf.scene.children[ww].children[0] );layer_array_room.push(gltf.scene.children[ww].children[0]);scene.add(gltf.scene.children[ww].children[0]); 
      }else if(gltf.scene.children[ww].children.length>1){
        for(var ee=0;ee<gltf.scene.children[ww].children.length-1;ee++){
        objects.push( gltf.scene.children[ww].chidlren[ee]);layer_array_room.push(gltf.scene.children[ww].children[ee]);scene.add(gltf.scene.children[ww].chidlren[ee]); 
      }
        }else{
        objects.push( gltf.scene.children[ww]);layer_array_room.push(gltf.scene.children[ww]);scene.add(gltf.scene.children[ww]);
      }
      }
      layer_array_room.reverse();
}); 
  })
  .then(function () {if(lnt!=null){
    if(layer_array_room[layer_array_room.length-1]!=null){
    for(var ii=0; ii<layer_array_room.length;ii++){
      const layer = document.createElement("button");
      layer.setAttribute('id', 5+ii+lnt+nestedscenelength+nestedsceneobj);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", 5+ii+194+lnt+nestedscenelength+nestedsceneobj);
      document.body.appendChild(layer);
      const node = document.getElementById(5+ii+lnt+nestedscenelength+nestedsceneobj);
      document.getElementById("layers").appendChild(node);
      document.getElementById(ii+5+lnt+nestedscenelength+nestedsceneobj).innerHTML = layer_array_room[ii].userData.name;
      layer_array_room[ii].userData.layerid=5+ii+194+lnt+nestedscenelength+nestedsceneobj;
    }
}
} 
layer_array_room= [];
})
// })
.catch(function (error) {
  console.error('Error initializing:', error);
});
}*/
  //const userInfo = {
 //   username: user_username,
 // };
  socket.emit('room', roomurl);
}); 
/*socket.on('user-info', (arg) => {
  if(document.getElementById("users").style.visibility==="hidden"){document.getElementById("users").style.visibility="visible"}
    const usr = document.createElement("div");
    usr.setAttribute('id', "user");
    const node = document.getElementById("user");
    document.getElementById("users").appendChild(node);
    document.getElementById("user").innerHTML = arg.username;
    });*/
   //})}


// Example
//const roomurl = getCurrentURL()

//socket.on('connect', function() {
  // Connected, let's sign-up for to receive messages for this room
  //socket.emit('room', roomurl);

/*socket.on('startGame-1', (arg) => {
  var newscene = new THREE.ObjectLoader().parse( JSON.parse( arg ) );
   scene.add(newscene); 
   
       });*/
//}); 



const serializedScene2 = JSON.stringify(scene);

socket.emit('startGame-1',serializedScene2, (err) => {
  if (err) {
    alert(err);
  }
});
transformControls.addEventListener( 'dragging-changed', function ( e ) {  
  controls.enabled = ! e.value;
             

          
 } );

 document.getElementById("save_workspace2").onclick = function() {
  document.getElementById('popupContainer').style.display = 'block';

  setTimeout(() => {
      saveScene2().then(() => {
          document.getElementById('popupContainer').style.display = 'none';
      }).catch(error => {
          console.error("Error saving scene:", error);
      });
  }, 1000);

  const userTime = new Date();

  const hour = userTime.getHours();
  
  const minute = userTime.getMinutes();
  
  const second = userTime.getSeconds();
  
  document.getElementById("lastSavedAt2").innerHTML = 'Last saved at: ' + hour + ':' + minute + ':' + second;
  localStorage.setItem('time', JSON.stringify(document.getElementById("lastSavedAt2").innerHTML));

}
 function saveScene2(){
  return new Promise((resolve, reject) => {

  const exporter2 = new _GLTFExporter();
  scene.remove(transformControls);
   //exporter2.parse(scene, (gltf) => {
      socket.emit('newWave2');
      checkifthereismodel_tuc();splitwhenload();
  exporter2.parse(scene, function(gltf) {
    
    const output = JSON.stringify( gltf, null, 2 );
    const blob= new Blob([output]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
     var arrayBuffer = reader.result;socket.emit('savesceneonreload2', arrayBuffer);
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

Object.keys(window).forEach(key => {
    if ( /^on(?!mouse|pointer)/) {check=false;
        window.addEventListener(key.slice(2), event => {if(!check){ 
            //console.log(event)
 

/////////////////////////////////simulate clicks//////////////////////////////////////
            if(event.type==='click' && event.target.id!='view1' && (event.target.id==='cube' || event.target.id==='sphere' || event.target.id==='tetrahedron' || event.target.id==='cylinder'|| event.target.id==='ocean')){
                //console.log(event.target.id, key);
            var clickdata={
                id:event.target.id,
                timeStamp:event.timeStamp,
                type:event.type,
                clientX:event.clientX,
                clientY:event.clientY
            };
            
            socket.emit('startGame',clickdata, (err) => {
                if (err) {
                  alert(err);
                }
              });
              const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {
    const elid=parseInt(element.id, 10); 
    const wildcardValue = parseInt(element.getAttribute('wildcard'), 10)
    if (wildcardValue - elid +lnt !== 194) { 
      const newvalue = wildcardValue - elid+lnt;
      const wildvalue = 194 - newvalue;
      const newValue = wildcardValue + wildvalue;

      element.setAttribute('wildcard', newValue.toString());
  }
            
          })
        }else if(event.type === 'keydown' && event.shiftKey && event.key === 'D') {
      
          for (var i=0;i<objects.length;i++){
            if(obj.uuid===objects[i].uuid){
             var count1=i;
              break;
            }
          }
          socket.emit('startGame8',count1, (err) => {
            if (err) {
              alert(err);
            }
          });
        }else if(event.type === 'keydown' && event.shiftKey && event.key === 'C') {
      
          for (var i=0;i<objects.length;i++){
            if(obj.uuid===objects[i].uuid){
             var count1=i;
              break;
            }
          }
          socket.emit('startGame10',count1, (err) => {
            if (err) {
              alert(err);
            }
          });
        } else if(event.type==='click' && event.target.id==='image' && uploaded_image!=null){

                /*var byteArray = new Uint8Array(uploaded_image.length);
                for (var b = 0; b < uploaded_image.length; b++) {
                     byteArray[b] = uploaded_image.charCodeAt(b);
                }*/
              
//.replace(/^data[^,]+,/,'')
 /*var byteArray = new Uint8Array(uploaded_image.length);
                for (var b = 0; b < uploaded_image.length; b++) {
                     byteArray[b] = uploaded_image.charCodeAt(b);
                }*/
                
              const blob = new Blob([uploaded_image], {type: 'text/plain'});

            //    var img_clickdata={
             //     id:event.target.id,
              //base64:blob
            //    };
                  socket.emit('startGame2',blob, (err) => {
                    if (err) {
                      alert(err);
                    }
                  });
              }else if(event.type==='click' && event.target.id==='model' && gltf_model_counter_signal===1){

                socket.emit('startGame3',uploaded, (err) => {
                  if (err) {
                    alert(err);
                  }
                })
                //uploaded=null;
              }else if(event.type==='click' && event.target.id==='model' && obj_model_counter_signal===1){
                var up_obj={
                  mtl:uploadedmtl,
                  obj:uploaded_obj
              };
                socket.emit('startGame7',up_obj, (err) => {
                  if (err) {
                    alert(err);
                  }
                })                          
              //  uploaded_obj=null;
              }
            
            else if(event.target.id==='colorpicker'){
              var colour={
              
                back_colour:colorpicker.value
              
              };
              socket.emit('startGame5',colour, (err) => {
                if (err) {
                  alert(err);
                }
              });
            }else if(event.target.id==='colorpicker2'){
              for (var i=0;i<objects.length;i++){
                if(obj!==undefined&&obj.uuid===objects[i].uuid){
                 var count1=i;
                  break;
                }
              }
              var colour_obj={
              counter:count1,
                obj_colour:colorpicker2.value
              
              };
              socket.emit('startGame6',colour_obj, (err) => {
                if (err) {
                  alert(err);
                }
              });
            }
            
            
            ///////////////simulate window//////////////////////
            else if ( event.target.id==='view1'){
///////////////////////////////////put arrows////////////////////////////////////////
                    /*if(event.type==='click' && obj!=null){
                      console.log(event,event.target.id, key);
                        for (var i=0;i<objects.length;i++){
                          if(obj.uuid===objects[i].uuid){
                            count=i;
                            break;
                          }
                        }
                      socket.emit('startGame2',count, (err) => {
                        if (err) {
                          alert(err);
                        }
                      });
                     }/*///////////////////////////////////////////////
                       if(event.type==='mousemove'){
                      
                      console.log(event);
                      /*var orbitcontrol={
                        positionx:controls.object.position.x,                
                        positiony:controls.object.position.y,
                        positionz:controls.object.position.z,

                        rotationx:controls.object.rotation.x,
                        rotationy:controls.object.rotation.y,
                        rotationz:controls.object.rotation.z

                      };
                      console.log(controls);
                      socket.emit('startGame3',orbitcontrol, (err) => {
                        if (err) {
                          alert(err);
                        }
                      });  */
                      if(obj.userData.merged===undefined){
                      for (var i=0;i<objects.length;i++){
                          if(obj.uuid===objects[i].uuid){
                            count=i;
                            break;
                          }
                        }
                                  var transform={
                                    counter:count,
                                    positionx:transformControls.children[0].object.position.x,                
                                    positiony:transformControls.children[0].object.position.y,
                                    positionz:transformControls.children[0].object.position.z,

                                    rotationx:transformControls.children[0].object.rotation.x,
                                    rotationy:transformControls.children[0].object.rotation.y,
                                    rotationz:transformControls.children[0].object.rotation.z,

                                    scalex:transformControls.children[0].object.scale.x,
                                    scaley:transformControls.children[0].object.scale.y,
                                    scalez:transformControls.children[0].object.scale.z
                          };
                          
                          console.log(controls);
                          socket.emit('startGame4',transform, (err) => {
                            if (err) {
                              alert(err);
                            }
                          });
                        }else{  
                          
                          let initialPos = null;
                          let finalPos = null;
                          var counterakis=0;

                          // Add event listener for mouse down
                          document.addEventListener('mousedown', (event) => {
                            if (initialPos === null) {
                              initialPos = obj.position.clone();
                          }        
                        });
                          
                              if (isDragging === true) {
                                  finalPos = obj.position.clone();counterakis++;
                                  var mergeValue = obj.userData.catchmergebtn;
                                  var count = parseInt(mergeValue, 10);
                                  var initposintersectpoint = new THREE.Vector3(
                                    obj.userData.intersectionPoint.x > 0 ? 
                                        obj.userData.intersectionPoint.x - initcenter[mergeValue].x :
                                        obj.userData.intersectionPoint.x + initcenter[mergeValue].x,
                                    obj.userData.intersectionPoint.y > 0 ? 
                                        obj.userData.intersectionPoint.y - initcenter[mergeValue].y :
                                        obj.userData.intersectionPoint.y + initcenter[mergeValue].y,
                                    obj.userData.intersectionPoint.z > 0 ? 
                                        obj.userData.intersectionPoint.z - initcenter[mergeValue].z :
                                        obj.userData.intersectionPoint.z + initcenter[mergeValue].z
                                );                                  var transform = {
                                      counter: count,
                                      initialPos: initialPos,
                                      finalPos: finalPos,
                                      arrayofzeros:arrayOfZeros,
                                      counterakis:counterakis,
                                      inter:initposintersectpoint
                                  };
                                  socket.emit('startGame9', transform, (err) => {
                                      if (err) {
                                          alert(err);
                                      }
                                  });
                               document.addEventListener('mouseup', (event) => {
                                if(obj.userData.merged!==undefined){
                                finalPos = obj.position.clone();var mouseup=1;
                                  var mergeValue = obj.userData.catchmergebtn;
                                  var count = parseInt(mergeValue, 10);
                                  var initposintersectpoint = new THREE.Vector3(
                                    obj.userData.intersectionPoint.x > 0 ? 
                                        obj.userData.intersectionPoint.x - initcenter[mergeValue].x :
                                        obj.userData.intersectionPoint.x + initcenter[mergeValue].x,
                                    obj.userData.intersectionPoint.y > 0 ? 
                                        obj.userData.intersectionPoint.y - initcenter[mergeValue].y :
                                        obj.userData.intersectionPoint.y + initcenter[mergeValue].y,
                                    obj.userData.intersectionPoint.z > 0 ? 
                                        obj.userData.intersectionPoint.z - initcenter[mergeValue].z :
                                        obj.userData.intersectionPoint.z + initcenter[mergeValue].z
                                );                                  var transform = {
                                      counter: count,
                                      initialPos: initialPos,
                                      finalPos: finalPos,
                                      arrayofzeros:arrayOfZeros,
                                      counterakis:counterakis,
                                      inter:initposintersectpoint,
                                      mouseup:mouseup
                                  };
                                  socket.emit('startGame9', transform, (err) => {
                                      if (err) {
                                          alert(err);
                                      }
                                  });
                                }
                            })}
                             
                      }
                          
                         /* if(obj.name!==''){
                            document.getElementById("uuid1").innerHTML = obj.name;}else{ document.getElementById("uuid1").innerHTML = obj.userData.name;}
                          //document.getElementById("uuid1").innerHTML = transformControls.children[0].object.uuid;
                          document.getElementById("x").value = transformControls.children[0].object.position.x;
                          document.getElementById("y").value = transformControls.children[0].object.position.y;
                          document.getElementById("z").value = transformControls.children[0].object.position.z;
                          document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
                          document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
                          document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
                          document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
                          document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
                          document.getElementById("z_s").value = transformControls.children[0].object.scale.z;*/

                          
            }
          
            }
          }else{
            check=false;
          }
    });
            }
});
//}



socket.on('startGame', (arg) => {

  if(arg.type==='click'){
            console.log(arg.id);
            const bat=document.getElementById(arg.id);
            check=true;
    bat.click(); 
    const layersContainer = document.getElementById("layers");
    layersContainer.removeChild(layersContainer.lastChild);
    const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
    // Change the IDs of each element
    elementsWithAttribute.forEach(element => {
      const elid=parseInt(element.id, 10); 
      const wildcardValue = parseInt(element.getAttribute('wildcard'), 10)
      if (wildcardValue - elid+lnt !== 194) { 
        const newvalue = wildcardValue - elid+lnt;
        const wildvalue = 194 - newvalue;
        const newValue = wildcardValue + wildvalue;
  
        element.setAttribute('wildcard', newValue.toString());
    }
              
            })
  }
      });

socket.on('startGame2', (arg) => {
  var url1;
  function arrayBufferToBase64( arg ) {
    var binary = '';
    var bytes = new Uint8Array( arg );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return url1 = binary ;
  }arrayBufferToBase64(arg);

  //document.querySelector("#uploadimage").style.backgroundImage = `url(${url1})`;
function makeInstance(geometry, color, rotY, url) {
  const texture = loader_team.load(url, 1);
  const material = new THREE.MeshStandardMaterial({
    color,
    map: texture,
    alphaTest: 0.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  objects.push(mesh)
  scene.add(mesh);
  mesh.userData.editable =true;
  mesh.userData.name = 'img';
  mesh.rotation.y = rotY;
}
makeInstance(geometry, 'white', 0,url1);  
//check=true;
//bat2.click();
  });
var cnt=0;
  socket.on('startGame3', (arg) => {

    const blob = new Blob([arg], {type: 'text/plain'});
    var upload = URL.createObjectURL(blob);  

    loader.load(upload, (gltf) => {
      let hasMesh = false;
      gltf.scene.userData.tomerge=cnt-1
 scene.add(gltf.scene);
 var sk=0;
 scene.traverse( function( object ) {
        if ( object.userData.name==="Sky"||object.name==="Sky"  ) if(sk===0){sk++}else{
          scene.remove(object);
        };
       } );
gltf.scene.traverse( function( object ) {
        if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.push( object );
        if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.castShadow = true; 
        if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.receiveShadow = true;
        if (object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") hasMesh = true;      
        if (object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") object.userData.editable=true;    
        if (object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") object.userData.tomerge=cnt-1;
       } );
     
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');
});
  /*load.traverse( function( object ) {
        if ( object.isMesh  ) objects.push( object );
        if ( object.isMesh ) objects.castShadow = true;  if (object.isMesh) hasMesh = true;      
        object.userData.editable=true;    
      } );
     
console.log(objects[0]);
console.log(hasMesh ? 'Found meshes!' : 'No meshes.');*/
 cnt++;   });
//gltf.scene.traverse( function( object ) {
 //       if ( object.isMesh  ) objects.push( object );
   //     if ( object.isMesh ) objects.castShadow = true;  if (object.isMesh) hasMesh = true;      
   //     object.userData.editable=true;    
   //   } );
     
//console.log(objects[0]);
//console.log(hasMesh ? 'Found meshes!' : 'No meshes.');

/*socket.on('startGame2', (arg) => {
console.log(arg);

    /*transformControls.attach(objects[arg]);
    transformControls.setMode('translate');
    scene.add(transformControls);
 
    document.getElementById("uuid1").innerHTML = objects[arg].uuid;
    document.getElementById("x").value = objects[arg].position.x;
    document.getElementById("y").value = objects[arg].position.y;
    document.getElementById("z").value = objects[arg].position.z;
    document.getElementById("x_r").value = objects[arg].rotation.x;
    document.getElementById("y_r").value = objects[arg].rotation.y;
    document.getElementById("z_r").value = objects[arg].rotation.z;
    document.getElementById("x_s").value = objects[arg].scale.x;
    document.getElementById("y_s").value = objects[arg].scale.y;
    document.getElementById("z_s").value = objects[arg].scale.z;


  });
*/
//////////////////////////////////////////////

/*socket.on('startGame3', (arg) => {
 console.log(arg.position);
 controls.object.position.x=arg.positionx
 controls.object.position.y=arg.positiony
 controls.object.position.z=arg.positionz

 controls.object.rotation.x=arg.rotationx 
 controls.object.rotation.y=arg.rotationy
 controls.object.rotation.z=arg.rotationz


// controls.update();
console.log(controls);
});*/

socket.on('startGame4', (arg) => {
  console.log(arg.position);
  /*transformControls.children[0].*/objects[arg.counter].position.x=arg.positionx
  objects[arg.counter].position.y=arg.positiony
  objects[arg.counter].position.z=arg.positionz
 
  objects[arg.counter].rotation.x=arg.rotationx 
  objects[arg.counter].rotation.y=arg.rotationy
  objects[arg.counter].rotation.z=arg.rotationz
  objects[arg.counter].scale.x=arg.scalex 
  objects[arg.counter].scale.y=arg.scaley
  objects[arg.counter].scale.z=arg.scalez
 // controls.update();
 /*document.getElementById("uuid1").innerHTML = objects[arg.counter].uuid;
 document.getElementById("x").value = objects[arg.counter].position.x;
 document.getElementById("y").value = objects[arg.counter].position.y;
 document.getElementById("z").value = objects[arg.counter].position.z;
 document.getElementById("x_r").value = objects[arg.counter].rotation.x;
 document.getElementById("y_r").value = objects[arg.counter].rotation.y;
 document.getElementById("z_r").value = objects[arg.counter].rotation.z;
 document.getElementById("x_s").value = objects[arg.counter].scale.x;
 document.getElementById("y_s").value = objects[arg.counter].scale.y;
 document.getElementById("z_s").value = objects[arg.counter].scale.z; */
 });
 var signx; var signy; var signz; var checkthis=false; var cn=0; var offsetfix=0;
 socket.on('startGame9', (arg) => {
  //console.log(arg.pos); 
if(arg.arrayofzeros[arg.counter]===1){
  for (var i = 0; i < scene.children.length; i++) {
    if(scene.children[i].userData.tomerge===arg.counter/*objects[i].userData.tomerge===arg.counter*/){
    //var newPosition = scene.children[i].position.clone().add((arg.pos));
  const initialPos = new THREE.Vector3(scene.children[i].position.x, scene.children[i].position.y, scene.children[i].position.z);

  // Set the new position of the object
  scene.children[i].position.copy(arg.finalPos);
  const finalPos = new THREE.Vector3(arg.finalPos.x, arg.finalPos.y, arg.finalPos.z);
  const difference = finalPos.clone().sub(initialPos);
  scene.traverse( function( object ) {
    if(object.isMesh&&object.userData.tomerge===arg.counter){

     // Add the difference to the object's position
     var childNewPosition = object.position.clone().add(difference);
     object.position.copy(childNewPosition);
    }
    });
  }
}
  }else{
  //  if(counterakis>1){
    if(arg.mouseup===undefined){
      if(savemerges.length>0&&savemerges[arg.counter]!==arg.arrayofzeros[arg.counter]||savemerges.length===0){
    for (var i = 0; i < scene.children.length; i++) { 
      if(scene.children[i].userData.tomerge===arg.counter/*objects[i].userData.tomerge===arg.counter*/){
      //var newPosition = scene.children[i].position.clone().add((arg.pos));
    const initialPos = new THREE.Vector3(arg.inter.x, arg.inter.y, arg.inter.z);
      const finalPos = new THREE.Vector3(arg.finalPos.x, arg.finalPos.y, arg.finalPos.z);
      if(arg.counterakis===1){
        var init = new THREE.Vector3(initialPos.x, initialPos.y, initialPos.z);
        var init2 = new THREE.Vector3(init.x, init.y, init.z);
      }
 /*    if(arg.finalPos.x!==0){
       // initposx=initialPos.x;
        initialPos.x=0;
      }
      if(arg.finalPos.y!==0){
       // initposy=initialPos.y;
        initialPos.y=0;
        init.x=0;
        init.z=0
        signy=1;
      }
      
      if(arg.finalPos.z!==0){
       // initposz=initialPos.z;
        initialPos.z=0;
        init.y=0;
        init.x=0
        signz=1;
      }*/
    // Set the new position of the object
    //const pos= scene.children[i].position.copy(finalPos1);
    const cln = scene.children[i].position.clone();
   const pos= cln.copy(finalPos).add(initialPos);
   const addem= new THREE.Vector3(initialPos.x+finalPos.x, initialPos.y+finalPos.y, initialPos.z+finalPos.z);
  /*  initialPos.x=init2.x;
    initialPos.y=init2.y;
    initialPos.z=init2.z;
    init.x=init2.x;
    init.y=init2.y;
    init.z=init2.z;*/
  if(savelastposition.length > 0 && savelastposition[0]!==1000 && cound!==-2|| savelastposition.length === 0 && cound!==-2){  
  if(checkthis){
    checkthis=false;
    cound++;
    cn=1;
  }else{  /*(if(cn===1&&savelastposition.length===0&&cound===0){    scene.children[i].position.copy(cln);//.sub(finalPos);

    scene.traverse(function(object) {
    if (object.isMesh && object.userData.tomerge === arg.counter) {

       var childNewPosition=object.position.clone();//.sub(finalPos);//.add(initialPos).add(finalPos);
        object.position.copy(childNewPosition);
      }
  });
}else{*/
    scene.children[i].position.copy(pos);
  scene.traverse(function(object) {
    if (object.isMesh && object.userData.tomerge === arg.counter) {
        var childNewPosition = object.position.clone().add(finalPos);
        if (savelastposition.length > 0) {
            childNewPosition.sub(savelastposition[0]); 
        }/*else if(cn===1&&savelastposition.length===0){
          childNewPosition=object.position.clone();//.sub(finalPos);
        }*/
        object.position.copy(childNewPosition);
      }
  });
//}
  const difference = pos.clone().sub(initialPos);  

if(cn===1){cn=0;}else{savelastposition[0]=finalPos;}
   cound++;

}
 }else if(!checkthis){
    savelastposition=[];
    checkthis=true;
    cound=-1;
 }
  /*if(!checkthis){
  }*/
      }
    }
  }else{
        for (var i = 0; i < scene.children.length; i++) { 
      if(scene.children[i].userData.tomerge===arg.counter/*objects[i].userData.tomerge===arg.counter*/){
      //var newPosition = scene.children[i].position.clone().add((arg.pos));
    const initialPos = new THREE.Vector3(arg.inter.x, arg.inter.y, arg.inter.z);
      const finalPos = new THREE.Vector3(arg.finalPos.x, arg.finalPos.y, arg.finalPos.z);
      if(arg.counterakis===1){
        var init = new THREE.Vector3(initialPos.x, initialPos.y, initialPos.z);
        var init2 = new THREE.Vector3(init.x, init.y, init.z);
      }
 /*    if(arg.finalPos.x!==0){
       // initposx=initialPos.x;
        initialPos.x=0;
      }
      if(arg.finalPos.y!==0){
       // initposy=initialPos.y;
        initialPos.y=0;
        init.x=0;
        init.z=0
        signy=1;
      }
      
      if(arg.finalPos.z!==0){
       // initposz=initialPos.z;
        initialPos.z=0;
        init.y=0;
        init.x=0
        signz=1;
      }*/
    // Set the new position of the object
    //const pos= scene.children[i].position.copy(finalPos1);
    const cln = scene.children[i].position.clone();
   const pos= cln.copy(finalPos).add(initialPos);
   const addem= new THREE.Vector3(initialPos.x+finalPos.x, initialPos.y+finalPos.y, initialPos.z+finalPos.z);
  /*  initialPos.x=init2.x;
    initialPos.y=init2.y;
    initialPos.z=init2.z;
    init.x=init2.x;
    init.y=init2.y;
    init.z=init2.z;*/
  if(savelastposition.length > 0 && savelastposition[0]!==1000 && cound!==-2|| savelastposition.length === 0 && cound!==-2){  
  if(checkthis){
    checkthis=false;
    cound++;
    cn=1;
  }else{  if(cn===1&&savelastposition.length===0&&cound===0){    
    scene.children[i].position.copy(pos).add(finalPos);

    scene.traverse(function(object) {
    if (object.isMesh && object.userData.tomerge === arg.counter) {

       var childNewPosition=object.position.clone().sub(finalPos);
       offsetfix=finalPos;
        object.position.copy(childNewPosition);
      }
  });
//}


  }else{
    scene.children[i].position.copy(pos);
  scene.traverse(function(object) {
    if (object.isMesh && object.userData.tomerge === arg.counter) {
        var childNewPosition = object.position.clone().add(finalPos);
        if (savelastposition.length > 0) {
            childNewPosition.sub(savelastposition[0]); 
        }/*else if(cn===1&&savelastposition.length===0){
          childNewPosition=object.position.clone();//.sub(finalPos);
        }*/
        object.position.copy(childNewPosition);
      }
    });
  }
  if(cn===1){cn=0;}else{savelastposition[0]=finalPos;}
   cound++;
}
 }else if(!checkthis){
    savelastposition=[];
    checkthis=true;
    cound=-1;
 }
  /*if(!checkthis){
  }*/
      }
    }
  }

  }
else if(arg.mouseup!==undefined&& cound!==-1){
  savelastposition[0]=1000;
  cound=-2;
  checkthis=false;
          savemerges[arg.counter]=arg.arrayofzeros[arg.counter];

}
  /*for (var i = 0; i < scene.children.length; i++) { 
    if(scene.children[i].userData.tomerge===arg.counter/*objects[i].userData.tomerge===arg.counter*//*){
      const finalPos = new THREE.Vector3(arg.finalPos.x, arg.finalPos.y, arg.finalPos.z);
      const initialPos = new THREE.Vector3(arg.inter.x, arg.inter.y, arg.inter.z);
      const difference2 = scene.children[i].position.clone().sub(initialPos);
    scene.traverse( function( object ) {
      if(object.isMesh&&object.userData.tomerge===arg.counter){
        //const difference = pos.clone().sub(initialPos);
       // Add the difference to the object's position
       var childNewPosition = object.position.clone().add(finalPos);//.add(finalPos);//.add(difference);
       object.position.copy(childNewPosition);
      }
      });cound=-1;
  }
}
}*/

//}//counterakis=0;
 /* }else{
    for (var i = 0; i < scene.children.length; i++) {
      if(scene.children[i].userData.tomerge===arg.counter/*objects[i].userData.tomerge===arg.counter){*/
      //var newPosition = scene.children[i].position.clone().add((arg.pos));
   /*const initialPos = new THREE.Vector3(scene.children[i].position.x, scene.children[i].position.y, scene.children[i].position.z);
      const finalPos = new THREE.Vector3(arg.finalPos.x+scene.children[i].position.x, arg.finalPos.y+scene.children[i].position.y, arg.finalPos.z+scene.children[i].position.z);

    // Set the new position of the object
    scene.children[i].position.copy(finalPos);
    const difference = finalPos.clone().sub(initialPos);
    scene.traverse( function( object ) {
      if(object.isMesh&&object.userData.tomerge===arg.counter){
  
       // Add the difference to the object's position
       var childNewPosition = object.position.clone();//.add(difference);
       object.position.copy(childNewPosition);
      }
      });
  }
}    counterakis++;*/

  
}
    /*for (var u = 0; u < objects.length; u++) {
      if(objects[u].userData.tomerge===arg.counter){
        var newPosition = objects[u].position.clone().add(difference);
        objects[u].position.copy(newPosition);
      }
    }*/
    
  /*scene.traverse( function( object ) {
   if(object.isMesh&&object.userData.tomerge===arg.counter){
    var childNewPosition = object.position.clone().add(arg.pos);
    object.position.copy(childNewPosition);
   }
   } );
  
  for (var u = 0; u < objects.length; u++) {
    if(objects[u].userData.tomerge===arg.counter){
      var newPosition = objects[u].position.clone().add((arg.pos));
      objects[u].position.copy(newPosition);
    }
  }   */         
    
 // controls.update();
 /*document.getElementById("uuid1").innerHTML = objects[arg.counter].uuid;
 document.getElementById("x").value = objects[arg.counter].position.x;
 document.getElementById("y").value = objects[arg.counter].position.y;
 document.getElementById("z").value = objects[arg.counter].position.z;
 document.getElementById("x_r").value = objects[arg.counter].rotation.x;
 document.getElementById("y_r").value = objects[arg.counter].rotation.y;
 document.getElementById("z_r").value = objects[arg.counter].rotation.z;
 document.getElementById("x_s").value = objects[arg.counter].scale.x;
 document.getElementById("y_s").value = objects[arg.counter].scale.y;
 document.getElementById("z_s").value = objects[arg.counter].scale.z; */
 });
 /*socket.on('startGame10', (arg) => {
  const finalPos = new THREE.Vector3(arg.finalPos.x, arg.finalPos.y, arg.finalPos.z);
  const initialPos = new THREE.Vector3(arg.initialPos.x, arg.initialPos.y, arg.initialPos.z);
  const difference = finalPos.clone().sub(initialPos);
  scene.traverse( function( object ) {
    if(object.isMesh&&object.userData.tomerge===arg.counter){

     // Add the difference to the object's position
     var childNewPosition = object.position.clone().add(difference);
     object.position.copy(childNewPosition);
    }
    } );
    for (var u = 0; u < objects.length; u++) {
      if(objects[u].userData.tomerge===arg.counter){
        var newPosition = objects[u].position.clone().add((difference));
        objects[u].position.copy(newPosition);
      }
    }
 });*/
 socket.on('startGame5', (arg) => {
  scene.background.set(arg.back_colour);

  });

  socket.on('startGame6', (arg) => {

    objects[arg.counter].material.color.set(arg.obj_colour);
  
    });
    socket.on('startGame7', (arg) => {

      const blob_obj = new Blob([arg.obj], {type: 'text/plain'});
      var upload_obj = URL.createObjectURL(blob_obj);  
  
      const blob_mtl = new Blob([arg.mtl], {type: 'text/plain'});
      var upload_mtl = URL.createObjectURL(blob_mtl);  

       
mtlLoader.load(
  upload_mtl,
  (materials) => {
      materials.preload();
      console.log(materials);                         
loader2.setMaterials(materials);
      // const objLoader = new OBJLoader()            
        loader2.load( upload_obj, (obj) => {   
    let hasMesh = false;
    if(obj.children[0].type=='Mesh'){
      obj.children[0].geometry.computeFaceNormals();
      obj.children[0].geometry.computeVertexNormals();
scene.add(obj.children[0]);
obj.userData.objloaded=true;
      objects.push( scene.children[scene.children.length-1] );
      scene.children[scene.children.length-1] .castShadow = true;  
      scene.children[scene.children.length-1] .receiveShadow = true;
     hasMesh = true;      
     scene.children[scene.children.length-1] .userData.editable=true;    
     scene.children[scene.children.length-1] .material.side=THREE.DoubleSide;
/*checknest();
checkthewildcards2();*/
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
/*checknest();
checkthewildcards4();*/
 }
//scene.add(mesh);

});
});
/*const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
// Change the IDs of each element
elementsWithAttribute.forEach(element => {
  const elid=parseInt(element.id, 10); 
  const wildcardValue = parseInt(element.getAttribute('wildcard'), 10)
  if (wildcardValue - elid !== 194) { 
    const newvalue = wildcardValue - elid;
    const wildvalue = 194 - newvalue;
    const newValue = wildcardValue + wildvalue;

    element.setAttribute('wildcard', newValue.toString());
}
          
        })*/
});
socket.on('startGame10', (arg) => {
  cloning(objects[arg]);
function cloning(obj){
  checkifthereismodel_tuc();
  splitwhenload();
scene.remove(transformControls);
  const objclone = obj.clone();
  if(obj.parent.userData.objloaded===true){
    objclone.userData.objloaded=true;
  }
  objclone.position.copy(obj.position)
  objclone.scale.copy( obj.scale );
  objclone.rotation.copy(obj.rotation );
  objclone.castShadow=true;
  objclone.receiveShadow=true;
  objects.push(objclone);

  
  const uuidToclone = obj.uuid;
  const arraytocloneto=obj.userData.catchmergebtn;
  const indexToClone= individualMeshes.findIndex(item => item.uuid === uuidToclone);
  if(arraytocloneto!==undefined){
  var indexToClone2= array_of_arrays[arraytocloneto].findIndex(item => item.uuid === uuidToclone);
  }
  if (indexToClone !== -1) {
    individualMeshes.push(objclone);
  }
  if (indexToClone2!==undefined&&indexToClone2 !== -1) {
    array_of_arrays[arraytocloneto].push(objclone);
  }
  
  scene.add(objclone);
  objclone.userData.editable =true;
}
});
socket.on('startGame8', (arg) => {

  removeobj(objects[arg]);

function removeobj(obj)
{

  checkifthereismodel_tuc();
  splitwhenload();
  
  const uuidToRemove = obj.uuid;
  const arraytoremovefrom=obj.userData.catchmergebtn;
  const layeridtochange=obj.userData.layerid;

// Find the index of the object with the specified uuid
const indexToRemove = objects.findIndex(item => item.uuid === uuidToRemove);
const indexToRemove2 = individualMeshes.findIndex(item => item.uuid === uuidToRemove);
if(arraytoremovefrom!==undefined&&array_of_arrays[arraytoremovefrom].length>0){
var indexToRemove3 = array_of_arrays[arraytoremovefrom].findIndex(item => item.uuid === uuidToRemove);
}
// If the object is found, remove it
if (indexToRemove !== -1) {
  objects.splice(indexToRemove, 1);
}
// If the object is found, remove it
if (indexToRemove2 !== -1) {
  objects.splice(indexToRemove2, 1);
}
// If the object is found, remove it
/*if (indexToRemove3 !== -1) {
  objects.splice(indexToRemove3, 1);
}*/
// If the object is found, remove it
if (indexToRemove2 !== -1) {
  individualMeshes.splice(indexToRemove2, 1);
}
// If the object is found, remove it
if (indexToRemove3!==undefined&&indexToRemove3 !== -1) {
  array_of_arrays[arraytoremovefrom].splice(indexToRemove3, 1);
}
 // objects.remove(obj);
// Detach TransformControls from the object
transformControls.detach();
scene.remove(transformControls);
// Remove the object from the scene
if(obj.parent.children.length===1&&obj.parent.type!=="Group"){
  for(var omg=5;omg<scene.children.length;omg++){
    if(scene.children[omg].type==='Scene'){
      const childtoremove=obj.parent;
      if(obj.parent.type==="Scene"){
    scene.remove(childtoremove);}else{
      scene.children[omg].remove(childtoremove);
    }
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  /*const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();*/
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var ct=0;
for (var b = 5; b < scene.children.length; b++) { if(checkifthereismodel===false&&chck===false){
  if(scene.children[b].type!=="Scene"){
  scene.children[b].userData.layerid = b + 194+ct; // 199 + (n - 5)
}else{
  for(var css=0; css<scene.children[b].children.length;css++){
    if(scene.children[b].children[css].children.length>0){
      scene.children[b].children[css].children[0].userData.layerid = css+ b + 194+ct;
    }else{
    scene.children[b].children[css].userData.layerid = css+ b + 194+ct; // 199 + (n - 5)  
    }  
  }ct+=scene.children[b].children.length-1;
}
}else{
  if(integerValue!==undefined && scene.children[b].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[b].userData.layerid>integerValue2[arraytoremovefrom]){
 
    if(scene.children[b].type!=="Scene"){
      scene.children[b].userData.layerid=scene.children[b].userData.layerid-1;
    }else{
      for(var css=0; css<scene.children[b].children.length;css++){
        if(scene.children[b].children[css].children.length>0){
          scene.children[b].children[css].children[0].userData.layerid = scene.children[b].children[css].children[0].userData.layerid-1;
        }else{
        scene.children[b].children[css].userData.layerid = scene.children[b].children[css].userData.layerid-1; // 199 + (n - 5)  
        }  
      }//ct+=scene.children[b].children.length-1;
    }
  }else{
    if(scene.children[b].type!=="Scene"&&scene.children[b].userData.layerid>layeridtochange){
      scene.children[b].userData.layerid = scene.children[b].userData.layerid-1; // 199 + (n - 5)
    }    else  if(scene.children[b].type!=="Mesh"){
      for(var cs=0; cs<scene.children[b].children.length;cs++){
        if(scene.children[n].children[cs].children>0){
          for(var i=0; i<scene.children[b].children[cs].children.length;i++){
            if(scene.children[b].children[cs].children.length>0&&scene.children[b].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[b].children[cs].children[i].userData.layerid =  scene.children[b].children[cs].children[i].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[b].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[b].children[cs].children[i].userData.layerid = scene.children[b].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
              }     
          }
        }else{
        if(scene.children[b].children.length>0&&scene.children[b].children[cs].userData.layerid>layeridtochange){
          scene.children[b].children[cs].userData.layerid =  scene.children[b].children[cs].userData.layerid-1;
        }else if(scene.children[b].children.length<=0&&scene.children[b].children[cs].userData.layerid>layeridtochange){
        scene.children[b].children[cs].userData.layerid = scene.children[b].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }
      }//cn+=scene.children[n].children.length-1;
    }
  }
}
}
}else if(obj.type==="Mesh"&&obj.parent.type==="Scene"&&obj.parent.children.length>4&&obj.parent.uuid===scene.uuid){
scene.remove(obj);
const dynamicAttribute = 'wildcard';
const attributeValue = obj.userData.layerid; 
const changelayers=obj.userData.layerid-194;
//querySelector to find the element with the specified dynamic attribute and value
/*const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
elementToRemove.remove();*/
// all elements with the attribute "name"
const elementsWithAttribute = document.querySelectorAll('[wildcard]');

// Change the IDs of each element
elementsWithAttribute.forEach(element => {if(parseInt(element.id)>changelayers+lnt){
  // Set the new ID, you can customize this logic based on your requirements
  element.id = element.id-1;
  if(element.attributes[2].nodeValue==="199"){
    counteraki=199;
  }
  else if(element.attributes[2].nodeValue>199){
    if(element.attributes[2].nodeValue-counteraki>1){
  const nodevalue_wild= element.attributes[2].nodeValue;
  const textContent_wild= element.attributes[2].textContent;
  const value_wild= element.attributes[2].value;
  element.attributes[2].nodeValue=nodevalue_wild-1
  element.attributes[2].textContent=textContent_wild-1
  element.attributes[2].value=value_wild-1
  }else{
    counteraki=0;
  }
}
counter_wilds++;
}else{
  counter_wilds++;

}
});counteraki=0;var cn=0;
for (var n = 5; n < scene.children.length; n++) { if(checkifthereismodel===false&&chck===false){
  if(scene.children[n].type!=="Scene"){
  scene.children[n].userData.layerid = n + 194+cn; // 199 + (n - 5)
}else{
  for(var cs=0; cs<scene.children[n].children.length;cs++){
    if(scene.children[n].children[cs].children.length>0){
      scene.children[n].children[cs].children[0].userData.layerid = cs+ n + 194+cn;
    }else{
    scene.children[n].children[cs].userData.layerid = cs+ n + 194+cn; // 199 + (n - 5)  
    }  
  }cn+=scene.children[n].children.length-1;
}
}else{
  /*if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom] || scene.children[n].userData.layerid===undefined){
    if(scene.children[n].type!=="Scene"){
      scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
    }else{
      for(var cs=0; cs<scene.children[n].children.length;cs++){
        if(scene.children[n].children[cs].children.length>0){
          scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
        }else{
        scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }//cn+=scene.children[n].children.length-1;
    }
  }else{*/
    if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange/*&&scene.children[n].geometry.groups.length<=0*/){
      scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
    }
    else  if(scene.children[n].type!=="Mesh"){
      for(var cs=0; cs<scene.children[n].children.length;cs++){
        if(scene.children[n].children[cs].children>0){
          for(var i=0; i<scene.children[n].children[cs].children.length;i++){
            if(scene.children[n].children[cs].children.length>0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[i].userData.layerid =  scene.children[n].children[cs].children[i].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[i].userData.layerid = scene.children[n].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
              }     
          }
        }else{
        if(scene.children[n].children.length>0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid =  scene.children[n].children[cs].userData.layerid-1;
        }else if(scene.children[n].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
        scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }
      }//cn+=scene.children[n].children.length-1;
    }
 // }
}
}
}/*else if(obj.type==="Mesh"&&obj.parent.type==="Object3D"){
  for(var t=0;t<scene.children.length;t++){
    if(scene.children[t].type==='Scene'){
      const childtoremove=obj.parent;
    scene.children[t].remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid >= changelayers){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  for(var bi=5;bi<scene.children.length;bi++){
    if(scene.children[bi].type==='Scene'){
      for (var oo = 0; oo < scene.children[bi].length; oo++)
    scene.children[bi].children[oo].userData.layerid = 5+ oo + 194;

  }
}*/
  else if(obj.type==="Mesh"&&obj.parent.type==="Scene"&&obj.parent.uuid!==scene.uuid){
  for(var ti=5;ti<scene.children.length;ti++){
    if(scene.children[ti].type==='Scene'){
      const childtoremove=obj;
    scene.children[ti].remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  /*const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();*/
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cd=0;
  for (var n = 5; n < scene.children.length; n++) {if(checkifthereismodel===false&&chck===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cd; // 199 + (n - 5)
  }else{
    for(var csd=0; csd<scene.children[n].children.length;csd++){
      if(scene.children[n].children[csd].children.length>0){
        scene.children[n].children[csd].children[0].userData.layerid = csd+ n + 194+cd;
      }else{
      scene.children[n].children[csd].userData.layerid = csd+ n + 194+cd; // 199 + (n - 5)  
      }  
    }cd+=scene.children[n].children.length-1;
  }
  }else{
    if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom]){
      if(scene.children[n].type!=="Scene"){
        scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0){
            scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
          }else{
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }else{
      if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
        scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
      }    else  if(scene.children[n].type!=="Mesh"){
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children>0){
            for(var i=0; i<scene.children[n].children[cs].children.length;i++){
              if(scene.children[n].children[cs].children.length>0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
                scene.children[n].children[cs].children[i].userData.layerid =  scene.children[n].children[cs].children[i].userData.layerid-1;
              }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
                scene.children[n].children[cs].children[i].userData.layerid = scene.children[n].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
                }     
            }
          }else{
          if(scene.children[n].children.length>0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
            scene.children[n].children[cs].userData.layerid =  scene.children[n].children[cs].userData.layerid-1;
          }else if(scene.children[n].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }
        }//cn+=scene.children[n].children.length-1;
      }
    }
}
}
}else if(obj.type==="Mesh"&&obj.parent.type==="Group"){

  for(var ef=5;ef<scene.children.length;ef++){  
    if(scene.children[ef].type==='Group'){
      if(scene.children[ef].children.length>1){
      const childtoremove=obj;
    scene.children[ef].remove(childtoremove);
  }else{
    const childtoremove=obj.parent;
    scene.remove(childtoremove);
  }
}}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
 /* const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();*/
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid >= changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cnn=0;
  for (var n = 5; n < scene.children.length; n++) {  if(checkifthereismodel===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cnn; // 199 + (n - 5)
  }else{
    for(var csf=0; csf<scene.children[n].children.length;csf++){
      if(scene.children[n].children[csf].children.length>0){
        scene.children[n].children[csf].children[0].userData.layerid = csf+ n + 194+cnn;
      }else{
      scene.children[n].children[csf].userData.layerid = csf+ n + 194+cnn; // 199 + (n - 5)  
      }  
    }cnn+=scene.children[n].children.length-1;
  }
  }else{
    if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom]){
      if(scene.children[n].type!=="Scene"){
        scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0){
            scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
          }else{
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }else{
      if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
        scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0&&scene.children[n].userData.layerid>layeridtochange){
            scene.children[n].children[cs].children[0].userData.layerid =  scene.children[n].children[cs].children[0].userData.layerid-1;
          }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }
  }
}
}else if(obj.type==="Group"){

  for(var fi=5;fi<scene.children.length;fi++){
    if(scene.children[fi].type==='Group'){
 
    const childtoremove=obj;
    scene.remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.children[0].userData.layerid; 
  const changelayers=obj.children[0].userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
 /* const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();*/
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cnr=0;
  for (var n = 5; n < scene.children.length; n++) {    if(checkifthereismodel===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cnr; // 199 + (n - 5)
  }else{
    for(var csr=0; csr<scene.children[n].children.length;csr++){
      if(scene.children[n].children[csr].children.length>0){
        scene.children[n].children[csr].children[0].userData.layerid = csr+ n + 194+cnr;
      }else{
      scene.children[n].children[csr].userData.layerid = csr+ n + 194+cnr; // 199 + (n - 5)  
      }  
    }cnr+=scene.children[n].children.length-1;
  }
  }else{
      if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom] ){
        if(scene.children[n].type!=="Scene"){
          scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
        }else{
          for(var cs=0; cs<scene.children[n].children.length;cs++){
            if(scene.children[n].children[cs].children.length>0){
              scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
            }else{
            scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
            }  
          }//cn+=scene.children[n].children.length-1;
        }
      }else{
        if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
          scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
        }else{
          for(var cs=0; cs<scene.children[n].children.length;cs++){
            if(scene.children[n].children[cs].children.length>0&&scene.children[n].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[0].userData.layerid =  scene.children[n].children[cs].children[0].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
            scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
            }  
          }//cn+=scene.children[n].children.length-1;
        }
      }
    
  }
}
}
for(var i=0;i<integerValue2.length;i++){
  if(obj.userData.layerid<integerValue2[i]){
    integerValue2[i]=integerValue2[i]-1;
    mrgbtnswildcararray[i]=mrgbtnswildcararray[i]-1;
    mrgbtnsids[i]=mrgbtnsids[i]-1;
  }
}
localStorage.setItem("id", JSON.stringify(mrgbtnswildcararray));
localStorage.setItem("mrgbtnswildcararray", JSON.stringify(mrgbtnswildcararray));
}

});

function saveScene_teams(){const exporter = new _GLTFExporter();

  exporter.parse(scene, (gltf) => {
    const gltfBlob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
    socket.emit('savesceneonreload',gltfBlob, (err) => {
        if (err) {
          alert(err);
        }
      });
    // Now you can use 'gltfUrl' to download or handle the GLTF data
  });

      
 // const sceneData = JSON.stringify(scene);
  //localStorage.setItem('savedScene', sceneData);
 // console.log('Scene saved to localStorage');
};
//setInterval(saveScene_teams, 20000);
////////////////////////////////////////////////POST_TEAMS////////////////////////////////////////////////////////
const btn_save = document.getElementById('save_button_teams');
btn_save.addEventListener('click', function(e) { /*if (document.getElementById('project_name-error').innerHTML!=="&#10006;"&&document.getElementById('project_name-error').innerHTML!==""){*/
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
     /*if(megaBytes>16){
      fetch('/save_file_grid_fs_teams1', {
        method: 'POST',
        body: JSON.stringify({ team_id }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
     // Create form element
     const forma = document.createElement('form');

     // Prevent default form submission behavior
     forma.addEventListener('submit', function(event) {
         event.preventDefault();
     });
     
     // Set form attributes
     forma.setAttribute('action', '/save_file_grid_fs_teams');
     forma.setAttribute('method', 'POST');
     forma.setAttribute('enctype', 'multipart/form-data');
     
     // Create file input element
     const big_data_file = document.createElement('input');
     big_data_file.setAttribute('type', 'file');
     big_data_file.setAttribute('name', 'big_data_file');
     big_data_file.setAttribute('id', 'scene_input');
     
     // Append file input to form
     forma.appendChild(big_data_file);
     
     let fileName = project_name.value;
     let file = new File([JSON.stringify(scene)], fileName, { type: 'text/plain', lastModified: new Date().getTime() }, 'utf-8');
     
     // Convert file to Blob object
     const blob = new Blob([file], { type: 'text/plain' });
     
     let formData = new FormData(forma);
     formData.append('big_data_file', blob,fileName);
console.log(team_id);

    // First request succeeded, initiate the second request
    return fetch('/save_file_grid_fs_teams', {
      method: 'POST',
      body: formData
    });
  } else {
    throw new Error('Error occurred in the first request');
  }
})
.catch(error => {
  console.error('An error occurred:', error);
});
     /*.then(response => {
         if (!response.ok) {
             throw new Error('Failed to save file to server');
         }
         console.log('File saved to server');
         // Handle success (optional)
         socket.emit('save_big_data_and get_it_back',fileName, (err) => {
          if (err) {
            alert(err);
          }
        });
     }).then(function() {
      // Define the event listener
      function handleSavebigScene(arg) {
        document.getElementById("more_teams").innerHTML += '<button>' + arg + '</button>';
        // Detach the event listener after the first execution
        socket.off('save_big_data_and get_it_back', handleSavebigScene);addids2();
      }
    
      // Attach the event listener
      socket.on('save_big_data_and get_it_back', handleSavebigScene); 
      if(document.getElementById("more_teams").innerHTML==="No projects yet"){
        document.getElementById("more_teams").innerHTML=""
      }
    })
     .catch(error => {
         console.error('Error saving file to server:', error);
         // Handle error (optional)
     });*/
     
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
     //}else{
     fetch('/saved_projects_teams', {method: 'POST',body: JSON.stringify({scene,project_name:project_name.value,team_id}),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'}})

    /*.then(function(response) {
      if(response.ok) {        console.log('saved');
      socket.emit('savesceneandgetitback',project_name.value, (err) => {
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
          socket.off('savesceneandgetitback', handleSaveScene);addids();
          projects_counter_teams++;
        }
      
        // Attach the event listener
        socket.on('savesceneandgetitback', handleSaveScene); 
        if(document.getElementById("more").innerHTML==="No projects yet"){
          document.getElementById("more").innerHTML=""
        }
      })
    .catch(function(error) {
      console.log(error);
    });*/
//////////////non blocking example//////////
console.log('non blocking example');
 // } 

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////GET_TEAMS////////////////////////////////////////////////////////////////
let projects_big_data_teams;
let projects_small_teams;
export var all_saved_projects_teams;
var projects_counter_teams;
var big_projects_counter_teams;

export function fetchDataAndInitialize_teams() {

 {return fetch('/team_projects', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {        console.log('loaded');
      return response.json();}
      throw new Error('Request failed.');
    })
    .then(function(data) {
      projects_small_teams= data.length;
      if(data[0].projects.length==0){

      document.getElementById("more_teams").innerHTML = "No projects yet";
      }else{
      for (var j = 0; j < data[0].projects.length; j++) {
       console.log(data[0].projects[j])
        document.getElementById("more_teams").innerHTML += '<button>' + data[0].projects[j].project_name.valueOf() + '</button>';
      //let project_counter=j;
    }
addids2();
      } projects_counter_teams=data[0].projects.length;
    })
  
    .catch(function(error) {
   console.log(error);
 });
}}

//////////////non blocking example//////////
console.log('non blocking example');
export function fetchbigDataAndInitialize_teams() {
  console.log(team_id);
{return fetch(`/get_files_grid_fs_teams?metadata.owner=${encodeURIComponent(team_id)}`, {method: 'GET'})
.then(function(response) {  console.log('loaded');
   if(response.ok) return response.json();
   throw new Error('Request failed.');
 })
 .then(function(data) {
     projects_big_data_teams=data.length;
if(data.length>0&&document.getElementById("more_teams").innerHTML==="No projects yet"){
  document.getElementById("more_teams").innerHTML=""
}
  for (var b = 0; b < data.length; b++) {
     document.getElementById("more_teams").innerHTML += '<button>' + data[b].filename.valueOf() + '</button>';
   }
   big_projects_counter_teams = data.length;
all_saved_projects_teams = big_projects_counter_teams+ projects_counter_teams;
addids2();
})

}

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////reachtheproject/////////////////////////////////////////////////////////

var scntoadd = new THREE.Scene;
const btn_load = document.getElementById('more_teams');
export var scened;
if (btn_load !== null && btn_save !== 'undefined') {

btn_load.addEventListener('click', function(event) {scene.remove(transformControls);
const  thisisthefilerequested= event.target.innerHTML;
  console.log('button was clicked');
  checkifthereismodel_tuc();splitwhenload();
if(event.target.id>projects_counter_teams){
  document.getElementById("form").value=thisisthefilerequested;
  {fetch('/get_files_grid_fs_teams', {method: 'POST', body: JSON.stringify({thisisthefilerequested,team_id}),/*})
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
  if(checkifthereismodel===false&&chck2===false){
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
}        functoupdatescnchldrnlentgh_teams();
checkthewildcards3();


  // return catchid;
  })
   }
}else{

 {fetch(`/team_reach_projects?_id=${encodeURIComponent(team_id)}`, {method: 'GET'})
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
var chck2;
scnchldrn();  scnobjs2(); checkifthereismodel_tuc();
elementWithInnerHTMLExists(innerHtmlArray);
if (elementWithInnerHTMLExists(innerHtmlArray)) {
  chck2=true;
  } else {
    chck2=false;
  }
if(checkifthereismodel===false&&chck2===false){
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

}        functoupdatescnchldrnlentgh_teams();
checkthewildcards3();


   return catchid;})
    .catch(function(error) {
      console.log(error);
    });
}  
} 



  });
}
socket.on('broadcastedData', function (storedData) {  document.getElementById('popupContainer').style.display = 'block';
    console.log('Received stored data:', storedData);

    // Create a Blob from the concatenated data
    const blob = new Blob([storedData] , {type: 'text/plain'});
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
  gltf.scene.traverse( function( object ) {
    if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.push( object );
    if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.castShadow = true; 
    if ( object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") objects.receiveShadow = true;
    if (object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") object.userData.editable=true;    
    if (object.isMesh && object.userData.name!=="Sky" && object.name!=="Sky") object.userData.tomerge=cnt-1;
   } );
  scene.add(gltf.scene);
  gltf.scene.userData.bye=1;
})
document.getElementById('popupContainer').style.display = 'none';
});

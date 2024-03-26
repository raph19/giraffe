let socket = io.connect('https://giraffe-design-tt8d.onrender.com');
var password;
var repassword=null;
function getCurrentURL() {
    return window.location.href;
  }
  
  var signup = getCurrentURL();

socket.on('connect', function() {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit('signup', signup);
}); 

document.getElementById('username').addEventListener('input', function() {
    const username = this.value.trim();
    if (username !== '') {
        document.getElementById('username-error').style.visibility='visible';
        socket.emit('checkUsername', username);
    }else{
        document.getElementById('username-error').style.visibility='hidden';
    }
});

socket.on('UsernameStatus', function(status) {
    const usernameError = document.getElementById('username-error');
    if (status === 'taken') {
        usernameError.innerHTML = "&#10006;"
        usernameError.style.color='red';
    } else {
        usernameError.innerHTML = '&#10004;'
        usernameError.style.color='green';

    }
});

function isValidEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

document.getElementById('mail').addEventListener('input', function() {
    const mail = this.value.trim();
    if (mail !== '') {
        if (isValidEmail(mail)) {        
            socket.emit('checkMail', mail);
        }else{
            document.getElementById('email-error').style.visibility='visible';
            document.getElementById('email-error').style.color='red';
            document.getElementById('email-error').innerHTML="&#10006;";
        }
    }else{
        document.getElementById('email-error').style.visibility='hidden';
    }
});

socket.on('EmailStatus', function(status) {
    const mailError = document.getElementById('email-error');
    if (status === 'taken') {
        document.getElementById('email-error').style.visibility='visible'
        mailError.innerHTML = "&#10006;"
        mailError.style.color='red';
    } else {
        document.getElementById('email-error').style.visibility='visible'
        mailError.innerHTML = '&#10004;'
        mailError.style.color='green';
   }
});

    document.getElementById('pass').addEventListener('input', function() {
        const pass = this.value.trim();
        if (pass !== '') {
            document.getElementById('pass-error').style.visibility='hidden';
            socket.emit('checkPass', pass);
            
        }else{
            document.getElementById('pass-error').style.visibility='hidden';
        }
    });
    
    socket.on('PassStatus', function(arg) {
         password=arg;if(password===repassword){
                document.getElementById('repass-error').style.visibility='visible'
                document.getElementById('repass-error').innerHTML = "&#10004;"
                document.getElementById('repass-error').style.color='green';
            }else if(password!==repassword&&repassword!==''&& repassword!==null){
                document.getElementById('repass-error').style.visibility='visible'
                document.getElementById('repass-error').innerHTML = "&#10006;"
                document.getElementById('repass-error').style.color='red';
            }
    });

    document.getElementById('repass').addEventListener('input', function() {
        const repass = this.value.trim();
        if (repass !== '') {
            document.getElementById('repass-error').style.visibility='hidden';
            socket.emit('checkrePass', repass);
        }else{
            document.getElementById('repass-error').style.visibility='hidden';
        }
    });

    socket.on('PassStatus2', function(arg) {
        repassword=arg;
    if (password === arg ) {
        document.getElementById('repass-error').style.visibility='visible'
        document.getElementById('repass-error').innerHTML = "&#10004;"
        document.getElementById('repass-error').style.color='green';
    } else if(password !== arg ){
        document.getElementById('repass-error').style.visibility='visible'
        document.getElementById('repass-error').innerHTML = "&#10006;"
        document.getElementById('repass-error').style.color='red';
   }    });



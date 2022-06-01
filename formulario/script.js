
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
let   usernameValidate = false
let   emailValidate = false
let   passwordValidate = false
let   passwordConfirmValidate = false


const data = [ ]

const checkName = (userName) => {

if (data.find((user) => user.userName === userName)){
    return true
}else{
    return false
}
}

const checkMail = (email) => {
    if (data.find((userEmail) => userEmail.email === email)){
    return true
    }else{
    return false

}
}

const errorFor = (input, message) => {
    const inputLogin = document.getElementById(input)
    const span = inputLogin.querySelector('span');

    span.innerText = message;

    inputLogin.className = "input-login error";

}

const successFor = (input) => {
    const inputLogin = document.getElementById(input)

    inputLogin.className = "input-login success";

}

const resetInput = () =>{
    document.getElementById('username-container').classList.remove('success')
    document.getElementById('email-container').classList.remove('success')
    document.getElementById('password-container').classList.remove('success')
    document.getElementById('password-confirm-container').classList.remove('success')
}

const addToUsers = (obj) => {
    const name = checkName(obj.userName)
    const email = checkMail(obj.email)

    if( name === false  && email === false){
        console.log("add")
         data.push(obj)
         form.reset()
         resetInput()
         usernameValidate = false
         emailValidate = false
         checkButton()
    } else if(name === true && email == true){
            errorFor('username-container', 'Usuário já existe')
            errorFor('email-container', 'Email já existe')
            usernameValidate = false
            emailValidate = false
            checkButton();
    } else if (name === true){
            errorFor('username-container', 'Usuário já existe')
            successFor('email-container')
            usernameValidate = false
            checkButton();
    }else if(email === true){
           errorFor('email-container', 'Email já existe')
           successFor('username-container')
           emailValidate = false
           checkButton();
    }

}

const checkUsernameLength = () => {
    if( username.value.length < 3){
        console.log("Nome de usuario muito curto")
        errorFor('username-container', 'Nome de usuário muito curto')
        usernameValidate = false
        checkButton();

    }else if(username.value.length > 25){
        errorFor('username-container', 'Nome de usuario muito longo')
        usernameValidate = false
        checkButton();
    }else{
        successFor('username-container')
        usernameValidate = true
        checkButton();
    }
}

const checkPasswordLength = () => {
    if( password.value.length < 8){
        errorFor('password-container', 'Senha muito curta')
        passwordValidate = false
        checkButton();
    }else{
        successFor('password-container')
        successFor('password-confirm-container')
        passwordValidate = true
        checkButton();
    }
}

const checkPassword = () =>{
     if(password.value !== passwordConfirm.value){
    errorFor('password-confirm-container', 'Senhas incompatíveis')
    errorFor('password-container', 'Senhas incompatíveis')
    passwordConfirmValidate = false
    checkButton();
}else{
    successFor('password-container')
    successFor('password-confirm-container')
    passwordConfirmValidate = true
    checkButton();
    }
}

//faz a validação do email com regex
const checkEmailValidation = () =>{
    if (/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email.value)){ 
        successFor('email-container')
        emailValidate = true
    }else{
        errorFor('email-container', 'Email inválido')
        emailValidate = false
    }
}

const checkButton = () => {
    if ( usernameValidate === true && emailValidate === true && passwordValidate === true && passwordConfirmValidate === true){
        document.getElementById('btn').removeAttribute('disabled')
    }else{
        document.getElementById('btn').setAttribute('disabled', 'true')
    }
}

username.addEventListener("focusout", (e) => {
    e.preventDefault();

    checkUsernameLength();
})

password.addEventListener("focusout", (e) => {
    e.preventDefault();

    checkPasswordLength();
})

passwordConfirm.addEventListener("focusout", (e) => {
    e.preventDefault();

    checkPassword();
})

email.addEventListener("focusout", (e) => {
    e.preventDefault();

    checkEmailValidation();
})


const delay = (func, wait) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, wait);
    };
  }

const trigger = (delay((obj) => addToUsers(obj), 1000));

form.addEventListener("submit", (e) => {
    e.preventDefault();

   
    trigger({"userName": username.value, "email":email.value})
    
    console.log(data)
});


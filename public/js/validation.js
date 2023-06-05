document.getElementById('instructor-form').addEventListener('submit', confirmation)

function confirmation(e) {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    if (pass != confirm) {
        document.getElementById('validate').innerHTML = "password doesn't match";
        document.getElementById('validate').style.color = "red";
        document.getElementById('confirm_password').style.border = "1px solid red";
        e.preventDefault()
    } else {
        console.log('matched')
    }
}

function matched() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    if (pass === confirm) {
        document.getElementById('validate').innerHTML = "";
        document.getElementById('confirm_password').style.border = "";
        document.g
    } else {
        confirmation(e)
    }
}

var loadFile = function (event) {
    document.getElementById('output').src = URL.createObjectURL(event.target.files[0]);    
};
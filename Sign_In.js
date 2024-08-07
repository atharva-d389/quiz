function about() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email_addr').value;
    var contact = document.getElementById('contact').value;
    var enteringAs = document.getElementById('entering_as').value;

 
    if (!name) {
        alert('Please enter your name.');
        return;
    }
    if (!password) {
        alert('Please enter your password.');
        return;
    }
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    if (!contact) {
        alert('Please enter your contact number.');
        return;
    }
    if (!enteringAs) {
        alert('Please select whether you are entering as a student or professor.');
        return;
    }

    var firstLetter = name.charAt(0).toUpperCase();

   
    localStorage.setItem('userFirstLetter', firstLetter);

    window.location.href = "about.html";
}


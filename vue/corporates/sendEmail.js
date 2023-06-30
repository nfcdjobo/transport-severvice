document.getElementById('submit').addEventListener('click', sendEmail)
var Email = { 
    send: function (a) {
        return new Promise(function (n, e) { 
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
            var t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) 
        }) },
        ajaxPost: function (e, n, t) { 
            var a = Email.createCORSRequest("POST", e);
            a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            a.onload = function () {
                var e = a.responseText;
                null != t && t(e) 
            },
            a.send(n) 
        },
        ajax: function (e, n) {
            var t = Email.createCORSRequest("GET", e);
            t.onload = function () {
                var e = t.responseText;
                null != n && n(e) 
            },
            t.send()
        },
        createCORSRequest: function (e, n) {
            var t = new XMLHttpRequest;
            return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
        } 
};


function sendEmail(event) {
    const nom=document.getElementById('nom');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    event.preventDefault()
    Email.send({
        Host : "smtp.mailtrap.io",
        Username : "KANU",
        Password : "nfcDJOBO",
        To : 'mingcoring@gmail.com',
        From : email.value,
        Subject : "Vérification de compte",
        Body : `<html><h2>Hello Mr ${nom.value}</h2><strong>Pour la validation de votre compte chez Pro-Gest's All veuillez confirmer votre nouveau compte</strong><br><button><a href="">Je confirme</a></button></html>`
    })
    .then(message =>{
        alert('yes')
        console.log('succès',message);
        document.querySelectorAll(`#formM input`).forEach(e=>e.value="");
    })
    .catch(error=>{
        alert('no');
        console.log('Fail', error)
    })
}


// Current page
var curr = window.location.href.toString();
// Page setup
var isIndex = curr.includes('index');
var isLogin = curr.includes('login-in');

// website elements init
/*userPicElement = document.getElementById('')
userNameElement = document.getElementById('')
signOutButtonElement = document.getElementById('')*/
if (isIndex) {
    signInButtonElement = document.getElementById('loginpgBtn');
    signInButtonElement.setAttribute('hidden', 'true');
}

// Validate E-Mail
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    if (validateEmail(email)) {
        signInEmail(email, pass)
    } else {
        alert("Invalid E-Mail")
    }
    return false;
}


// Email verifier onclick event
if (isLogin) {
document.getElementById('logbtn').onclick = function () {validate()};
}

// Last working condition -> const auth = firebase.auth();
const auth = firebase.auth();

// Google Sign In
function signInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInViaPopup(provider);
    auth.signInWithRedirect(provider);
}

function signOut() {
    auth.signOut().then(() => {
        if (!isLogin) {window.location = 'login-in.html'}
        window.location = 'login-in.html'
    }).catch((error) => {
        alert("Please try again later.\nEncountered error: " + error.message);
    });
}

function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}

function isUserSignedIn() {
    return !!auth.currentUser;
}

function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        /*var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        userNameElement.textContent = userName;

        // Show user's profile and sign-out button.
        userNameElement.removeAttribute('hidden');
        userPicElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');*/
        if (!isIndex) {window.location = 'index.html';}
    } else {
        // User is signed out!
        /*userNameElement.setAttribute('hidden', 'true');
        userPicElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');

        // Show sign-in button.
        signInButtonElement.removeAttribute('hidden');*/
        if (!isLogin) {window.location = 'login-in.html';}
    }
}

// Email sign up
function signUp() {
    // TODO: Remove sample once sign up page is created.
    const email = "abc@example.com"
    const password = "passwordhere"
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            window.location = 'index.html';
        })
        .catch((error) => {
            alert("Error: " + error.message);
        })
}

// Email sign in
function signInEmail(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            }
        )
        .catch((error) => {
            alert("Failed to sign in.\nError: " + error.message);
        })
}

// Firebase Auth Init
initFirebaseAuth();

// TODO: Cards init


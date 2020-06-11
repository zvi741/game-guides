// Signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up user
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});


// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', event => {
  event.preventDefault();
  auth.signOut()
    .then(() => {
      console.log('User signed out');
    });
});

// Login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // Sign up user
  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      console.log(cred.user);
      // Close the login modal and reset the form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
});


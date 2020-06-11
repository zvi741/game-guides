// Listen to auth status change
auth.onAuthStateChanged(user => {
  if (user)
  {
    console.log('User logged in', user);
  } else
  {

    console.log('User logged out');
  }
});



// Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get user info from form
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
  auth.signOut();
});

// Login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get user info from form
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // Sign In user
  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {

      // Close the login modal and reset the form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
});


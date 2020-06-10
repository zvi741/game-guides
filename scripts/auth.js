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
      console.log(cred);
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});
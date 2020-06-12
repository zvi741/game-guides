// Add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', event => {
  event.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail })
    .then(res => {
      console.log(res);
    });
});

// Listen to auth status change
auth.onAuthStateChanged(user => {
  if (user !== null && user)
  {
    user.getIdTokenResult()
      .then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
      });
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user);
    }, err => console.log(err.message));
  } else
  {
    setupGuides([]);
    setupUI();
  }
});

// Create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', event => {
  event.preventDefault();

  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  })
    .then(() => {
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
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
      console.log(cred);
      return db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value
      });
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => console.log(err.message));
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


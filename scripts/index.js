const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


// Setup UI
const setupUI = (user) => {
  if (user)
  {
    console.log(loggedInLinks);
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }
  else
  {
    loggedInLinks.forEach(item => item.style.display = 'noen');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// Setup guides
const setupGuides = (data) => {

  if (data.length)
  {

    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      console.log(guide);
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white"><span>${guide.content}</span></div>
      </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  }
  else
  {
    guideList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
const formTemplate = `
  <form class="form">
    <h2 class="form-title">{FORM_TITLE}</h2>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button type="submit">{FORM_BUTTON_TEXT}</button>
  </form>
  <div class="message">
    <a href="#" id="toggle-link">{TOGGLE_LINK_TEXT}</a>
  </div>
`;

const formContainer = document.getElementById('form-container');
const toggleLink = document.getElementById('toggle-link');

let isLogin = true;

const renderForm = () => {
  const formTitle = isLogin ? 'Login' : 'Sign Up';
  const formButtonText = isLogin ? 'Login' : 'Sign Up';
  const toggleLinkText = isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login';

  formContainer.innerHTML = formTemplate
    .replace('{FORM_TITLE}', formTitle)
    .replace('{FORM_BUTTON_TEXT}', formButtonText)
    .replace('{TOGGLE_LINK_TEXT}', toggleLinkText);
};

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  renderForm();
});

renderForm();

const handleFormSubmit = (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (isLogin) {
    netlifyIdentity.login(email, password)
      .then(() => {
        alert('Logged in successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Login failed');
      });
  } else {
    netlifyIdentity.signup(email, password)
      .then(() => {
        alert('Signed up successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Sign up failed');
      });
  }
};

formContainer.addEventListener('submit', handleFormSubmit);

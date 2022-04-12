
// These are required for any authentication routes
// They're used in any JS that is used on an authenticated page
// Could be pulled out (exported) and imported when needed
// see. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
let auth0 = null;
let isAuthenticated = false;
const configureClient = async () => {
  // createAuth0Client comes from the auth0-spa-js.production.js that always needs to be in <script> before these ones
	auth0 = await createAuth0Client({
		"domain": "***REMOVED***",
		"client_id": "***REMOVED***",
    "cacheLocation": "localstorage",
    "audience": "shm"
	});
};

window.onload = async () => {
  await configureClient();
  updateUI();
	isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // Load any content that should only be retrieved on page refresh
    return;
  }

  // this happens when the Auth0 login page redirects back to the index page
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    updateUI();
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

	if (isAuthenticated) {
    // Reveals hidden content (hidden class is just "display:none" in CSS, removing class makes it visible)
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently();

    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0.getUser()
    );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
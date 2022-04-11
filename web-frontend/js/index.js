let auth0 = null;
let isAuthenticated = false;

const configureClient = async () => {
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

  // check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();
    
    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

	if (isAuthenticated) {
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
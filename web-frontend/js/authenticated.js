// required for authentication header use
axios.defaults.withCredentials = true;
// tries to send authentication header with every request

// see index.js for details on this block - could be 
let auth0 = null;
let isAuthenticated = false;
const configureClient = async () => {
    auth0 = await createAuth0Client({
        "domain": "exetercivil.eu.auth0.com",
        "client_id": "KpZx7y5CcCi0fXwsR3V3EIOOGKdyAvKP",
        "cacheLocation": "localstorage",
        "audience": "shm"
    });
};

window.onload = async () => {
    await configureClient();
    isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        // get access_token for use with API
        // await/async https://javascript.info/async-await
        // getTokenSilently() returns a Promise, await waits for this to resolve with data before moving on
        const token = await auth0.getTokenSilently()
        console.log(await auth0.getIdTokenClaims())
        // All API routes now require the Authorization header
        axios.get("http://localhost:3030/sensors/GPH000EDE", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(function(response){
            // console.log(response.data)
            document.getElementById("data").innerText = JSON.stringify(response.data)
        }).catch(function(error){
            console.log("Data collection failed")
        })
        return;
    }
    // Redirect to / if not logged in
    window.location.replace('/')
};


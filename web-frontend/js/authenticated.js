// required for authentication header use
axios.defaults.withCredentials = true;
// tries to send authentication header with every request


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
    isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        const token = await auth0.getTokenSilently()
        console.log(await auth0.getIdTokenClaims())
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


// required for authentication header use
axios.defaults.withCredentials = true;
// tries to send authentication header with every request


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
        const token = await auth0.getTokenSilently()
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


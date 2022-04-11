// required to sent Authorization header with requests
axios.defaults.withCredentials = true;
// When HTML is loaded
document.addEventListener('DOMContentLoaded', function() {
    let searchParams = new URLSearchParams(window.location.search)
    // When the Authorization Code (see index.html) is returned as query param,
    // make a request to the API with this to get Access Token and Refresh Token
    if (searchParams.has('code') && searchParams.has('state')){
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        axios.post('http://localhost:3030/auth/tokens', {code: code, state:state})
        .then(function (response) {
            // Store tokens in localStorage so they can be sent every authenticated request
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("refresh_token", response.data.refresh_token)
            window.location.replace("/database");
        })
    }else{
        // If theres no query params on the index page, check if logged in,
        // if logged in, redirect to an auth'd page like database
        axios.get('http://localhost:3030/auth/loggedin', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(function(result){
            window.location.replace("/database");
        })
    }
}, false);

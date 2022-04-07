axios.defaults.withCredentials = true;
document.addEventListener('DOMContentLoaded', function() {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('code') && searchParams.has('state')){
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        axios.post('http://localhost:3030/auth/tokens', {code: code, state:state})
        .then(function (response) {
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("refresh_token", response.data.refresh_token)
            window.location.replace("/dash");
        })
    }
}, false);

function logout(){
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    axios.get('http://localhost:3030/auth/logout')
    .then(function(res){
        window.location.replace("/");
    })
}
axios.get('http://localhost:3030/auth/loggedin', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    }
}).catch(function(error){
    window.location.replace("/");
})

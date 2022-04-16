var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: 'exetercivil.eu.auth0.com',
  clientId: 'tF85DPCcZuSpzDsysOWgmTKwEf0YPhaj',
  clientSecret: 'RtPAWHMpnibWTdzPAg9TrjST3fK_g1m5NpZ2F8fckxKpVtoHDPp7g9FIL6jA5tzC',
  scope: 'read:users update:users create:users'
});

function find(page=0, perPage=10){
    return new Promise((resolve, reject)=>{
        auth0.getUsers({fields: ["user_id", "email", "picture", "name"], page: page, per_page: perPage}).then((result)=>{
            let results = []
        
            for (let i = 0; i < result.length; i++) {
              let user = result[i];
        
              auth0.getUserRoles({id: user.user_id}).then((roles)=>{
                const role = roles[0]
                user.role = {id: null, name: null}
                if (roles.length != 0) user.role = {id: role.id, name: role.name}
                results.push(user)
        
                if (results.length === result.length) resolve(results)
              })
            }
          })
    })
}

function findOne(id){
    return new Promise((resolve, reject)=>{
        auth0.getUser({id: id, fields: ["user_id", "email", "picture", "name"]}).then((result)=>{
            let user = result

            auth0.getUserRoles({id: user.user_id}).then((roles)=>{
                const role = roles[0]
                if (roles.length != 0) user.role = {id: role.id, name: role.name}
                resolve(user)
            })
        })
    })
}

function create(name, email, password, role){
    return auth0.createUser({
        email: email,
        name: name,
        password: password,
        connection: "Username-Password-Authentication"
      })
      .then(function (user) {
        console.log(user)
        return auth0.assignRolestoUser({id: user.user_id}, {roles: [role]})
      })
      .catch(function (err) {
        console.log("Create user error!")
        console.log(err)
      });
}

module.exports = {find, create, findOne}
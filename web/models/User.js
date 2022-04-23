const { ManagementClient } = require('auth0');

const auth0 = new ManagementClient({
  domain: '***REMOVED***',
  clientId: '***REMOVED***',
  clientSecret:
    '***REMOVED***',
  scope: 'read:users update:users create:users',
});

function find(page = 0, perPage = 10) {
  return new Promise((resolve) => {
    auth0
      .getUsers({
        fields: ['user_id', 'email', 'picture', 'name'],
        page,
        per_page: perPage,
      })
      .then((result) => {
        const results = [];

        for (let i = 0; i < result.length; i += 1) {
          const user = result[i];

          auth0.getUserRoles({ id: user.user_id }).then((roles) => {
            const role = roles[0];
            user.role = { id: null, name: null };
            if (roles.length !== 0)
              user.role = { id: role.id, name: role.name };
            results.push(user);

            if (results.length === result.length) resolve(results);
          });
        }
      });
  });
}

function findOne(id) {
  return new Promise((resolve) => {
    auth0
      .getUser({ id, fields: ['user_id', 'email', 'picture', 'name'] })
      .then((result) => {
        const user = result;

        auth0.getUserRoles({ id: user.user_id }).then((roles) => {
          const role = roles[0];
          if (roles.length !== 0) user.role = { id: role.id, name: role.name };
          resolve(user);
        });
      });
  });
}

function create(name, email, password, role) {
  return auth0
    .createUser({
      email,
      name,
      password,
      connection: 'Username-Password-Authentication',
    })
    .then((user) => {
      return auth0.assignRolestoUser({ id: user.user_id }, { roles: [role] });
    })
    .catch(() => {
      // console.log('Create user error!');
      // console.log(err);
    });
}

module.exports = { find, create, findOne };

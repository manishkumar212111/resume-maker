const roles = ['user','admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'changePasssword',
  'changeEmail'
  ]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'changePasssword',
  'changeEmail'
]);


module.exports = {
  roles,
  roleRights,
};

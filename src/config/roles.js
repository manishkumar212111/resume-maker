const roles = ['user','admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'getPlans',
  'changePasssword',
  'changeEmail',
  'managePayment',
  'manageEnquirys'
  ]);

roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'getPlans',
  'managePlans',
  'changePasssword',
  'changeEmail',
  'manageTransactions',
  'getTransactions',
  'manageEnquirys',
  'getEnquirys'
]);


module.exports = {
  roles,
  roleRights,
};

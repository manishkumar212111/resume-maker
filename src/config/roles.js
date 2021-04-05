const roles = ['user','admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'getPlans',
  'changePasssword',
  'changeEmail',
  'managePayment',
  'manageEnquirys',
  'manageBlogs',
  'getBlogs'
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
  'getEnquirys',
  'manageBlogs',
  'getBlogs'
]);


module.exports = {
  roles,
  roleRights,
};

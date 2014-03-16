
/**
 * Module dependencies.
 */
var defaults = require('model-defaults');
var each = require('each');
var model = require('model');
var timestamps = require('model-timestamps');
var validation = require('modella-validators');

/**
 * User roles are a high-level way of controlling privileges.
 */
var roles = {
  100: 'admin',
  80: 'inspector',
  60: 'owner',
  40: 'leader',
  20: 'employee'
};

/**
 * Validate that the specified value is a role.
 * @param {Number} role
 * @return {Boolean}
 */
function isRole(role){
  return role in roles;
};

/**
 * User model
 * All information retrieved and set through the use of the
 * user REST-API, will have to conform with this model.
 */
var User = model('User')
  .use(defaults({role: 20}))    // Employee is the default role
  .use(timestamps)
  .use(validation)
  .attr('_id')
  .attr('name', { required: true, format: /\w+ \w+/ })
  .attr('role', { type: 'number', validate: isRole })
  .attr('email', { required: true, unique: true, format: 'email' })
  .attr('photo', { format: 'url' });

User.prototype.firstname = function(){
  return this.name().split(' ').shift();
};

User.prototype.lastname = function(){
  return this.name().split(' ').pop();
};

User.prototype.rolename = function(){
  return roles[this.role()];
};

/**
 * User-roles constants.
 * Eg. User.EMPLOYEE
 */
each(roles, function(num, role){
  User[role.replace(' ', '_').toUpperCase()] = num;
});

/**
 * Expose `User`.
 */
module.exports = User;


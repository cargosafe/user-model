
var assert = require('assert');
var User = require('user-model');

describe('User-model', function(){

  var user;

  before(function(){
    user = new User({
      name: 'Foo Bar',
      email: 'foo@bar.com'
    });
  });

  it('should have a firstname', function(){
    assert(user.firstname() == 'Foo');
  });

  it('should be an employee by default', function(){
    assert(user.rolename() == 'employee');
  });

});


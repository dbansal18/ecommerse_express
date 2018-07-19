const assert = require('assert');
const User = require('../models/user-model');

// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

    const user = new User({
      name: 'Mario'
    });

    user.save().then(function(){
      assert(!user.isNew);
      done();
    });

  });

});
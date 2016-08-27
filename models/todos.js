var uuid = require('uuid');

function Todo(description, id){
  this.id = id || uuid.v4();
  this.description = description;
  this.isComplete = false;
}

Todo.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.isComplete = true;
  } else {
    this.isComplete = false;
  }
};


module.exports = Todo;

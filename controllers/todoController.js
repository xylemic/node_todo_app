const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://danielbobbyjohnson:ZzNu4jRbBvKR0CM5@todo.r77t0.mongodb.net/?retryWrites=true&w=majority&appName=todo')

// create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

// create model
var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save();

let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'do dishes'}]; 

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push(req.body);
    res.json(data); // Respond with updated data
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter((todo) => {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data); // Respond with updated data
  });
}
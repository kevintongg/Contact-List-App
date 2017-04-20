const express = require('express');
const path = require('path');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const db = mongojs('contactlist', ['contactlist']);
const app = express();

const fullPath = path.join(__dirname, '/public');

app.use(express.static(fullPath));
app.use(bodyParser.json());

app.get('/contactlist/', (request, response) => {
  console.log('Received a GET request!');
  db.contactlist.find((err, docs) => {
    console.log(docs);
    response.json(docs);
  });
});
app.post('/contactlist/', (request, response) => {
  console.log(request.body);
  db.contactlist.save(request.body, (err, docs) => {
    response.json(docs);
  });
});

app.delete('/contactlist/:id', (request, response) => {
  const id = request.params.id;
  console.log(id);
  db.contactlist.remove({ _id: mongojs.ObjectId(id) }, (err, doc) => {
    response.json(doc);
  });
});

app.get('/contactlist/:id', (request, response) => {
  const id = request.params.id;
  db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, (err, doc) => {
    response.json(doc);
  });
});

app.put('/contactlist/:id', (request, response) => {
  const id = request.params.id;
  console.log(id);
  db.contactlist.findAndModify(
    {
      query: {
        _id: mongojs.ObjectId(id),
      },
      update: {
        $set: {
          name: request.body.name,
          email: request.body.email,
          number: request.body.number } },
      new: true,
    }, (err, doc) => {
    response.json(doc);
  });
});

app.listen(3000);
console.log('Server running on port 3000');

const express = require('express')
const app = express()
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync('db.json')
const port = 3000

low(adapter).then(
  function (db) {
      // Set some defaults (required if your JSON file is empty)
      db.defaults({
          topic: [],
          author: []
      }).write();


      // db.get('author').push({
      //     id:1,
      //     name:'egoing',
      //     profile:'developer' 
      // }).write();

      // db.get('topic').push({
      //     id:1,
      //     title:'lowdb',
      //     description:'lowdb is ...',
      //     author:1
      // }).write();

      // db.get('topic').push({
      //     id: 2,
      //     title: 'mysql',
      //     description: 'mysql is ...',
      //     author: 1
      // }).write();

      // console.log(
      //     db.get('topic')
      //     .find({title:'lowdb', author:1})
      //     .value()
      // );

      // db.get('topic')
      //     .find({id:2})
      //     .assign({title:'MySQL & MariaDB'})
      //     .write();

      // db.get('topic')
      //     .remove({
      //         id: 2
      //     })
      //     .write();

      var sid = shortid.generate();
      db.get('author')
          .push({
              id: sid,
              name: 'duru',
              profile: 'db admin'
          }).write().then(function(){
              console.log('add author');
          });

      db.get('topic')
          .push({
              id: shortid.generate(),
              title: 'MSSQL',
              description: 'MSSQL is ...',
              author: sid
          }).write().then(function(){
              console.log('add topic');
          });

  }
)

app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.use((req, res, next) => {
    res.status(404).send("Sorry cant find that!");
  });
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
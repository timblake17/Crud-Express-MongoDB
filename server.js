const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;





var db

MongoClient.connect('mongodb://timblake:timblake@ds141175.mlab.com:41175/star-wars-quotes-crud', (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-wars-quotes-crud') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))



// app.get('/', (req, res)=>{
//   res.sendFile(__dirname + '/index.html')
// });

app.get('/', (req, res)=>{
  var cursor = db.collection('quotes').find().toArray(function(err,result){
    if(err) return console.log(err)

    res.render('index.ejs', {quotes: result})
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

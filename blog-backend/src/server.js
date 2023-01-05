import express from 'express';
import {
  db,
  connectToDb
} from './db.js';




const app = express();
app.use(express.json()); //middleware that allows the body property to work well in an expess application

// app.post('/hello', (req, res) => {
//   console.log(req.body);
//   res.send(`Hello! ${req.body.email}`)
// });

// //URL Parameters in Express
// app.get('/hello/:email', (req, res) => {
//   const {
//     email
//   } = req.params;
//   // const name = req.params.name;
//   res.send(`Hello ${email}`);
// })


//TEMPORARY IN-MEMEORY DATABASE
// let articlesInfo = [{
//     name: 'andrew-clark',
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: 'dan-abramov',
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: 'jason-bonta',
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: 'joe-savona',
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: 'josh-story',
//     upvotes: 0,
//     comments: []
//   }
// ]

//Connecting to the database
app.get('/api/articles/:name', async (req, res) => {
  const {
    name
  } = req.params;

  // Query data in database
  const article = await db.collection('articles').findOne({
    name
  });

  //send the JSON data back to the client
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }

})
//CREATING AN UPVOTE ENDPOINT 
app.put('/api/articles/:name/upvote', async (req, res) => {
  const {
    name
  } = req.params;

  await db.collection('articles').updateOne({
    name
  }, {
    $inc: {
      upvotes: 1
    }, //increment upvotes by one
  });
  //Query data in database
  const article = await db.collection('articles').findOne({
    name
  });

  if (article) {
    res.send(`The ${name} article now has ${article.upvotes} upvotes`);
  } else {
    res.send('That article doesn\'t exist');
  }

});

//Creating comments endpoint 
app.post('/api/articles/:name/comments', async (req, res) => {
  const {
    name
  } = req.params;
  const {
    postedBy,
    text
  } = req.body;

  await db.collection('articles').updateOne({
    name
  }, {
    $push: {
      comments: {
        postedBy,
        text
      }
    }
  });

  const article = await db.collection('articles').findOne({
    name
  });

  //Send response to client if an article is found
  if (article) {
    res.send(article.comments);
  } else {
    res.send('That article doesn\'t exist');
  }
});


connectToDb(() => {
  console.log('Successfully connected to the database');
  app.listen(8000, () => {
    console.log('Server is listening on port 8000');
  });
})
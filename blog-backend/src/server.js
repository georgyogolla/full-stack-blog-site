import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import {
  db,
  connectToDb
} from './db.js';



const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  const {
    authtoken
  } = req.headers;

  if (authtoken) {
    try {
      const user = await admin.auth().verifyIdToken(authtoken);
      req.user = user;

    } catch (error) {
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};
  next();
});

//Connecting to the database
app.get('/api/articles/:name', async (req, res) => {
  const {
    name
  } = req.params;

  const {
    uid
  } = req.params;

  // Query data in database
  const article = await db.collection('articles').findOne({
    name
  });

  //send the JSON data back to the client
  if (article) {
    const upvoteIds = article.upvoteId || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }

});


// Preventing user from upvoting and commenting when he / she is not logged in
app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
})
//CREATING AN UPVOTE ENDPOINT 
app.put('/api/articles/:name/upvote', async (req, res) => {
  const {
    name
  } = req.params;
  const {
    uid
  } = req.user;

  const article = await db.collection('articles').findOne({
    name
  });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
      await db.collection('articles').updateOne({
        name
      }, {
        $inc: {
          upvotes: 1
        },
        $push: {
          upvoteIds: uid
        },
      });
    }
    //Query data in database
    const updatedArticle = await db.collection('articles').findOne({
      name
    });

    res.json(updatedArticle);
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
    text
  } = req.body;
  const {
    email
  } = req.user;

  await db.collection('articles').updateOne({
    name
  }, {
    $push: {
      comments: {
        postedBy: email,
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
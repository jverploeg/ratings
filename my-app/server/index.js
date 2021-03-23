/* eslint-disable */
const port = 3000;
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const config = require('../config/config.js')

// import queries helper
const db = require('./db/index.js');
const url = 'http://localhost:8080';

// app.use(express.static(path.join(__dirname, '../build')));

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});










// app.get('/item/*', (req, res) =>{
//   res.sendFile(path.join(path.join(__dirname, '../build/index.html')));
// });
// app.get('/:id(\\d+)/', (req, res) =>{
//   res.sendFile(path.join(path.join(__dirname, '../build/index.html')));
// });

app.get('/item/*', (req, res) =>{
  res.sendFile(path.join(path.join(__dirname, '../public/index.html')));
});
app.get('/:id(\\d+)/', (req, res) =>{
  res.sendFile(path.join(path.join(__dirname, '../public/index.html')));
});


// app.get('*', (req, res) => {
//   axios({method: 'get',
//   headers: {'Authorization': config.key},
//   url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld${req.url}`,
// })

// .then(response => {
//   // console.log(response);
//   res.status(200).send(response.data);
// })
// .catch(err => {
//   //console.log(err);
//   res.status(err.response.status).send(err.response.data);
// });
// })
//any get reqeust, append url that is different
app.get('*', (req, res) => {
  console.log(req.url)
  if (req.url.indexOf('questions') !== -1) {
    // console.log('questions requests: ', req.url)
    // axios({
    //   method: 'get',
    //   headers: { 'Authorization': config.config },
    //   url: `${url}${req.url}`,
    // })

    //   .then(response => {
    //     // console.log(response);
    //     // console.log(response.data)
    //     res.status(200).send(response.data);
    //   })
    //   .catch(err => {
    //     //console.log(err);
    //     res.status(err.response.status).send(err.response.data);
    //   });
  }
  else if (req.url.indexOf('products') !== -1) {
    //axios get requests to products server

  } else if (req.url.indexOf('reviews') !== -1) {
    //axios get requests to reviews server
    console.log('reviews requests: ', req.url)
    // console.log(req);
    //routes set up inside here

    // GET REVIEWS FOR CURRENT PRODUCT
    if(req.query.product_id) {
      const product_id = req.query.product_id;
      console.log({product_id})
      const query = `SELECT * FROM reviews WHERE product_id=${product_id} ORDER BY review_id ASC`;
      db.getReviews(query)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((error) => {
        res.status(400).send(error)
      });
    }


  }

})

// set up review routes
app.put('/reviews/helpful', (req, res) => {
  console.log('helpful', req.body.params)
  const review_id = req.body.params.review_id;
  const query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id=${review_id}`;
  db.markHelpful(query)
  .then((results) => {
    res.status(200).send(results)
  })
  .catch((error) => {
    res.status(400).send(error)
  });
})
app.put('/reviews/report', (req, res) => {
  console.log('report', req.body.params)
  const review_id = req.body.params.review_id;
  const query = `UPDATE reviews SET reported=true WHERE review_id=${review_id}`;
  db.markReport(query)
  .then((results) => {
    res.status(200).send(results)
  })
  .catch((error) => {
    res.status(400).send(error)
  });
})





    //res.redirect('/api/reviews');
    // app.use('/api/reviews');
    // axios({
    //   method: 'get',
    //   headers: { 'Authorization': config.key },
    //   url: `${url}${req.url}`,
    // })

    //   .then(response => {
    //     // console.log(response);
    //     // console.log(response.data)
    //     res.status(200).send(response.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     //res.status(err.response.status).send(err.response.data);
    //   });

// app.get('/item/*', (req, res) =>{
//   res.sendFile(path.join(path.join(__dirname, '../public/index.html')));
// });
// app.get('/:id(\\d+)/', (req, res) =>{
//   res.sendFile(path.join(path.join(__dirname, '../public/index.html')));
// });
// app.get('/reviews/:review_id', db.getReviewsById);
// app.post('/reviews', db.createReview);
// app.put('/reviews/:review_id/helpful', db.markHelpful);
// app.put('/reviews/:review_id/report', db.markReport);








// //=======================================
//           // add question
// //=======================================
// app.post('/qa/questions', (req, res) => {
//   axios({
//     method: 'post',
//     headers: {'Authorization': config.key},
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/`,
//     data: {
//       body : req.body.body,
//       name: req.body.name,
//       email: req.body.email,
//       product_id: req.body.product_id
//     }
//   })
//     .then(result => {
//       console.log('POSTED')
//       res.sendStatus(201);
//   })
//     .catch(err => console.log('ERROR POSTING: ', err))
// })



// //=======================================
//           // add answer
// //=======================================
// app.post('/qa/questions/answers', (req, res) => {
//   axios({
//     method: 'post',
//     headers: {'Authorization': config.key},
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${req.body.question_id}/answers`,
//     data: {
//       body : req.body.body,
//       name: req.body.name,
//       email: req.body.email,
//       photos: req.body.photos
//     }
//   })
//   .then(response => {
//     res.status(201).send('Post has been recorded')
//   })
//   .catch(err => console.log('error with post request: ', err))
// })


// //=======================================
//     // put request QUESTION HELPFUL
// //=======================================
// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   axios({
//     method: 'put',
//     headers: {'Authorization': config.key},
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${req.params.question_id}/helpful`,
//   })
//   .then(response => {
//     res.status(201).send('Post has been recorded')
//   })
//   .catch(err => console.log('error with post request: ', err))
// })

// //=======================================
//       // put request ANSWER HELPFUL
// //=======================================
// app.put(`/qa/answers/:answer_id/helpful`, (req, res) => {
//   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/answers/${req.params.answer_id}/helpful`, {}, {
//     headers: {
//       'Authorization': config.key
//     },
//   })
//   .then((response) => {
//     res.status(200);
//     res.send(response.data);
//   })
//   .catch((err) => {
//     res.status(404);
//     console.log('ERROR WITH ANSWER IS HELPFUL: ', err)
//   })
// })

// //=======================================
//      // put request REPORT ANSWER
// //=======================================
// app.put(`/qa/answers/:answer_id/report`, (req, res) => {
//   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/answers/${req.params.answer_id}/report`, {}, {
//     headers: {
//       'Authorization': config.key
//     },
//   })
//   .then((response) => {
//     res.status(200);
//     res.send(response.data);
//   })
//   .catch((err) => {
//     res.status(404);
//     console.log('ERROR WITH ANSWER IS REPORTED: ', err)
//   })
// })
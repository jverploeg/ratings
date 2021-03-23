/* eslint-disable */
const path = require('path');
const { Client, Pool } = require('pg');

const pool = new Pool({
  user: 'jverploeg',
  host: 'localhost',
  database: 'api',
  port: 5432,
});

// error handle
pool.on('error', (err, client) => {
  console.error('Error:', err);
});

const getReviews = (query) => {
  const overall = 0;
  const ratings = [];
  return new Promise ((resolve, reject) => {
    pool.query(query)
      .then((res) => {
        //console.log(res.rows)
        //let rows = res.rows;
        // rows.forEach((item, index) => {
        //   ratings.push(item.rating);
        // });
        //console.log({ratings});
        //resolve(res.data.results);
        resolve(res.rows);
      })
      .catch((err) => {
        console.log('err: ', err);
        reject(err);
      });
  });
};

const markHelpful = (query) => {
  console.log({query});
  return new Promise ((resolve, reject) => {
    pool.query(query)
      .then((res) => {
        console.log({res})
        //resolve(res.rows);
      })
      .catch((err) => {
        console.log('errdb: ', err);
        reject(err);
      });
  });
};
const markReport = (query) => {
  console.log({query});
  return new Promise ((resolve, reject) => {
    pool.query(query)
      .then((res) => {
        console.log({res})
        //resolve(res.rows);
      })
      .catch((err) => {
        console.log('errdb: ', err);
        reject(err);
      });
  });
};



// const load = (table, dataFile, cb) => {
//   const dataFiles = {
//     // reviews: '/data/reviews.csv',
//     sample: '/data/sample.csv',
//   };
//   var dir = path.join(__dirname, '..', dataFiles[dataFile])
//   const query = `COPY ${table} FROM '${dir}' DELIMITER ',' CSV HEADER;`;
//   pool.query(query, (err, result) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, result);
//     }
//   })
// };
// psql api < /Users/jverploeg/Coding/sdc/project-catwalk-v3/my-app/server/dbv1.sql

// module.exports = {
//   query: (text, params, callback) => {
//     const start = Date.now();
//     return pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;
//       // log query data
//       console.log('executed query', { text, duration, rows: res.rowCount });
//       callback(err, res);
//     });
//   },
// };

module.exports = {
  getReviews,
  // createReview,
  markHelpful,
  markReport,
}

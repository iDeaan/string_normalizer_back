const http = require('http');
const mongoose = require('mongoose');

const NormalizeIterations = require('./models/normalizeIteration');

const hostname = '127.0.0.1';
const port = 3000;

const url = 'mongodb://localhost:27017/stringNormalizer';
const connect = mongoose.connect(url);

connect.then(() => {
  console.log("Connected correctly to Database");
}, (err) => console.log(err));

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    NormalizeIterations.findOne({})
      .then((normalizeIteration) => {
        let code = 200;
        let message = 'SUCCESS';

        if (!normalizeIteration) {
          code = 404;
          message = 'RECORDS NOT FOUND';
        }

        res.statusCode = code;

        const responseData = {
          meta: {
            code,
            message
          },
          data: normalizeIteration
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
      })
      .catch((err) => {
        this.code = 201;
        res.end(JSON.stringify({
          meta: {
            code: 422,
            message: err
          }
        }));
      });
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      NormalizeIterations.remove({})
        .then(() => {
          NormalizeIterations.create(JSON.parse(body))
            .then((iteration) => {
              res.statusCode = 200;

              const responseData = {
                meta: {
                  code: 200,
                  message: "SUCCESS"
                },
                data:iteration
              };

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(responseData));
            })
            .catch((err) => {
              this.code = 201;
              res.end(JSON.stringify({
                meta: {
                  code: 422,
                  message: err
                }
              }));
            });
        })
    });
  }

  if (req.method === 'DELETE') {
    NormalizeIterations.remove({})
      .then(() => {
        res.statusCode = 200;

        const responseData = {
          meta: {
            code: 200,
            message: "SUCCESS"
          },
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(responseData));
      })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

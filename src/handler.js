
const req = require('request');
const fs = require('fs');
const path = require('path');

const homepage = (request, response) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) => {
    if (err) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end('<h1>SERVER ERROR</h1>');
    } else {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(file);
    }
  });
};

const handler = (request, response) => {
  const { url } = request;
  const extension = url.split('.')[1];
  const filetype = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    img: 'image/png',
  };

  fs.readFile(path.join(__dirname, '..', url), (err, file) => {
    if (err) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end('<h1>SERVER ERROR</h1>');
    } else {
      response.writeHead(200, `Content-Type:${filetype[extension]}`);
      response.end(file);
    }
  });
};

const getRandomJoke = (request, response) => req('https://icanhazdadjoke.com/slack', (error, apiResponse) => {
  if (error) {
    throw (error);
  } else {
    const jokeJSON = JSON.parse(apiResponse.body);
    const joke = jokeJSON.attachments[0].text;

    response.end(joke);
  }
});


module.exports = {
  homepage,
  handler,
  getRandomJoke,

};

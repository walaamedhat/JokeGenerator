const handlers = require('./handler.js');

const router = (request, response) => {
  const { url } = request;
  if (url === '/') {
    handlers.homepage(request, response);
  } else if (url.startsWith('/public')) {
    handlers.handler(request, response);
  } else if (url === '/getjoke') {
    handlers.getRandomJoke(request, response);
  } else {
    response.writeHead(404);
    response.end('PAGE NOT FOUND!!!!!!!!!!');
  }
};
module.exports = router;

const request = require("request");

var urls = [
  {"url": "http://doesNotExist.boldtech.co"},
  {"url": "https://boldtech.co/"},
  {"url": "http://offline.boldtech.co"},
  {"url": "https://www.google.com/"},
  {"url": "https://www.hackerrank.com/"},
  {"url": "https://hush.company/"}
];

findServer()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

function findServer(){
  // Return promise
  return new Promise(function(resolve, reject) {
    // Setting URL and headers for request
    var options = {
      url: '',
      //timeout: 5000,
      headers: {'User-Agent': 'request'}
    };
    var priority = urls.length;

    urls.map(item => {
      options.url = item.url;
      // Do async job
      request.get(options, function(err, response, body) {
        if (err) {
          priority--;
        } else {
          if(response.statusCode >= 200 && response.statusCode <= 299){
            urls.map(i => {
              if(i.url === response.request.uri.href){
                i.priority = priority;
                priority--;
              }
            });
          }
        }

        if(priority === 0){
          urls.map(x => {
            if(x.priority === undefined){
              x.priority = priority;
              priority++;
            }
          });
          resolve(urls);
        }
      });
    });
  });
}

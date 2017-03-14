// require 'request' and the Node 'fs' (filesystem) modules
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!!');

var GITHUB_USER = "kpowch";
var GITHUB_TOKEN = "b23281cab5c0a4a15f1cd9c82ef317201c2a9359";


// use request library to programmatically fetch the list of contributors
// via HTTPS for given repo.
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // console.log(requestURL);

  // refer to good resource: https://github.com/request/request#custom-http-headers
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      throw err;
    }
    console.log('statusCode:', response && response.statusCode);

    var contributorObj = JSON.parse(body);

    cb(err, contributorObj);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log('Errors:', err);
  var arrayOfURLS = [];
  for (prop in result) {
    //console.log(result[prop].avatar_url);
    arrayOfURLS.push(result[prop].avatar_url);
  }
  // console.log(arrayOfURLS);
  return arrayOfURLS;
});

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('data', function (data) {
         //console.log('Getting data...');
       })
       .on('end', function () {
         console.log('Downloading image...');
       })
       .on('response', function (response) {
         // console.log('Response Status Code:', response.statusCode);
         // console.log('Content type:', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function() {
         console.log('Download complete!');
       });
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

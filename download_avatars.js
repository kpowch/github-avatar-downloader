var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!!');

var GITHUB_USER = "kpowch";
var GITHUB_TOKEN = "b23281cab5c0a4a15f1cd9c82ef317201c2a9359";


// Makes a request for JSON, getting back an array of contributors via HTTPS for given repo.
// Passes data to cb, an anonymous callback function that it's given.
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
    console.log('Status Code for getting repo contributors:', response && response.statusCode);

    var contributorObj = JSON.parse(body);

    cb(err, contributorObj);

    return contributorObj; // do i need to do this?
  });
}


// Loops through each item in the contributors array and constructs the files path
// using the login value (e.g. 'avatars/dhh.jpg').
// Then passes avatar_url and file path to downloadImageByURL.
getRepoContributors("jquery", "jquery", function (err, result) {
  console.log('Errors:', err);

  var loginAndURLdata = {};

  for (prop in result) {
    downloadImageByURL(result[prop].avatar_url, result[prop].login + '.jpg');

    // just saving the data in case i need it for something else
    loginAndURLdata[result[prop].login] = result[prop].avatar_url;
  }
  return loginAndURLdata; // do i need to do this?
});


// Fetches desired avatar_url and saves the image to given filePath.
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('end', function () {
          //  console.log('Downloading image...');
         })
         .pipe(fs.createWriteStream("avatars/" + filePath))
         .on('finish', function() {
          //  console.log('Download complete!');
         });
}

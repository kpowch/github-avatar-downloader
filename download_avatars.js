var request = require('request');
var fs = require('fs');
require('dotenv').config();

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!!');

// Makes a request for JSON, getting back an array of contributors via HTTPS for given repo.
// Passes data to cb, an anonymous callback function that it's given.
function getRepoContributors(repoOwner, repoName, cb) {
  // builds request from the environment variables in the .env file
  var requestURL = 'https://' + process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // refer to good resource: https://github.com/request/request#custom-http-headers
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  if (!repoOwner || ! repoName) {
    return cb('You must specify the repo owner and name');
  }

  request(options, function (err, response, body) {
    if (err) {
      return cb(err);
    }
    if (response && response.statusCode !== 200) {
      return cb('Failed to find repository and/or user.');
    }

    var contributorObj = JSON.parse(body);

    cb(null, contributorObj);
  });
}


// Loops through each item in the contributors array and constructs the files path
// using the login value (e.g. 'avatars/dhh.jpg').
// Then passes avatar_url and file path to downloadImageByURL.
getRepoContributors(repoOwner, repoName, function (err, result) {
  if (err) {
    return console.log(err);
  }

  for (prop in result) {
    downloadImageByURL(result[prop].avatar_url, result[prop].login + '.jpg');
  }
  console.log('Downloading... check download folder!');
});


// Fetches desired avatar_url and saves the image to given filePath.
function downloadImageByURL(url, filePath) {
  // make the /avatars director if it doesn't exist
  if (!fs.existsSync("./avatars/")) {
    fs.mkdirSync("./avatars/");
  }

  request.get(url)
         .on('error', function (err) {
           console.log('Error downloading image(s):', err);
         })
         .on('end', function () {
          //  console.log('Downloading image...');
         })
         .pipe(fs.createWriteStream("./avatars/" + filePath))
         .on('finish', function() {
          //  console.log('Download complete!');
         });
}

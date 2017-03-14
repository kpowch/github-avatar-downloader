var fs = require('fs');
var getRepoContributors = require('./github_utils');
require('dotenv').config();

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!!');

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

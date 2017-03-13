// require the request module
var request = require('request');

// var endpoint = 'https://api.github.com/repos/jquery/jquery/contributors';

console.log('Welcome to the GitHub Avatar Downloader!!')

// use request library to programmatically fetch the list of contributors
// via HTTPS for given repo.
function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

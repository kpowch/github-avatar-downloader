// require the request module
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!!')

var GITHUB_USER = "kpowch";
var GITHUB_TOKEN = "b23281cab5c0a4a15f1cd9c82ef317201c2a9359";

// use request library to programmatically fetch the list of contributors
// via HTTPS for given repo.
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

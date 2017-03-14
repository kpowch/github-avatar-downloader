var request = require('request');

// Makes a request for JSON, getting back an array of contributors via HTTPS for given repo.
// Passes data to cb, an anonymous callback function that it's given.
module.exports = function getRepoContributors(repoOwner, repoName, cb) {
  // send error if .env file with github user and token is missing
  if (!process.env.GITHUB_USER || ! process.env.GITHUB_TOKEN) {
    return cb('You must specify the GitHub user and token in .env file');
  }

  // send error if repo owner and name aren't given
  if (!repoOwner || ! repoName) {
    return cb('You must specify the repo owner and name');
  }

  // builds request from the environment variables in the .env file
  var requestURL = 'https://' + process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // options object for the request library
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      return cb(err);
    }

    // send error on any non-success code including wrong credentials from above
    if (response && response.statusCode !== 200) {
      return cb('Failed to find repository and/or user.');
    }

    var contributorObj = JSON.parse(body);

    cb(null, contributorObj);
  });
};

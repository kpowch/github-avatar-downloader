# GitHub Avatar Downloader
Taken from <a>https://web-compass.lighthouselabs.ca/projects/w2-github-avatars</a>  

As on 2017-03-13

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

Any valid repo-owner + repo combination can be used, such as this:

`node download_avatars.js nodejs node`

## Functional Requirements
As an open source project leader,
I want a folder with the avatars of all of my github project's contributors so that I can use them in a website.

### Given
<ul>
<li> Node installed
<li> Currently in shell
<li> File is in current folder
</ul>

### When

File is executed using node, providing a github user and repository as command-line arguments For example: `$ node download_avatars.js nodejs node`

### Then

<ul>
<li> Should find a folder called avatars in current directory
<li> Avatars folder should contain images corresponding to the avatars of the contributors of the repo
<li> Name of each image file should be the contributor's name and the file extension (ex. `johnny.png`)
</ul>

## Implementation Requirements
<ul>
<li> uses 'request' library to make the HTTP requests
<li> uses git for version control
</ul>

### Outcomes
<ul>
<li> can use curl to issue simple GET requests
<li> can use curl for non-trivial requests
<li> can explain what is meant by "rate limit" and why they are used
<li> can explain what is meant by "API" and why they are used

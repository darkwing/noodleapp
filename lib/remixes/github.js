'use strict';

// Generate GitHub regex check
var SERVICE_GITHUB = /((http|https):\/\/)?github\.com\/(.*)\/(.*)/gi;
var request = require('request');

exports.process = function(media, remix, callback) {
  if (!remix.isMatched && media.url.match(SERVICE_GITHUB)) {
    var split = media.url.split("/"),
    	username = split[3],
    	repo = split[4];

    if (username && repo) {
    	request.get('https://api.github.com/repos/' + username + '/' + repo, function(err, resp, body) {
	      if (!err) {
	        try {
	          remix.isMatched = true;
	          var jsonResp = JSON.parse(body);
	          remix.result = '<a href="' + jsonResp.html_url + '" class="link-detail-wrapper" target="_blank"><span class="link-title">' + username + '/' + repo + '</span><span class="link-description">' + jsonResp.description + '</span></a>';
	          callback(null, remix);
	        } catch(error) {
	        	callback(null, remix);
	        }
	      }
	      else {
	      	callback(null, remix);
	      }
	    });
    }
    else {
    	callback(null, remix);
    }
  }

  return remix;
};
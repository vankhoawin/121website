'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.query = function (req, res) {

	var key = req.params.query;

	fs.readFile('server/api/query/query.data.json', 'utf-8', function (err, result) {
    if (err) { return handleError(res, err); }

  	var termID = '' + JSON.parse(result)[key];
  	// console.log(termID);

  	fs.readFile('server/api/query/query.tfidf.json', 'utf-8', function(err, result) {
	    if (err) { return handleError(res, err); }


	  	var TFIDF = JSON.parse(result)[termID];

  		var urlList = TFIDF.slice(0, 10);
			
			fs.readFile('server/api/query/query.docid.json', 'utf-8', function(err, result) {
		    if (err) { return handleError(res, err); }

		    for (var elementID in urlList) {
		    	var docID = urlList[elementID][1];
		    	console.log("docID: " + docID);
		    	var elementTitleAndUrl = JSON.parse(result)[docID];
		    	console.log(elementTitleAndUrl);
		    	urlList[elementID].push(elementTitleAndUrl.title)
		    	urlList[elementID].push(elementTitleAndUrl.url)
		    }

				res.status(200).send(JSON.stringify(urlList));
			
	  	})
  	})
	})
}
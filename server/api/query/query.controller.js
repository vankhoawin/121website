'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.query = function (req, res) {

	var key = req.params.query;

	fs.readFile('server/api/query/query.data.json', 'utf-8', function (err, result) {
    if (err) { return handleError(res, err); }

  	// console.log(key)
  	var termID = '' + JSON.parse(result)[key];

  	fs.readFile('server/api/query/query.tfidf.json', 'utf-8', function(err, result) {
	    if (err) { return handleError(res, err); }

  		var toReturn = [];

	  	var TFIDF = JSON.parse(result);

  		for (var docID in TFIDF) {
  			if (toReturn.length >= 10)
  				break;

  			var document = TFIDF[docID]
	  		if (termID in document) {
	  			toReturn.push(document[termID]);
	  		}
	  	}

			res.status(200).send(JSON.stringify(toReturn));
  	})
	})
}
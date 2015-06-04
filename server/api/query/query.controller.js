'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.query = function (req, res) {
	var key = req.params.query;

	fs.readFile('server/api/query/query.key_termid.json', 'utf-8', function (err, result) {
    if (err) { return handleError(res, err); }

  	var termID = '' + JSON.parse(result)[key];

		fs.readFile('server/api/query/query.termid_tfidf.json', 'utf-8', function (err, result) {
	    if (err) { return handleError(res, err); }

	    var toReturn = JSON.parse(result)[termID];
	    toReturn.forEach(function(row) {
	    	row[1] = row[1] === '' ? '[UNTITLED PAGE]' : row[1];
	    })

			res.status(200).send(JSON.stringify(toReturn));
		})
  })
}
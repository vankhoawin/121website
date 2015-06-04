'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.query = function (req, res) {
	var key = req.params.query;

	fs.readFile('server/api/query/query.key_termid.json', 'utf-8', function (err, result) {
    if (err) { return handleError(res, err); }

    var keyToTermIdJSON = JSON.parse(result);


    // split up wordphrase query into individual term IDs
    var termIdList = [];
    key.split(' ').forEach(function(key) {
    	termIdList.push(keyToTermIdJSON[key])
    })

		fs.readFile('server/api/query/query.termid_tfidf.json', 'utf-8', function (err, result) {
	    if (err) { return handleError(res, err); }

	    var termIdToTFIDFJSON = JSON.parse(result);


	    // create an object containing all scores so we can add to TFIDF scores that already exist
	    // without having to loop through the entire array. O(n^2)
	    var tfidfCompiledObject = {};
	    termIdList.forEach(function(term) {
	    	var TFIDFList = termIdToTFIDFJSON[term] || [];

		    TFIDFList.forEach(function(row) {
		    	row[1] = (row[1] === '') ? '[UNTITLED PAGE]' : row[1];

		    	if (row[2] in tfidfCompiledObject) {
		    		tfidfCompiledObject[row[2]][0] += row[0];
		    	}else {
		    		tfidfCompiledObject[row[2]] = row;
		    	}
		    })
	    })

	    // now that TFIDF object has been filled, extract the rows to return
	    var toReturn = [];
	    Object.keys(tfidfCompiledObject).forEach(function(key) {
	    	toReturn.push(tfidfCompiledObject[key]);
	    })

	    toReturn = toReturn.sort(function _sortByValue(a, b) {
	    	return (b[0] - a[0]);
	    });

	    // return only top ten
	    toReturn = toReturn.slice(0, 10);

			res.status(200).send(JSON.stringify(toReturn));
		})
  })
}
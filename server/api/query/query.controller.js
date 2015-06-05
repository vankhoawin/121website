'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.query = function (req, res) {
	fs.readFile('server/api/query/document.json', 'utf-8', function(err, documentText) {
		if (err) { return handleError(res, err); }
		fs.readFile('server/api/query/corpus.json', 'utf-8', function(err, corpusText) {
			if (err) { return handleError(res, err); }

			// create small document from the query
			var queryDoc = {};
			var queryTerms = req.params.query.split(' ');
			queryTerms.forEach(function(term) {
				queryDoc[term] = queryDoc[term] ? queryDoc[term] + 1 : 0;
			})

			// normalize query
			var queryTermsLength = queryTerms.length;
			Object.keys(queryDoc).forEach(function(term) {
				queryDoc[term] = queryDoc[term] / queryTermsLength;
			})

			// calculate relevance score
		  var documentJSON = JSON.parse(documentText);
		  var corpusJSON = JSON.parse(corpusText);
		  
			var relevanceList = [];
			documentJSON.forEach(function(document) {
				var score = 0.0;
				var documentTerms = document[1];

				queryTerms.forEach(function(term) {
					var queryScore = (queryTerms[term] / corpusJSON[term]) || 0.0;
					var documentScore = (documentTerms[term] / corpusJSON[term]) || 0.0;

					score += queryScore + documentScore;
				})

				if (score !== 0) {
					var title = document[0] || "[UNTITLED]";
					var url = document[2] || "#";
					relevanceList.push([title, score, url]);
				}
			})

	    relevanceList = relevanceList
	    	.sort(function _sortByValue(a, b) { return (b[1] - a[1]); })
	    	.slice(0, 10);

			res.status(200).send(JSON.stringify(relevanceList));
		})
	})
}
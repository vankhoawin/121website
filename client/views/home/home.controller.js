'use strict';

angular.module('121assignment3website')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    angular.extend(vm, {
      inputText: '',
      query: [],
      result: '',

      wordBank: [
        'mondego',
        'machine learning',
        'software engineering',
        'security',
        'student affairs',
        'graduate courses',
        'informatics',
        'REST',
        'computer games',
        'information retrieval',
      ],

      wordBankQuery: function(word) {
        vm.inputText = word;
        vm.queryDatabase();
      },

      queryDatabase: function() {
        document.getElementById('query-input').disabled = true;

      	$http.get('/api/querys/' + vm.inputText.toLowerCase())
      		.success(function(data, status) {
            vm.query = (data.length !== 0) ? vm.inputText.split(' ') : ['No results found.'];
            vm.result = data;
            document.getElementById('query-input').disabled = false;
      		})
      },

      clearSearch: function(index) {
        vm.query.splice(index, 1);
        if (vm.query.length !== 0) {
          vm.inputText = vm.query.join(" ");
          vm.queryDatabase();
        }else {
        	vm.result = '';
        	vm.inputText = '';
        }
      },

      openAboutModal: function() {
        $('#about-modal').foundation('reveal', 'open');
      }
    });
  });

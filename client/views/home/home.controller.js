'use strict';

angular.module('121assignment3website')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    angular.extend(vm, {
      inputText: '',
      query: '',
      result: '',

      queryDatabase: function() {
        document.getElementById('query-input').disabled = true;

      	$http.get('/api/querys/' + vm.inputText.toLowerCase())
      		.success(function(data, status) {
            vm.query = data ? vm.inputText : 'No results found.';
            vm.result = data;
            document.getElementById('query-input').disabled = false;
      		})
      },
      clearSearch: function() {
      	vm.query = '';
      	vm.result = '';
      	vm.inputText = '';
      },
      openAboutModal: function() {
        $('#about-modal').foundation('reveal', 'open');
      }
    });
  });

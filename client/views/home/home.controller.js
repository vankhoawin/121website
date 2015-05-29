'use strict';

angular.module('121assignment3website')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl',
      inputText: '',
      query: '',
      result: '',
      queryDatabase: function() {
      	$http.get('/api/querys/' + vm.inputText)
      		.success(function(data, status) {
      			vm.query = vm.inputText;
      			vm.result = data;
      			// console.log(data);
      		})
      }
      
    });

  });

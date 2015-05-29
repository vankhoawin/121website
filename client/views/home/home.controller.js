'use strict';

angular.module('121assignment3website')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    angular.extend(vm, {
      inputText: '',
      query: '',
      result: '',
      queryDatabase: function() {
      	$http.get('/api/querys/' + vm.inputText.toLowerCase())
      		.success(function(data, status) {
      			vm.query = vm.inputText;
      			vm.result = data;
      			// console.log(data);
      		})
      },
      clearSearch: function() {
      	vm.query = '';
      	vm.result = '';
      	vm.inputText = '';
      }
    });


		$('#query-db').keydown(function(event){    
			console.log('works');
	    if(event.keyCode==13){
	       vm.queryDatabase();
	    }
		});


  });

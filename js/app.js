var app = angular.module('picker', []);

function mainCtrl($scope, $http) {
  
	// Set sample data
	$scope.sampleData = {
    "id":"entee",
    "variants":[
      {
         "id":"forgetting",
         "image":"images/AP_Tee_Large_Forgetting.png",
         "image_thumbnail":"images/AP_Tee_Forgetting.png",
         "price_cents":2400,
         "display_name":"Forgetting Tee"
      },
      {
         "id":"logogray",
         "image":"images/AP_Tee_Large_Logo_Gray.png",
         "image_thumbnail":"images/AP_Tee_Logo_Gray.png",
         "price_cents":2400,
         "display_name":"Evernote Logo Tee"
      },
      {
         "id":"rorschach",
         "image":"images/AP_Tee_Large_Rorschach.png",
         "image_thumbnail":"images/AP_Tee_Rorschach.png",
         "price_cents":2400,
         "display_name":"Rorschach Tee"
      },
      {
         "id":"logogreen",
         "image":"images/AP_Tee_Large_Logo_Green.png",
         "image_thumbnail":"images/AP_Tee_Logo_Green.png",
         "price_cents":2400,
         "display_name":"Evernote Logo Tee"
      }
    ]
  };

	// Set Variants array to specific scope
	$scope.selectItems = $scope.sampleData.variants;

	// Set initial product
  $scope.product = 0;

  // Show current item
  $scope.currentItem = function (index) {
		return $scope.product === index;
   };

  // Capture all form fields and add some default values
  $scope.formData = {
    'item_id' : $scope.selectItems[$scope.product].id,
    'variant_id': $scope.sampleData.id
  };

  // Show item that's selected and add it to the buy form on buy click
  $scope.showItem = function (index) {
    $scope.product = index;
    $scope.formData.item_id = $scope.selectItems[$scope.product].id;
    $scope.formData.variant_id = $scope.sampleData.id; 
  };
  
	// Submit Form
  $scope.buyItem = function() {
    //Test to see that formData has been passed to fields and log value
    console.log("Sending item_id: " + $scope.formData.item_id + " and variant_id: " + $scope.formData.variant_id);

    //Continue with request...will fail since there's no /buy url and Cross origin requests are only supported for HTTP, this is running locally.
    $http({
      method  : 'POST',
      url     : '/buy',
      data    : $scope.formData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded;' }
    })
    .success(function(data) {
    	console.log(data); // Do something when complete.
    });
  };
}

// Turn cents to dollars
app.filter('cents', function() {
	return function(value) {
		return parseInt(value) / 100;
	};
});
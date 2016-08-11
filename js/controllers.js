angular.module('starter.controllers', [])
.controller('BasketCtrl', function($scope, $state, $http, $ionicLoading, Api, $ionicModal) {
	$scope.data = {
		cates : [], 
		pages : [],
		products : [],
		selectedCates : [],
		currProduct : {}, 
		addedProducts : []
	};
	$scope.view = {
		pageNum : 0, 
		isLastPage : false, 
		total : 0, 
		quantity : 1, 
		isReadyCart : false
	};
	
	$ionicLoading.show();
	
	Api.get('products/categories').then(function (response) {
		$scope.data.cates = [];
		for (p in response.data.product_categories) {
			ind = $scope.data.cates.length;
			if (response.data.product_categories[p].parent == 0) {
				$scope.data.cates[ind] = response.data.product_categories[p];
				/*$scope.data.cates[ind].subcates = [];
				for (c in response.data.product_categories) {
					if (response.data.product_categories[c].parent == response.data.product_categories[p].id) {
						$scope.data.cates[ind].subcates[$scope.data.cates[ind].subcates.length] = response.data.product_categories[c];
					}
				}*/
			}
		}
		$ionicLoading.hide();
	});
	Api.get('products').then(function (response) {
		$scope.data.products = response.data.products;
		$scope.view.isReadyCart = true;
		// console.log($scope.data.products)
	});
	
	$scope.nextPage = function () {
		if ($scope.view.pageNum == 0) {
			$scope.data.selectedCates = [];
			for (c in $scope.data.cates) {
				if ($scope.data.cates[c].checked) {
					ind = $scope.data.selectedCates.length;
					$scope.data.selectedCates[ind] = $scope.data.cates[c];
					$scope.data.selectedCates[ind].products = [];
					for (p in $scope.data.products) {
						if ($scope.data.products[p].categories.indexOf($scope.data.cates[c].name) >= 0) {
							$scope.data.selectedCates[ind].products[$scope.data.selectedCates[ind].products.length] = $scope.data.products[p];
						}
					}
				}
			}
		}
		if ($scope.data.selectedCates.length == 0) {
			alert('Please check one or more categories.');
		}
		if ($scope.view.pageNum == $scope.data.selectedCates.length) {
			$scope.view.isLastPage = true;
		} else {
			$scope.view.pageNum ++;
			$scope.view.isLastPage = false;
		}
	};
	
	$scope.shopping = function () {
		$state.go('app.delivery');
		$scope.view.pageNum = 0;
	};
	
	$scope.addToCart = function () {
		$scope.currProduct.quantity = $scope.view.quantity;
		$scope.data.addedProducts[$scope.data.addedProducts.length] = $scope.currProduct;
		$scope.view.quantity = 1;
		$scope.calculateTotal();
		$scope.productModal.hide();
	};
	
	$scope.removeFromCart = function (ind) {
		if (confirm('Are you sure want to remove this from cart?')) {
			$scope.data.addedProducts.splice(ind, 1);
			$scope.calculateTotal();
		}
	};
	
	$scope.calculateTotal = function () {
		total = 0;
		for (a in $scope.data.addedProducts) {
			total += $scope.data.addedProducts[a].price * $scope.data.addedProducts[a].quantity; 
		}
		$scope.view.total = total;
	};
	
	$ionicModal.fromTemplateUrl('templates/productmodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.productModal = modal;
  });
	$scope.showProduct = function (product) {
		$scope.currProduct = product;
		$scope.productModal.show();
	};
	
	$ionicModal.fromTemplateUrl('templates/cartmodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.cartModal = modal;
  });
	$scope.showCart = function () {
		$scope.cartModal.show();
	};
})

.controller('DeliveryCtrl', function($scope, $state) {
	$scope.data = {
		dateval : new Date(),
		stime 	: new Date(),
		etime 	: new Date()
	};
	$scope.goToDashboard = function () {
		$state.go('app.dashboard');
	};
})

.controller('DashboardCtrl', function($scope, $state, $ionicLoading, Api, $ionicModal) {
	$scope.data = {
		orders : [], 
		currOrder : {
			rate : 3.7, 
			feedback : ''
		}
	};
	$ionicLoading.show();
	
	Api.get('orders').then(function (response) {
		// console.log(response)
		$scope.data.orders = response.data.orders;
		$ionicLoading.hide();
	});
	
	/* Api.get('customers/email/kostov.kgstar@yandex.com').then(function (response) {
		console.log(response);
	}); */
	
	$ionicModal.fromTemplateUrl('templates/ratemodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.rateModal = modal;
  });
	$scope.showRate = function () {
		$scope.rateModal.show();
	};
	
	$scope.newOrder = function () {
		if (confirm('Are you sure want to order?')) {
			$state.go('app.basket');
		}
	};
	$scope.sendFeedback = function () {
		alert('Rate : ' + $scope.data.currOrder.rate + ', Feedback : ' + $scope.data.currOrder.feedback);
	};
})

.controller('MyordersCtrl', function($scope, $ionicLoading, Api) {
	$scope.data = {
		orders : []
	};
	$ionicLoading.show();
	Api.get('orders').then(function (response) {
		// console.log(response)
		$scope.data.orders = response.data.orders;
		$ionicLoading.hide();
	});
})

.controller('SettingsCtrl', function($scope) {
	
})

.controller('LoginCtrl', function($scope, $state) {
	$scope.data = {
		email : '', 
		password : ''
	};

	$scope.login = function() {
    if ($scope.validAll()) {
    		console.log($scope.data);
			if ($scope.data.email == 'aaa@aaa') {
				if ($scope.data.password == 'bbbb') {
					$scope.data.email = ''; 
					$scope.data.password = '';
					$state.go('app.basket');
				} else {
					alert('Password is wrong.');
				}
			} else {
				alert('Email is not valid');
			}
		}
  };
	
	$scope.validAll = function () {
		dataform = $scope.$$childHead.dataform;
		if (dataform.email.$error.required || dataform.email.$error.email) {
			return false;
		}
		if (dataform.password.$error.required || dataform.password.$error.minlength) {
			return false;
		}
		return true;
	};
	
	$scope.goToRegister = function() {
		$state.go('register');
	};
})

.controller('RegisterCtrl', function($scope, $state) {
	$scope.data = {
		firstname : '', 
		lastname 	: '', 
		email 		: '', 
		username 	: '', 
		password 	: '',
		password1	: ''
	};
	$scope.view = {
		mismatched : false
	};
	$scope.register = function() {
		if ($scope.validAll()) {
			alert('success!');
			$scope.goToLogin();
		}
	};
	$scope.$watch('data.password', function () {
		$scope.view.mismatched = false;
	});
	$scope.$watch('data.password1', function () {
		$scope.view.mismatched = false;
	});
	$scope.validAll = function () {
		dataform = $scope.$$childHead.dataform;
		
		if ($scope.data.password != $scope.data.password1) {
			$scope.view.mismatched = true;
			return false;
		}
		if (dataform.firstname.$error.required || dataform.firstname.$error.minlength) {
			return false;
		}
		if (dataform.email.$error.required || dataform.email.$error.email) {
			return false;
		}
		if (dataform.password.$error.required || dataform.password.$error.minlength) {
			return false;
		}
		return true;
	};
	
	$scope.goToLogin = function() {
		$state.go('login');
	};
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
	$scope.logOut = function () {
		if (confirm('Are you sure want to log out?')) {
			$state.go('login');
		}
	};
})


;
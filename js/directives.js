app.directive('feedback', function () {
	return {
		restrict : 'E',
		scope: {
			ngModel	: '=',
			width		: '=',
			height	: '=', 
			color		: '='
		},
		template:
			'<div class="feedback" style="position: relative; cursor: pointer;">' +
				'<div style="background-color: #ffba00; width: {{width}}px; height: 20px; position: absolute;"></div>' + 
				'<div style="width: 100px; height: 20px; position: absolute;">' + 
					'<img src="../img/feedback/starmask.png" style="width: 100%; height: 100%;"/>' +
				'</div>' + 
//				'<div style="width: 100px; height: 20px; position: absolute; text-align: center; color: gray; font-weight: bold;">{{ngModel}}</div>' + 
			'</div>',

		controller: function($scope)  {
			$scope.$watch('ngModel', function () {
				$scope.width = $scope.ngModel * 20;
			});
		}
	};
});
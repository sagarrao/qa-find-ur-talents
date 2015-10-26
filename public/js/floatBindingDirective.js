app.directive('float_binding', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
        },                
        link: function (scope, element, attrs, ngModelCtrl) {
           if (scope.model && typeof scope.model == 'string') {
               scope.model = parseFloat(scope.model);
           } 
           scope.$watch('model', function(val, old) {
               if (typeof val == 'string') {
                   scope.model = parseFloat(val);
               }
           });                 
        }
    };
});
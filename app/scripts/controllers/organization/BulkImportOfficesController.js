(function (module) {
    mifosX.controllers = _.extend(module, {
        BulkImportOfficesController: function (scope, resourceFactory, location, API_VERSION, $rootScope, Upload) {
        	
        	scope.first = {};
        	scope.first.templateUrl =  API_VERSION + '/offices/bulkimporttemplate' + '?tenantIdentifier=' + $rootScope.tenantIdentifier
        	+ '&locale=' + scope.optlang.code + '&dateFormat=' + scope.df;;
             
        	scope.formData = {};
        	 scope.onFileSelect = function (files) {
                 scope.formData.file = files[0];
             };
          
         
             scope.upload = function () {
                 Upload.upload({
                     url: $rootScope.hostUrl + API_VERSION + '/offices/bulkuploadtemplate',
                     data: {file: scope.formData.file},
                 }).then(function (data) {
                         // to fix IE not refreshing the model
                         if (!scope.$$phase) {
                             scope.$apply();
                         }
                     });
             };
        }
    });
    mifosX.ng.application.controller('BulkImportOfficesController', ['$scope', 'ResourceFactory', '$location', 'API_VERSION', '$rootScope', 'Upload', mifosX.controllers.BulkImportOfficesController]).run(function ($log) {
        $log.info("BulkImportOfficesController initialized");
    });
}(mifosX.controllers || {}));
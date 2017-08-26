(function (module) {
    mifosX.controllers = _.extend(module, {
    	BulkImportClientsController: function (scope, resourceFactory, location, API_VERSION, $rootScope, Upload) {
        	
        	scope.first = {};
        	scope.first.templateUrl =  API_VERSION + '/clients/bulkimporttemplate' + '?tenantIdentifier=' + $rootScope.tenantIdentifier 
        	+ '&locale=' + scope.optlang.code + '&dateFormat=' + scope.df;
        	scope.formData = {};
        	var requestParams = {staffInSelectedOfficeOnly:true};
        	
        	resourceFactory.clientTemplateResource.get(requestParams, function (data) {
                scope.offices = data.officeOptions;
                scope.staffs = data.staffOptions;
        	});
        	
        	scope.first.queryParams = '&'; 
        	scope.changeOffice = function () {
        		if(scope.formData.officeId) {
                resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly:true, officeId: scope.formData.officeId
                }, function (data) {
                    scope.staffs = data.staffOptions;
                });
                scope.first.queryParams = '&officeId=' + scope.formData.officeId + '&';
        		} else {
        			scope.first.queryParams ='&';
        		}
                
            };
            
        scope.changeStaff = function() {
        		if(scope.formData.staffId) {
        			scope.first.queryParams = scope.first.queryParams + 'staffId=' + scope.formData.staffId;
        		} else {
        			if(scope.formData.officeId)
        				scope.first.queryParams = '&' + 'officeId=' + scope.formData.officeId + '&';
        			else
        				scope.first.queryParams = '&';
        		}
        };
        	
        	 scope.onFileSelect = function (files) {
                 scope.formData.file = files[0];
             };
          
         
             scope.upload = function () {
                 Upload.upload({
                     url: $rootScope.hostUrl + API_VERSION + '/clients/bulkuploadtemplate',
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
    mifosX.ng.application.controller('BulkImportClientsController', ['$scope', 'ResourceFactory', '$location', 'API_VERSION', '$rootScope', 'Upload', mifosX.controllers.BulkImportClientsController]).run(function ($log) {
        $log.info("BulkImportClientsController initialized");
    });
}(mifosX.controllers || {}));
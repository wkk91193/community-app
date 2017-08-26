(function (module) {
    mifosX.directives = _.extend(module, {
        ValidateDateDirective: function ($filter, $locale) {
            return {
                link: function (scope, elm, attrs) {
                    elm.bind('submit', function () {
                        var reqFirstDate = dateFilter(scope.date.first, scope.df);
                        var reqSecondDate = dateFilter(scope.date.second, scope.df);
                        var reqThirdDate = dateFilter(scope.date.third, scope.df);
                        var now= scope.minDat = new Date();
                        scope.invalid = false;
                        console.log("From Date valid :", (new Date(reqFirstDate) >= new Date(now)));
                        console.log("To Date valid: ", (new Date(reqSecondDate) >= new Date(now)));
                        console.log("Rescheduled To valid :", (new Date(reqThirdDate) >= new Date(now)));
                        console.log("Final condition: ", (new Date(reqFirstDate) >= new Date(now) && new Date(reqSecondDate) >= new Date(now) && new Date(reqThirdDate) >= new Date(now)));
                        //check if given dates are either present day or future days
                        if (new Date(reqFirstDate) >= new Date(now) && new Date(reqSecondDate) >= new Date(now) && new Date(reqThirdDate) >= new Date(now)) {                  
                            var newholiday = new Object();
                            newholiday.locale = scope.optlang.code;
                            newholiday.dateFormat = scope.df;
                            newholiday.name = this.formData.name;
                            newholiday.fromDate = reqFirstDate;
                            newholiday.toDate = reqSecondDate;
                            newholiday.repaymentsRescheduledTo = reqThirdDate;
                            newholiday.description = this.formData.description;
                            newholiday.offices = [];
                            for (var i in holidayOfficeIdArray) {
                                var temp = new Object();
                                temp.officeId = holidayOfficeIdArray[i];
                                newholiday.offices.push(temp);
                            }
                            resourceFactory.holValueResource.save(newholiday, function (data) {
                                location.path('/holidays');
                            });
                            //Validation: past day is given
                        } else {
                            scope.invalid = true;
                        }            
                    });
                }
            }
        }
    });
}(mifosX.directives || {}));
mifosX.ng.application.directive("validateDate", ['$filter', '$locale', mifosX.directives.ValidateDateDirective]).run(function ($log) {
    $log.info(" ValidateDateDirective initialized");
});
(function (module) {
    mifosX.directives = _.extend(module, {
        ValidateHolidayDirective: function ($compile) {
            return {
                link: function (scope, elm, attr, ctrl) {
                    elm.bind('submit', function () {

                    });                  
                }
            };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("validateHoliday", ['$compile', mifosX.directives.ValidateHolidayDirective]).run(function ($log) {
    $log.info("ValidateHolidayDirective initialized");
});
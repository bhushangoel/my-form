/*
 $scope.formOptions = {
 formName: 'signupForm',
 template: '',     //user defined template url | optional | this will override templateFrameWork option,
 templateFrameWork: 'bootstrap3',    //bootstrap, material, foundation etc | default will be bootstrap
 clickFunction: 'submitSignup',
 fields: [
 {
 name: 'First Name',
 alias: 'name',  //ng-model value so it is required
 type: 'text',   //allowed: text | textarea | checkbox | radio | select
 placeholder: 'Enter your first name',
 validations: {
 required: true,
 pattern: '',
 min: '',
 max: ''
 },
 expressionProperties: {
 disabled: 'remember'
 }
 },
 {
 name: 'Description',
 alias: 'description',
 type: 'textarea',
 validations: {
 required: true
 }
 },
 {
 name: 'Remember Me',
 alias: 'remember',
 type: 'checkbox'
 }
 ]
 }

 <form name="{{formOptions.formName}}" class="form-horizontal" novalidate>
 <my-form novalidate form-name="signupForm" form-options="{{formOptions}}"></my-form>
 </form>
 */


"use strict";

var myFormModule = angular.module("myFormModule", []);

myFormModule.directive("myForm", ['$compile', '$http', function ($compile, $http) {
    return {
        controller: 'validateController',
        link: function (scope, element, attrs) {
            var attr = JSON.parse(attrs.formOptions);
            var template = attr.template ? attr.template : 'js/vendor/templates/myform.html';
            scope.templateframeWork = attr.templateFrameWork ? attr.templateFrameWork : 'bootstrap3';
            scope.formOptions = attr;

            $http.get(template)
                .success(function (result) {
                    element.html(result).show();
                    $compile(element.contents())(scope);
                });
        }
    }
}]);

myFormModule.directive("msField", ['$compile', function ($compile) {

    var textTemplate = '<input type="text" name="{{}}" class="form-control" id="{{option.alias}}" ng-model="formData[option.alias]">';
    var textAreaTemplate = '<textarea type="text" class="form-control" id="{{option.alias}}" ng-model="formData[option.alias]"></textarea>';
    var datePickerTemplate = '<input type="text" class="form-control" id="{{option.alias}}" uib-datepicker-popup ng-model="formData[option.alias]" is-open="date.opened" ng-focus="date.opened=true">';
    var timePickerTemplate = '<uib-timepicker ng-model="formData[option.alias]" hour-step="1" minute-step="10" show-meridian="true "></uib-timepicker>';
    var radioTemplate = '<div class="col-sm-10"><label class="radio-inline" ng-repeat="choice in option.choices"> <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="{{choice}}" ng-model="formData[option.alias]"> {{choice}} </div>';
    var uploadTemplate = '<div class="col-sm-10"><input id="input-upload-img1" type="file" class="file" accept="image/*" ngf-max-size="1MB"ngf-select ng-model="formData[option.alias]" data-preview-file-type="text" ></div>';

    function getTemplate(type) {
        var template = '';
        switch (type) {
            case 'text':
                template = textTemplate;
                break;
            case 'textarea':
                template = textAreaTemplate;
                break;
            case 'datepicker':
                template = datePickerTemplate;
                break;
            case 'timepicker':
                template = timePickerTemplate;
                break;
            case 'radio':
                template = radioTemplate;
                break;
            case 'upload':
                template = uploadTemplate;
        }
        return template;
    }

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            var fieldType = attrs.fieldType;
            var el = $compile("<div my-form-" + fieldType + "=\"\" ></div>")(scope);
            element.html("").append(el);
        }
    }
}]);

myFormModule.directive("myFormText", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<input type="text" name="{{field.alias}}" id="{{field.alias}}" class="form-control" id="{{field.alias}}" ng-model="formData[field.alias]" ng-required="field.validations.required" ng-blur="validateField(field.alias)"/>'
    }
}]);

myFormModule.directive("myFormTextarea", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<textarea type="text" name="{{field.alias}}" id="{{field.alias}}" class="form-control" id="{{field.alias}}" ng-model="formData[field.alias]" ng-required="field.validations.required" ng-blur="validateField(field.alias)"></textarea>'
    }
}]);

myFormModule.directive("myFormCheckbox", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<input type="checkbox" name="{{field.alias}}" id="{{field.alias}}" id="{{field.alias}}" ng-model="formData[field.alias]" ng-required="field.validations.required" ng-blur="validateField(field.alias)"/>'
    }
}]);

myFormModule.controller('validateController', ['$scope', function ($scope) {
    $scope.errorMsg = {};
    $scope.validateField = function (alias) {
        angular.forEach($scope.formOptions.fields, function (field) {
            if (field.alias == alias) {
                var validations = field.validations;
                if (validations) {
                    if (!$scope.formData[alias]) {
                        if (validations.required) {
                            $scope['errorMsg'][alias] = 'Required Field';
                        }
                    }
                    else {
                        if (validations.pattern) {
                            //check regex pattern
                        }
                        else if (validations.min || validations.max) {
                            //check min max
                        }
                        else {
                            delete $scope.errorMsg[alias];
                        }
                    }
                }
            }
        })
    };

    $scope.evaluateExpression = function () {

    };

    $scope.getData = function (field) {
        return $scope.errorMsg[field];
    };

    $scope.submitForm = function () {
        var formSubmit = $scope[$scope.formOptions.clickFunction];
        checkValidation(function () {
            formSubmit();
        });

        function checkValidation(cb) {
            $scope.formError = {};
            var formOk = true;
            angular.forEach($scope.formOptions.fields, function (field) {
                $scope.formError[field.alias] = field.validations;
            });

            for (var key in $scope.formError) {
                if (formOk) {
                    if (!$scope.formData[key]) {
                        if ($scope.formError[key] && $scope.formError[key].required) {
                            $scope[$scope.formOptions.formName].$invalid = true;
                            formOk = false;
                            cb();
                        }
                    }
                    else {
                        if ($scope.formError[key].pattern) {
                            //check regex pattern
                            formOk = false;
                        }
                        else if ($scope.formError[key].min || $scope.formError[key].max) {
                            //check min max
                            formOk = false;
                        }
                        else {
                            $scope[$scope.formOptions.formName].$invalid = false;
                            cb();
                        }
                    }
                }
                else {
                    cb();
                }
            }
        }
    }
}]);
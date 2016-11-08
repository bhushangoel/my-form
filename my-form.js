//dummy data

/*<form name="{{formOptions.formName}}" novalidate ng-if="!showMessage">
 <my-form novalidate form-name="signupForm" form-options="{{formOptions}}"></my-form>
 </form>*/
/*$scope.formOptions = {
 formName: 'snowForum',
 template: '<div class="form-group" ng-repeat="field in formOptions.fields">' +
 ' <ms-field field-type="{{field.type}}"></ms-field>' +
 ' <p style="color: #B94A48">{{getData(field.alias)}}</p>' +
 ' </div>' +
 '<button type="button" class="btn btn-primary" ng-click="submitForm()">Enquire Now</button>',
 clickFunction: 'submit',
 fields: [
 {
 name: 'Name',
 alias: 'name',  //ng-model value so it is required
 type: 'text',   //allowed: text | textarea | checkbox | radio | select
 placeholder: 'Enter your name',
 customClass: '',
 validations: {
 required: true
 }
 },
 {
 name: 'Email',
 alias: 'email',
 type: 'text',
 placeholder: 'Enter Email Id',
 customClass: '',
 validations: {
 required: true,
 pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'
 }
 },
 {
 name: 'Title',
 alias: 'title',
 type: 'text',
 placeholder: 'Enter title',
 validations: {
 required: true
 }
 },
 {
 name: 'Description',
 alias: 'description',
 type: 'textarea',
 validations: {
 required: true
 }
 }
 ]
 };*/


/*
 <div class="form-group" ng-repeat="field in formOptions.fields">
 <div class="form-group name">
 <label for="{{field.alias}}">{{field.name}}</label>
 <ms-field field-type="{{field.type}}"></ms-field>
 <p style="color: #B94A48">{{getData(field.alias)}}</p>
 </div>
 </div>
 <button type="submit" class="btn btn-theme" ng-click="submitForm()">Send message</button>
 */
/*$scope.formOptions = {
 formName: 'contactForm',
 templateUrl: '../../html/contactForm.html',     //user defined template url | optional | this will override templateFrameWork option,
 template: '',
 templateFrameWork: 'bootstrap3',    //bootstrap, material, foundation etc | default will be bootstrap
 clickFunction: 'send',
 fields: [
 {
 name: 'Name',
 alias: 'name',  //ng-model value so it is required
 type: 'text',   //allowed: text | textarea | checkbox | radio | select
 placeholder: 'Enter your name',
 customClass: '',
 validations: {
 required: true
 }
 },
 {
 name: 'Email',
 alias: 'email',
 type: 'text',
 placeholder: 'Enter Email Id',
 customClass: '',
 validations: {
 required: true,
 pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'
 }
 },
 {
 name: 'Country',
 alias: 'country',
 type: 'select',
 records: {
 data: $scope.countries,
 key: 'country_name',
 name: 'country_name'
 },
 customClass: '',
 validations: {
 required: true
 }
 },
 {
 name: 'Phone',
 alias: 'phone',  //ng-model value so it is required
 type: 'text',   //allowed: text | textarea | checkbox | radio | select
 placeholder: 'Enter your phone number',
 customClass: '',
 validations: {
 required: true,
 pattern: '^[0-9]{1,10}$'
 }
 },
 {
 name: 'Category',
 alias: 'category',
 type: 'select',
 records: {
 data: [{name: 'Fresher', value: 'fresher'}, {name: 'IT', value: 'it'}, {
 name: 'Professional',
 value: 'professional'
 }],
 key: 'value',
 name: 'name'
 },
 customClass: '',
 validations: {
 required: true
 }
 },
 {
 name: 'Message',
 alias: 'message',
 type: 'textarea',
 validations: {
 required: true
 }
 }
 ]
 };*/

"use strict";

var myFormModule = angular.module("myFormModule", []);

myFormModule.directive("myForm", ['$compile', '$http', function ($compile, $http) {
    return {
        controller: 'validateController',
        link: function (scope, element, attrs) {
            attrs.$observe('formOptions', function (formOptions) {
                if (formOptions) {
                    var attr = JSON.parse(formOptions);
                    var template = attr.template ? attr.template : '<div class="form-group" ng-repeat="field in formOptions.fields"> <label for="{{field.alias}}" class="col-sm-2 control-label">{{field.name}}<span ng-if="option.required">*</span> </label> <div class="col-sm-10"> <ms-field field-type="{{field.type}}"></ms-field> <p style="color: #B94A48">{{getData(field.alias)}}</p> </div> </div> <button type="submit" class="btn btn-block" ng-click="submitForm()">Submit</button>';
                    scope.templateframeWork = attr.templateFrameWork ? attr.templateFrameWork : 'bootstrap3';
                    scope.formOptions = attr;

                    if (attr.templateUrl) {
                        $http.get(template)
                            .success(function (result) {
                                element.html(result).show();
                                $compile(element.contents())(scope);
                            });
                    }
                    else {
                        element.html(template).show();
                        $compile(element.contents())(scope);
                    }
                }
            });
        }
    }
}]);

myFormModule.directive("msField", ['$compile', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            var fieldType = attrs.fieldType;
            var el = $compile("<div class='{{attrs.customClass}}' my-form-" + fieldType + "=\"\" ></div>")(scope);
            element.html("").append(el);
        }
    }
}]);

myFormModule.directive("myFormText", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<input type="text" name="{{field.alias}}" id="{{field.alias}}" class="form-control" ng-model="formData[field.alias]" placeholder="{{field.placeholder}}" ng-blur="validateField(field.alias)"/>'
    }
}]);

myFormModule.directive("myFormTextarea", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<textarea type="text" name="{{field.alias}}" id="{{field.alias}}" class="form-control" ng-model="formData[field.alias]" placeholder="{{field.placeholder}}" ng-blur="validateField(field.alias)"></textarea>'
    }
}]);

myFormModule.directive("myFormCheckbox", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<input type="checkbox" name="{{field.alias}}" id="{{field.alias}}" ng-model="formData[field.alias]" placeholder="{{field.placeholder}}" ng-blur="validateField(field.alias)"/>'
    }
}]);

myFormModule.directive("myFormSelect", [function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<select class="form-control" name="{{field.alias}}" id="{{field.alias}}" ng-model="formData[field.alias]"> <option value="">Select Option</option><option ng-repeat="record in field.records.data" value="record[field.records.key]">{{record[field.records.name]}}</option> </select>'
    }
}]);

myFormModule.controller('validateController', ['$scope', function ($scope) {
    if (!$scope.formData) {
        $scope.formData = {};
    }
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
                            var patt = new RegExp(validations.pattern);
                            var test = patt.test($scope.formData[alias]);
                            if (!test) {
                                $scope['errorMsg'][alias] = 'Invalid Value';
                            }
                        }
                        else if (validations.min || validations.max) {
                            //check min max
                            var value = $scope.formData[alias];
                            if (value < validations.min || value > validations.max) {
                                $scope['errorMsg'][alias] = 'Invalid Value';
                            }
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
            $scope.errorMsg = {};
            var formOk = false;
            angular.forEach($scope.formOptions.fields, function (field) {
                $scope.formError[field.alias] = field.validations;
            });

            for (var key in $scope.formError) {
                if (!$scope.formData[key]) {
                    if ($scope.formError[key] && $scope.formError[key].required) {
                        $scope[$scope.formOptions.formName].$invalid = true;
                        $scope['errorMsg'][key] = 'Required Field';
                        formOk = false;
                    }
                }
                else {
                    if ($scope.formError[key].pattern) {
                        //check regex pattern
                        var patt = new RegExp($scope.formError[key].pattern);
                        var test = patt.test($scope.formData[key]);
                        if (test) {
                            formOk = true;
                        }
                        else {
                            $scope['errorMsg'][key] = 'Invalid Value';
                            formOk = false;
                        }
                    }
                    else if ($scope.formError[key].min || $scope.formError[key].max) {
                        //check min max
                        var value = $scope.formData[key];
                        if (value < $scope.formError[key].min || value > $scope.formError[key].max) {
                            $scope['errorMsg'][key] = 'Invalid Value';
                            formOk = false;
                        }
                        else {
                            formOk = true;
                        }
                    }
                    else {
                        $scope[$scope.formOptions.formName].$invalid = false;
                        formOk = true;
                    }
                }
            }

            if (formOk) {
                cb();
            }
        }
    }
}]);




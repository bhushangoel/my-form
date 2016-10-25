/*
 $scope.formOptions = {
 formName: 'signupForm',
 template: '',     //user defined template url | optional | this will override templateFrameWork option,
 templateFrameWork: 'bootstrap3',    //bootstrap, material, foundation etc
 fields: [
 {
 name: 'First Name',
 alias: 'name',  //ng-model value so it is required
 type: 'text',
 validations: {
 required: true,
 pattern: '',
 min: '',
 max: ''
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
 }

 <my-form novalidate form-name="signupForm" form-options="{{formOptions}}"></my-form>
 */


"use strict";

var myFormModule = angular.module("myFormModule", []);

myFormModule.directive("myForm", ['$compile', '$http', function ($compile, $http) {
    return {
        link: function (scope, element, attrs) {
            var attr = JSON.parse(attrs.formOptions);
            var template = attr.template ? attr.template : 'js/vendor/templates/myform.html';
            scope.templateframeWork = attr.templateFrameWork ? attr.templateFrameWork : 'bootstrap3';
            scope.formOptions = attr;

            $http.get(template)
                .success(function (result) {
                    console.log('result: ', result, scope);
                    element.html(result).show();
                    $compile(element.contents())(scope);
                });
        }
    }
}]);

myFormModule.directive("msField", ['$compile', function ($compile) {

    var textTemplate = '<input type="text" name="{{}}" class="form-control" id="{{option.alias}}" ng-model="formData[option.alias]" ng-change="createAlias()">';
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

            element.html(getTemplate(fieldType)).show();
            $compile(element.contents())(scope);
        }
    }
}]);
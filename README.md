# my-form
my-form is a library to create forms dynamically for angularJs using JSON data.

### Installation

- via npm

```sh
$ npm install my-form
```

and then add script tag in your HTML file

```sh
<script type="text/javascript" src="/node_modules/myform/myform.js"></script>
```
or require the same in your module.

- You can also download the file [from here](https://www.google.com) and add it your project manually.

### Usage

Add this to your template
```sh
<form name="{{formOptions.formName}}" novalidate ng-if="!showMessage">
    <my-form form-options="{{formOptions}}"></my-form>
</form>
```

You need to create a JSON object called **$scope.formOptions** for the form you want to create using my-form.

JSON object
```sh
$scope.formOptions = {
    formName: 'myForum',
    template: '<div class="form-group" ng-repeat="field in formOptions.fields">' +
    ' <ms-field field-type="{{field.type}}"></ms-field>' +
    ' <p>{{getData(field.alias)}}</p>' +
    ' </div>' +
    '<button type="button" class="btn btn-primary" ng-click="submitForm()">Submit </button>',
    templateUrl: '../../html/myForm.html',
    clickFunction: 'submit',
    fields: [
        {
            name: 'Name',
            alias: 'name',  //ng-model value so it is required
            type: 'text',   //allowed: text | textarea | checkbox | select
            placeholder: 'Enter your name',
            validations: {
                required: true
            }
        },
        {
            name: 'Email',
            alias: 'email',
            type: 'text',
            placeholder: 'Enter Email Id',
            validations: {
                required: true,
                pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'
            }
        },
        {
            name: 'Age',
            alias: 'age',
            type: 'text',
            placeholder: 'Enter age',
            validations: {
                required: true,
                min: '10',
                max: '50'
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
            validations: {
                required: true
            }
        },
        {
             name: 'Category',
             alias: 'category',
             type: 'select',
             records: {
                data: [
                        {name: 'Fresher', value: 'fresher'}, 
                        {name: 'IT', value: 'it'}, 
                        {name: 'Professional', value: 'professional' }
                    ],
                    key: 'value',
                    name: 'name'
                },
                validations: {
                    required: true
                }
         }
    ]
};
```
FIELDS EXPLAINATION

```sh
formName                        name of the form                    required
template                        custom template for form            optional
templateUrl                     custom template url                 optional
clickFunction                   function to be execute on submit    required
fields                          array of fields                     required
fields[0].name                  name of field                       required
fields[0].alias                 model value of field                required
fields[0].type                  field type                          required (text, textarea, checkbox, select)               
fields[0].records.data          data for dropdown                   required if type is select                                 
fields[0].records.key           model value for select              required
fields[0].records.name          display name for select             required
fields[0].placeholder           placeholder                         optional
fields[0].validations           validations                         optional (required, pattern, min, max)                      
```

Sample custom template HTML 

```sh
<div class="form-group" ng-repeat="field in formOptions.fields">
    <div class="form-group name">
        <label for="{{field.alias}}">{{field.name}}</label>
        <ms-field field-type="{{field.type}}"></ms-field>
        <p>{{getData(field.alias)}}</p>
    </div>
 </div>
 <button type="submit" class="btn btn-theme" ng-click="submitForm()">Send message</button>
 ```

### Report issues or submit feedback
Any Feedback or issue is welcomed :)

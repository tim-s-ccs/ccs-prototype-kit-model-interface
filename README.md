# CCS Prototype Kit Model Interface
The [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit) is designed to allow for the rapid development of prototypes which can then be used to get feedback on new designs.
One of the limitations of this kit is that it is quite simple and if you want to do things like validations or work with data, it is not simple to do.
This project, inspired by Ruby on Rails, is designed to work with the GOV.UK Prototype Kit to create an interface which will allow users to better work with data.
Although it is written in TypeScript, this project can, of course, be used in a JavaScript projects as well.

## Project status
The project is still in an Alpha phase.
There are still some features that have not been fully developed and there is still some work to do on Type safety.
An example implementation of the project can be found in [Facilities Management RM6232 Prototype](https://github.com/tim-s-ccs/facilities-management-RM6232-prototype).

## How to install
This package is meant to be used as part of either of the following projects:
- [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit)
- [CCS Prototype Kit](https://github.com/Crown-Commercial-Service/ccs-prototype-kit)
It is not designed to work with anything else, and certainly not designed to be used in any kind of production setting.

You can install the package by adding `ccs-prototype-kit-model-interface` to your `packag.json` are by running:
```
npm install ccs-prototype-kit-model-interface
```
You then need to add `ccsModelInterfaceConfig.config` file into your project directory.
The file should then look like:
```
{
  "activeDataSchemaPath": "dist/app/data/activeDataSchema",
  "staticDataPath": "dist/app/data/staticData"
}
```
The significant of these files is explained in the [Data Interface](#data-interface) section.

## Documentation
As previously stated, this project was inspired by Ruby on Rails, so the most important concept to understand is Models.
A `Model` is the object we use to represent tables in the database.
In this project there are two types of Models which are `ActiveModel` and `StaticModel`.

**NOTE:** *This package is still in development so some parts are not fully finished and other parts are still TODO*

### ActiveModel
An `ActiveModel` is designed to be used with data that can added, updated, deleted etc.
Essentially, it should be used with models where the data can change.
How we are able to change the data is explained in the [Data Interface](#data-interface) section.

An `ActiveModel` contains the following attributes:
- `data` - The attributes, i.e. the table columns, for the `ActiveModel`
- `tableName` - The name of the table in the pseudo database
- `modelSchema` - This contains the Type constructors for each attribute in the model
- `validationSchema` - This contains the validations for each attribute (discussed in the [Validations](#validations) section)
- `errors` - The errors for the `ActiveModel` (an empty object by default)

The `ActiveModel` class contains several static methods which are mainly used to find some or all the tables in the database.
Most of these methods start with an underscore (e.g. `_find`) and are `protected`.
If this is the case, then when you create Class that extends the `ActiveModel` class, then you need cast what the method returns to this Child class.
An example of this is shown in the explanation of [_find](#find) in the next section.
To be honest, the reason this is required is because I've not yet worked out of keeping Type safety for the child class when it calls the method.

#### Static methods
##### _find
This method uses the `getActiveRow` method, discussed in the [Data Interface](#data-interface) section.
This method takes the Request object, the table name and the ID of the row we want to find the data for.
It will return the row of the table if it can find an entry with the ID, otherwise it will raise `RowNotFoundError`.
If data is found, it can be used to then initialise the `Model`.

An example of how this method might be used in implementation of `ActiveModel` is shown below.
```
class Foo extends ActiveModel implements FooInterface {
  ...
  static find = (req: Request, id: number): Foo => {
    return new this(this._find(req, this.tableName, id) as FooRow, req)
  }
  ...
}
```
As can be seen, `_find` returns the row data which can then be used to initialise a new instance of the `Foo` class.

##### _all
This is fairly self-explanatory.
By calling this method, you will get all the rows of the table in an array.

##### _where
This method allows to get the rows from a table which meet certain conditions.
A `Condition` contains an attribute and one of the following options:
- `value` a specific value we want that attribute to have
- `values` an array of values, any of which we want the attribute to have
- `contents` when the attribute is an array, the contents are an array of values we want the attribute array to contain

As an example, the table `foo` has the following data:
```
const foos: Array<FooRow> = [
  { id: 1, name: 'Foo 1', code: 1, items: [1, 2, 3, 4, 5] },
  { id: 2, name: 'Foo 2', code: 2, items: [2, 3, 4, 5, 6] },
  { id: 3, name: 'Foo 3', code: 3, items: [3, 4, 5, 6, 7] },
  { id: 4, name: 'Foo 4', code: 2, items: [4, 5, 6, 7, 8] },
  { id: 5, name: 'Foo 5', code: 1, items: [5, 6, 7, 8, 9] },
]
```

We can then use `where` with the conditions as follows:
```
Foo.where([{ attribute: 'code', values: [1, 2] }, { attribute: 'items', values: [5, 6] }])
```
which returns:
```
[
  { id: 1, name: 'Foo 1', code: 1, items: [1, 2, 3, 4, 5] },
  { id: 4, name: 'Foo 4', code: 2, items: [4, 5, 6, 7, 8] },
  { id: 5, name: 'Foo 5', code: 1, items: [5, 6, 7, 8, 9] }
]
```

##### count
This is an extension of the `_where` method and simply gets the length of the array that is returned.
I decided to add this as I found, when using this package in another project, that it was often useful just to return how many entries met the conditions rather than returning the full array of objects.

##### nextID
This is needed when creating a new entry into the database.
This method will get a list of IDs for all the rows in the table, find the max and add 1 to get a new ID.
If there are no rows in the table then it will just return 1 as the first ID.

### Validation
The main inspiration for creating this package was to create a way of doing validations.
When creating a government service, error messages are very important, so I wanted to create a way we could do validations in a straight forward way (if I've been successful in this, that's for you to decide).

#### Validator
There are three types of validators:
 - `InputValidator` - Abstract class which allows for the validation of an input. Several implimentations of this class are provided and they are:
    - `inclusionValidator` - validates that an input is in an array of accepted values
    - `lengthValidator` - validates the length of an array input
    - `numberValidator` - numeric validations on an input, the options can be seen in the `NumberValidatorOptions`
    - `stringValidator` - string validations on an input, the options can be seen in the `StringValidatorOptions`
 - `StaticModelValidator` - Makes sure the ID for `StaticModel` is present
 - `CustomValidator` - Abstract class which allows for the user to make their own validations of the `InputValidators` are not sufficient.

All validators extend the abstract class `Validator` abstract class which abstracts away the common parts of the validation.
I think most of the part of the `Validator` are self-explanatory except the `ValidatorOptions`.

##### ValidatorOptions
The `ValidatorOptions` contain important information concerning the specific validation that is going to be run.
All `ValidatorOptions` contain the `on` and `conditions` options, and implimentations of the `Validator` may have additional options.

The `conditons` option is still in development, but the `on` condition contains the calls that the validator should be run on.
For example, if we are building an `ActiveModel`whoch we will call `Car` over a number of pages.
On the first page we may want to add the `make`.
On the next we may want to add the `colour` etc.
If we have the following validation options for the attributes:
```
const makeValidatorOptions: ValidatorOptions = {
  on: ['make']
}

const colourValidatorOptions: ValidatorOptions = {
  on: ['colour']

```

We only need to do the validation for the `make` on that page so we might call the `valid` with `'make'`, the validator will only validate the `make` of the car and will ignore the `colour` validation.

###### validate
The `validate` method is what is used to make validations consistent across on various implementations of the `Validator` class.
It takes in the 'call' as a parameter and then goes through a few steps.

It will first check that the call is within the options and if it is not then will return `true`.
It will then check if the validation has any conditions and if does, it will check that those conditions have been met.
If there are no conditions, or the conditions are all true, it will go to the next step.

This is where the abstract method `_validate` is called.
`_validate` is where the specific validation is implemented.
If the data is not valid, it will return `false` and set the `error` string.
This error and the message are then added to the model and the method returns `false`.
If `_validate` returns `true` then the `validate` will then also return `true` as all the data is valid.

##### How validations are implimented in the ActiveModel
The previous section was a summary of how the validation is implemented in the `Validator` but is important to also understand how validations are implemented within the `ActiveModel`.

One of the attributes of `ActiveModel` is the `validationSchema`.
The `ValidationSchema` is an object which contains the `ValidationScheme` for all the input validations, the static model validations and the custom validations.

All `ValidationScheme` have the following attributes:
- `attribute` - The attribute on which the validations are to be applied
- `options` - These are the validator options, discussed in [ValidatorOptions](#validatoroptions)
- `errorMessages` - An object containing the error messages, depending on what validations fail

For the input and the custom validations, the specific implementation of the `Validator` must also be provided.

<details><summary>An example `ValidationSchema`</summary>
```
const buildingValidationSchema: ValidationSchema = {
  inputValidations: [
    {
      attribute: 'name',
      validator: StringValidator,
      options: nameOptions,
      errorMessages: {
        required: 'Enter a name for your building',
        tooLong: 'Building name must be 50 characters or less'
      }
    },
    ...
  ],
  customValidations: [
    {
      attribute: 'externalArea',
      validator: CombinedAreaValidation,
      options: {
        on: ['area']
      },
      errorMessages: {
        combinedAreaExternal: 'External area must be greater than 0, if the internal area is 0'
      }
      ...
    }
  ],
  staticModelValidations: [
    {
      attribute: 'buildingType',
      options: {
        on: ['building-type']
      },
      errorMessages: {
        required: 'You must select a building type'
      }
    },
    ...
  ]
}
```
</details>

Because all implementations of `Validator` should have the same constructor, even though the implementations differ, they can be initialised and called in the same way.
This is what happens within the `validate` method in the `ActiveModel`.

The `validate` method goes through the `validationSchema` and runs all the validations.
If the `ActiveModel` has any nested `ActiveModels` then they too will be validated and their errors combined with the parent `ActiveModel`.
After all this has happened, the method will return `false` of there are any errors or `true` if there are none.

### Saving
**TODO:** Discuss assigning attributes, saving and creating
### StaticModel
A `StaticModel` is designed to be used with data that cannot be changed.
**TODO:** Discuss briefly the `StaticModel` abstract class

### Data Interface
The [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit) allows for us to use the users session storage to store the users data.
We can than access this data through the `Request` object.

**TODO:** Discuss how this works and more details on the config file

## Future Ideas
Below is list of future ideas I have for this project that I hope to one day implement:
- Add tests to be sure the code works as expected
- Improve data structuring to allow for table relationships
- Improve the documentation
- Abstract more code into the abstract classes (building and the static methods)

## Contributing

This repository is maintained by the tim-s-ccs at the [Crown Commercial Service](https://github.com/Crown-Commercial-Service).

If you have a suggestion for improvement, please raise an issue on this repo.

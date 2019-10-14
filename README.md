# Limestone

## Desc: Generates random restaurant nearby within 10kms radius 
### History
#### V1.0
    * Generates Restaurant name only in jonkoping county 
    * List of all nearby restaurants is setup in a file 
        * Where a random restaurant is choosen
    * Doesnt work outside jonkoping county area
#### V2.0
    * Generates Restaurant name in whole world 
    * Integrated with MapBox
       * Map with search functionality 
        * Places Geocoding api returns nearby restaurants 
            * Radius limit to 10 kms  
        * Markers to show location of user & restaurant corrdinates
    * New Look for larger screen sizes
        * Doesnt Work with Mobile Versions
### WIP
#### V3.0
    * Maps
        * Directions
    * Fully Responsive
    * Google Analytics
    * Ads

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

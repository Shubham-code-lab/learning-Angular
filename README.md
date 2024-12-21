installation and first step

Install the CLI using the npmpackage manager:
npm install -g @angular/cli

create new project
--no-strict to remove typescript type check 
--standalone false so it is not a standalone component
--routing false to not add routing into the project
ng new my-first-project

cd  my-first-project

run this to set port if we already have another ng serve process on that port
--port ANOTHERPORT
ng serve

Uses ahed of time compilation
ng build

ng g s path/serviceName
ng g m path/moduleName
ng g c path/componentName


ng g m module-name --routing

ng g c folder-path-name/component-name --module=module-name
ng g c combination-operators/merge --module=combination-operators


1. @Component
2. @Directive
3. @Injectable
4. @NgModule
5. @Input
6. @Output
7. @ViewChild
8. @ViewChildren
9. @ContentChild
10. @ContentChildren
11. @HostListener
12. @HostBinding
13. @Pipe



////







```
//     configurationForm.get('dateTimeSelectionForm').get(radio)?.reset();
  //     configurationForm.get('dateTimeSelectionForm').get(radio)?.clearValidators();
  //     configurationForm.get('dateTimeSelectionForm').get(radio)?.updateValueAndValidity();
```


```
this.templateForm.markAllAsTouched();
```




FormModule  is required us to use [(ngModel)]

Adding bootstrap :-
In angular.json we have to add this line to add bootstrap styles
```
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
```


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

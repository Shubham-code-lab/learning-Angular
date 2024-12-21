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




///



templateForm = this.fb.group({    templateId: [null],    templateName: ['', Validators.required],    timeSlotConfigurations: this.fb.array([])  });  get timeSlotConfigurations(): FormArray {    return this.templateForm.get('timeSlotConfigurations') as FormArray;  }  addFormToTimeSlotConfigs() {    this.timeSlotConfigurations.push(this.fb.group({      time: this.fb.group({        day: [""],        time: this.fb.group({          startTime: [''],          endTime: ['']        })      }),      conditions: this.fb.array([]),      preferences: this.fb.array([]),      sequenceOfContents: this.fb.array([]),      blacklistContents: this.fb.array([])    }))  };  getConditions(index: number) {    return this.timeSlotConfigurations.at(index).get('conditions') as FormArray;  }  addCondition(index: number) {    this.getConditions(index).push(this.fb.group({      apply: ["ALL"],      filters: this.fb.array([])    }))  }  getFilters(timeSlotIndex: number, conditionsIndex: number) {    return this.getConditions(timeSlotIndex).at(conditionsIndex).get('filters') as FormArray;  }  addFilter(timeSlotIndex: number, conditionsIndex: number) {    this.getFilters(timeSlotIndex, conditionsIndex).push(this.fb.group({      parameter: [''],      operator: [''],      value: ['']    }))    const filtersIndex = this.getFilters(timeSlotIndex, conditionsIndex).length - 1;  }



///



not able to unselect if user select value from the drop down


time picker 

```
<mat-form-field>
                                <mat-label>Start Time</mat-label>
                                <input matInput [formControlName]="'startTime'" class="time-picker" type="time" />
                                <!-- <mat-error *ngIf="configurationtimeSlotForm">Please select start time</mat-error> -->
                            </mat-form-field>
```

```
.time-picker {
    position: relative;
  }
  .time-picker::-webkit-calendar-picker-indicator {
    background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224px%22%20fill%3D%22%23000000%22%3E%3Cg%3E%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath%20d%3D%22M12%2C2C6.5%2C2%2C2%2C6.5%2C2%2C12s4.5%2C10%2C10%2C10s10-4.5%2C10-10S17.5%2C2%2C12%2C2z%20M16.2%2C16.2L11%2C13V7h1.5v5.2l4.5%2C2.7L16.2%2C16.2z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    display: inline-block;
    fill: currentColor;
    height: 20px;
    width: 20px;
  }
  
  :host ::ng-deep .mat-form-field-infix {
    display: flex;
  }
    
:host::ng-deep .mdc-text-field--filled:not(.mdc-text-field--disabled) {
    background-color: transparent;
}
```

git config pull.rebase false

// Inside the child FormGroups
const newConfigurationConditionGroup = this.formBuilder.group({
  parameter: ['', Validators.required],
  operator: ['', Validators.required],
  value: ['', Validators.required],
  name: '23' // Unique identifier
});

const newConfigurationPreferenceGroup = this.formBuilder.group({
  parameter: ['', Validators.required],
  value: ['', Validators.required],
  weightage: [0, Validators.required],
  name: '43' // Unique identifier
});

// Push the child FormGroups into the parent form
this.newFormGroup.get('configurationConditionForm').push(newConfigurationConditionGroup);
this.newFormGroup.get('configurationPreferenceForm').push(newConfigurationPreferenceGroup);

// Push the parent form into the array with a unique identifier
this.timeSlotConfigurationForm.push({
  formGroup: newFormGroup,
  name: `timeSlotConfig-${this.conditionSettings.formCounter}`,
});
this.conditionSettings.formCounter++;




///


```
<mat-radio-group aria-label="Select an option">
                        <mat-radio-button value="1">
                            <span>Repeats every </span>
                            <mat-form-field>
                                <mat-label>Select weekday</mat-label>
                                <mat-select #weekdaySelect>
                                    <mat-option *ngFor="let weekday of weekdays" [value]="weekday">
                                        {{ weekday }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>
                        </mat-radio-button>
                    
                        <mat-radio-button value="2">
                            <span>Repeats </span>
                            <mat-form-field>
                                <mat-label>Select option</mat-label>
                                <mat-select #selectedOptionRef>
                                    <mat-option *ngFor="let option of monthAndWeekOptions" [value]="option">
                                        {{ option }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>
                            <span> starting on the </span>
                            <mat-form-field>
                                <mat-label>Select day</mat-label>
                                <mat-select>
                                    <mat-option *ngFor="let day of (selectedOptionRef.value === 'Month' ? daysOfMothNumbers : (selectedOptionRef.value === 'Week' ? daysOfWeekNumbers : []))" [value]="day">
                                        {{ day }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>
                        </mat-radio-button>
                    
                        <mat-radio-button value="3">
                            <span>Repeats on the </span>
                            <mat-form-field>
                                <mat-label>Select ordinal</mat-label>
                                <mat-select #ordinalSelect>
                                    <mat-option *ngFor="let ordinal of ordinalNumbers" [value]="ordinal">
                                        {{ ordinal }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>
                            <span>
                                <mat-form-field>
                                    <mat-label>Select day</mat-label>
                                    <mat-select #weekendDaySelect>
                                        <mat-option *ngFor="let day of weekendDays" [value]="day">
                                            {{ day }}
                                        </mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </span>
                        </mat-radio-button>
                    </mat-radio-group>
```





////
ng serve --configuration=production


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  templateUrl: 'your-component.html',
})
export class YourComponent {
  dynamicItems: YourItemType[] = [];
  dynamicForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.dynamicForm = this.formBuilder.group({});
  }

  addNewItem() {
    // Add a new item to the dynamic list and create a corresponding form control.
    const newIndex = this.dynamicItems.length;
    this.dynamicItems.push({ id: newIndex, name: '' });

    // Add a new form control with the same index.
    this.dynamicForm.addControl('name_' + newIndex, this.formBuilder.control('', Validators.required));
  }

  removeItem(index: number) {
    // Remove the item from the dynamic list.
    this.dynamicItems.splice(index, 1);

    // Remove the corresponding form control.
    this.dynamicForm.removeControl('name_' + index);

    // Update the indexes of the remaining form controls.
    for (let i = index; i < this.dynamicItems.length; i++) {
      this.dynamicForm.setControl('name_' + i, this.dynamicForm.get('name_' + (i + 1)));
      this.dynamicForm.removeControl('name_' + (i + 1));
    }
  }
}





///


generateTimezoneUTCDate(pickedDate: Date, timeZone: TimeZone, startDate: boolean): number{
    // if(timeZone && timeZone.gmtOffset !== 0){
      const totalSeconds = timeZone.gmtOffset;
      const sign = totalSeconds < 0 ? '-' : '+';//(totalSeconds > 0 ? '+' : '');
      const absoluteSeconds = Math.abs(totalSeconds);
      const hours = Math.floor(absoluteSeconds / 3600);
      const remainingSeconds = absoluteSeconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const formattedTime = totalSeconds === 0 ? '+00:00' : `${sign}${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
      const gmtIndex = pickedDate.toString().indexOf('GMT');
      if (gmtIndex !== -1) {
        if(!startDate){
          pickedDate.setHours(23, 59, 59, 0);
        } 
        const partBeforeGMT = pickedDate.toString().slice(0, gmtIndex);
        console.log("partBeforeGMT",partBeforeGMT);
        const newDateString = `${partBeforeGMT}GMT${formattedTime}`;
        console.log("newDateString",newDateString);
        const timezoneDate = new Date(newDateString);
        console.log("timezoneDate", timezoneDate);
        return  Date.UTC(timezoneDate.getUTCFullYear(), timezoneDate.getUTCMonth(),
                        timezoneDate.getUTCDate(), timezoneDate.getUTCHours(),
                        timezoneDate.getUTCMinutes(), timezoneDate.getUTCSeconds());
      }
    // }
    // else{
    //   if(startDate){
    //     return  Date.UTC(
    //       pickedDate.getFullYear(),pickedDate.getMonth(),pickedDate.getDate(),
    //       0,0,0,0
    //     );
    //   }
    //   else{
    //     return Date.UTC(
    //       pickedDate.getFullYear(),pickedDate.getMonth(),pickedDate.getDate(),
    //       23,59,59,0
    //     );
    //   }
    // }
    this.snackBarService.openSnackBar('Failed to convert Date to selected TimeZone');
    throw new Error("Failed to convert Date to selected TimeZone");
    // return 0;
  }





///






api key for the timezonedb :-
T8CSLFFAK84X



const epochTime = 1698376685; // Example epoch time
const timeZoneOffset = -300; // For example, UTC-5:00

// Convert epoch time to local time
const localTime = new Date(epochTime * 1000 + timeZoneOffset * 60 * 1000);

console.log(localTime);





```
  const offsetString = "+02:00"; // Represents UTC+2:00
      // Parse the offset string into hours and minutes
      const offsetMatch = offsetString.match(/(-)?(\d+):(\d+)/);
      if (!offsetMatch) {
        throw new Error('Invalid offset string');
      }
      const [, offsetSign, offsetHours, offsetMinutes] = offsetMatch;
      // Convert offsetHours and offsetMinutes to numbers
      const offsetHoursNum: number = parseInt(offsetHours, 10);
      const offsetMinutesNum: number = parseInt(offsetMinutes, 10);
      // Create a date object
      const inputDate: Date = new Date(); // This is your original date
      // Subtract the offset from the date
      if (offsetSign === "-") {
        inputDate.setUTCHours(inputDate.getUTCHours() + offsetHoursNum);
        inputDate.setUTCMinutes(inputDate.getUTCMinutes() + offsetMinutesNum);
      } else {
        inputDate.setUTCHours(inputDate.getUTCHours() - offsetHoursNum);
        inputDate.setUTCMinutes(inputDate.getUTCMinutes() - offsetMinutesNum);
      }
      Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(),
                inputDate.getUTCDate(), inputDate.getUTCHours(),
                inputDate.getUTCMinutes(), inputDate.getUTCSeconds());
```


```
const totalSeconds = timeZone.gmtOffset;
      const sign = totalSeconds < 0 ? '-' : (totalSeconds > 0 ? '+' : '');
      const absoluteSeconds = Math.abs(totalSeconds);
      const hours = Math.floor(absoluteSeconds / 3600);
      const remainingSeconds = absoluteSeconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const formattedTime = totalSeconds === 0 ? '00:00' : `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      console.log(pickedStartDate);
      console.log(pickedStartDate.toString());
```



```
  const startDateUTC = Date.UTC(
      pickedStartDate.getFullYear(),
      pickedStartDate.getMonth(),
      pickedStartDate.getDate(),
      0,
      0,
      0,
      0
    );
    const endDateUTC = Date.UTC(
      pickedEndDate.getFullYear(),
      pickedEndDate.getMonth(),
      pickedEndDate.getDate(),
      23,
      59,
      59,
      0
    );
```





///
https://github.com/angular-university/angular-material-course

ng serve --configuration=production



```
.argoid-collection_products.grid-pattern--3 {
  grid-template-columns: repeat(3,minmax(0,1fr));
}
.argoid-collection_products.grid-pattern--2 {
  grid-template-columns: repeat(2,minmax(0,1fr));
}
```

//create component inside a module
ng g c component --module moduleName.ts

//create routign along with module


 @Akshaya Dongre ,
which domain environment to use getting 404 error

Request URL:
https://dev.console.media.argoid.com/api/ottdev/v1/schedules/timezones

Request Method:
GET

Status Code:
404 Not Found



import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table>
      <thead>
        <tr>
          <ng-container
            *ngTemplateOutlet="
              headers || defaultHeaderTemplate;
              context: { $implicit: data }
            "
          ></ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <ng-container
            *ngTemplateOutlet="
              rows || defaultRowTemplate;
              context: { $implicit: row }
            "
          ></ng-container>
        </tr>
      </tbody>
    </table>

    <!-- If no template is provided use keys as headers and display all values -->
    <ng-template #defaultHeaderTemplate let-data>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>

    <ng-template #defaultRowTemplate let-row>
      <td *ngFor="let row of row | keyvalue">{{ row.value }}</td>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
        font-family: sans-serif;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

        thead {
          tr {
            background-color: #dd0031;
            color: #ffffff;
            text-align: left;
          }
        }

        tbody tr:hover {
          background-color: #f6f6f6;
        }
        th,
        td {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class TableComponent {
  @Input() data!: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;
}

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableComponentModule {}



//working autocomplete select opion 
ngOnInit(): void {
  this.isSchedulerEventLoading = true;
  const getChannelsSub = this.schedulerService.getChannels().subscribe({
    next:(channel:string[])=>{
        this.channelOptions = channel;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
          tap((filteredOptions:string[]) => {
            return filteredOptions;
          })
        );
        this.myControl.setValue(this.schedulerService.activeChannel);
        // this.selectedChannel = this.channelOptions[0];
        this.isSchedulerEventLoading = false;
    },
    error:(errorMessage:string)=>{
      this.isSchedulerEventLoading = false;
      this.error = errorMessage;
    }
  })

  this.subscription.add(getChannelsSub);    
}

clearChannelSelection(){
  this.matAutocomplete.options.forEach((data: MatOption) => data.deselect());
  this.myControl.setValue('');
}


private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.channelOptions.filter(channelOption => channelOption.toLowerCase().includes(filterValue));
}



<mat-form-field>
  <mat-label>Channels</mat-label>
  <input type="text"
          placeholder="Pick one"
          aria-label="Channel Name"
          matInput
          [formControl]="myControl"
          [matAutocomplete]="auto"
        #autoCompleteInputElement
          >
  <button *ngIf="autoCompleteInputElement.value" matSuffix mat-icon-button aria-label="Clear" (click)="clearChannelSelection()">
    <mat-icon>close</mat-icon>
  </button>
  <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onSelectedOptionChange($event)" (optionActivated)="onSelectedOptionChange($event)">
    <mat-option *ngFor="let option of filteredOptions | async; let i = index" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>

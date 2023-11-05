import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
import { HighlightDirective } from 'src/app/shared/highlight.directive';
// import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,    //not need to declare and can be used in other places
  // imports: [SharedModule],  //to get highlight directive       
  //we made highlight directive standalone and deleted shared module which container it declaration and exports
  imports: [HighlightDirective],  //as we can now directly import it here
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}

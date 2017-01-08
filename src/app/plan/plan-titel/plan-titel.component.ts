import {Component, OnInit, Input} from '@angular/core';
import {Plan} from "../../pojos/plan";

@Component({
  selector: 'plan-titel',
  templateUrl: './plan-titel.component.html',
  styleUrls: ['./plan-titel.component.css']
})
export class PlanTitelComponent implements OnInit {
   @Input() plan:Plan;
  constructor() { }

  ngOnInit() {
  }

}

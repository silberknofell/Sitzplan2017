import { Component, OnInit } from '@angular/core';
import {PlanService} from "../services/plan-service";
import {ActivatedRoute} from "@angular/router";
import {PlanLayoutService} from "../services/plan-layout-service";
import {Plan} from "../pojos/plan";
import {Cell} from "../pojos/cell";
import {Tafel} from "../pojos/tafel";

@Component({
  selector: 'view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css']
})
export class ViewPlanComponent implements OnInit {
  private plan: Plan;
  planId: number = 0;
  viewCells: Cell[]=[];
  private layoutService: PlanLayoutService;

  constructor(private planService: PlanService,
              private route: ActivatedRoute) {
    route.params.subscribe((p) => this.planId=p['plan_id']);
  }

  ngOnInit() {
    this.readPlan();
    this.layoutService = new PlanLayoutService();
  }
  readPlan() {
    this.planService.readPlan(this.planId).subscribe(plan => {
      this.plan = new Plan(plan);
      this.viewCells = this.plan.getTischeOhneLager();

      this.layoutService.setMaxIJ(this.viewCells);
      this.layoutService.border=0;
      let tafel: Tafel = new Tafel();
      tafel.j = 0;
      tafel.i = (this.layoutService.maxI + 1) / 2;
      this.viewCells.push(tafel);
    });
  }
}

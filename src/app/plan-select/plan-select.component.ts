import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouterService} from "../services/router-service";
import {PlanService} from "../services/plan-service";
import {Gruppe} from "../pojos/gruppe";
import {Plan} from "../pojos/plan";
import {GroupService} from "../services/group.service";
import {Sus} from "../pojos/sus";
import {Tisch} from "../pojos/tisch";
import {Observable} from "rxjs";
import {PlanEditService} from "../plan/plan-edit-service";
import {PlanTischAnordnung} from "../plan/plan-tisch-anordnung";

@Component({
  selector: 'plan-select',
  templateUrl: './plan-select.component.html',
  styleUrls: ['./plan-select.component.css']
})
export class PlanSelectComponent implements OnInit {
  groupName: string;
  groupId: number;
  plaene=[];

  constructor(route: ActivatedRoute,
              private planService: PlanService,
              private routerService: RouterService,
              private groupService: GroupService) {
    route.params.subscribe((p) => this.setName(p['name']));

  }

  ngOnInit() {
  }

  private setName(name: string) {
    this.groupName = name;
    this.groupService.getGroupFromName(name).subscribe(group => this.setGroupId(group));
  }

  private setGroupId(group) {
    this.groupId = group.id;
    this.planService.getPlaeneFromGroupId(this.groupId)
      .subscribe(plaene => this.plaene = plaene);
  }

  editGroup() {
    this.routerService.navigateToGroupEdit(this.groupName);
  }

  newPlanClick() {
    this.groupService.getSusFromGroupId(this.groupId)
      .subscribe(sus => this.planService
          .buildNewPlan(this.groupId));
  }

  onPlanSelected(plan: Plan) {
    this.routerService.navigateToPlan(plan.id);
  }
}

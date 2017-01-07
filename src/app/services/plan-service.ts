import {Gruppe} from "../pojos/gruppe";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Plan} from "../pojos/plan";
import {Sus} from "../pojos/sus";
import {Tisch} from "../pojos/tisch";
import {PlanTischAnordnung} from "../plan/plan-tisch-anordnung";
import {RouterService} from "./router-service";
import {GroupService} from "./group.service";
@Injectable()
export class PlanService {
  private url = 'http://geihe.net/sitzplan2/rest/';

  constructor(private http: Http,
              private routerService: RouterService,
              private groupService:GroupService) {
  }

  getPlaeneFromGroupId(groupId: number) {
    let url = this.url + 'plaene/' + groupId;
    return this.http.get(url).map(res => res.json());
  }

  getAktuellePlanId(groupId: number) {
    let url = this.url + 'akt_plan_id/' + groupId;
    return this.http.get(url).map(res => res.json());
  }

  savePlan(plan: Plan) {
    let url = this.url + 'plan/';
    let sqlPlan = plan.getsqlPlan();
    return this.http.post(url, JSON.stringify(sqlPlan)).map(res => res.json());
  }

  readPlan(planId: number) {
    let url = this.url + 'plan/' + planId;
    return this.http.get(url).map(res => res.json());
  }

  buildNewPlan(groupId:number) {
    this.groupService.getGroupFromId(groupId)
      .subscribe((group) => {
        this.groupService.getSusFromGroupId(group.id)
          .subscribe(susList => this.newPlanFromGroupAndSus(group, susList));
      })
  }

  private newPlanFromGroupAndSus(group:Gruppe, susList: Sus[]) {
    let plan = Plan.newPlan(group.id);

    plan.gruppe = group.bezeichnung;
    plan.tische = susList.map(sus => {
      let tisch = new Tisch(0, 0);
      tisch.sus = sus;
      return tisch;
    });
    let pta = new PlanTischAnordnung({tische: plan.tische});
    pta.setzeU();
    this.savePlan(plan)
      .subscribe(res => this.routerService.navigateToPlan(res.planId));
  }

}

import {Component, OnInit} from '@angular/core';
import {PlanService} from "../services/plan-service";
import {RouterService} from "../services/router-service";
import {ActivatedRoute} from "@angular/router";
import {ICell} from "../pojos/icell";
import {PlanLayoutService} from "../services/plan-layout-service";
import {PlanEditService} from "./plan-edit-service";
import {PlanTischAnordnung} from "./plan-tisch-anordnung";
import {Tisch} from "../pojos/tisch";
import {Lager} from "../pojos/lager";
import {Tafel} from "../pojos/tafel";
import {Plan} from "../pojos/plan";
import {GroupService} from "../services/group.service";

const MARKIERUNG = 'markiert';
const FEST = 'fest';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  get plan(): Plan {
    return this._plan;
  }

  set plan(plan: Plan) {
    this._plan = plan;
    this.planTischAnordnung = new PlanTischAnordnung({tische: plan.getTischeOhneLager()});
    this.buildViewCells();
  }

  private _plan: Plan;
  private planTischAnordnung: PlanTischAnordnung;
  planId: number = 0;
  planWidth: number = 800;
  planHeight: number = 600;
  viewCells: ICell[];
  markedCell: ICell = null;


  constructor(private planService: PlanService,
              private groupService: GroupService,
              private routerService: RouterService,
              private route: ActivatedRoute,
              private layoutService: PlanLayoutService) {
    route.params.subscribe((p) => this.setId(p['plan_id']));
  }

  private setId(plan_id: string) {
    this.planId = Number(plan_id);
  }

  ngOnInit() {
    this.readPlan();
  }

  shuffle() {
    PlanEditService.shuffle(this._plan.getTischeOhneLager().filter(t => !t.is('fest')));
  }

  save() {
    this.planService.savePlan(this.plan).subscribe(res => alert('Plan gespeichert'));
  }

  saveAs() {
    this.plan.id = 0;
    this.plan.nr = 0;
    this.planService.savePlan(this.plan).subscribe(res => {
      this.plan.id = res.planId;
      this.plan.nr = res.planNr;
      this.routerService.navigateToPlan(res.planId);
    });
  }

  toPlanSelect() {
    this.groupService.getGroupFromId(this.plan.gruppe_id)
      .subscribe(group => this.routerService.navigateToPlanSelect(group.bezeichnung));
  }
  toViewPlan() {
    this.routerService.navigateToViewPlan(this.planId);
  }

  deletePlan() {
    this.planService.deletePlan(this._plan)
      .subscribe(() => {
        alert('Plan gelöscht');
        this.toPlanSelect()
      })
  }

  uClick() {
    this.planTischAnordnung.setzeU();
    this.buildViewCells();
  }

  gruppenClick() {
    this.planTischAnordnung
      .setzeGruppen({gruppenGroesse: 'auto'});
    this.buildViewCells();
    this.planTischAnordnung.nextGruppenGroesse();
  }

  getGruppenGroesse() {
    if (this.planTischAnordnung) {
      return this.planTischAnordnung.getGruppenGroesse();
    } else {
      return 0;
    }
  }

  getReihenGroesse() {
    if (this.planTischAnordnung) {
      return this.planTischAnordnung.getReihenGroesse();
    } else {
      return 0;
    }
  }

  reihenClick() {
    this.planTischAnordnung.setzeReihen({breite: 'auto'});
    this.buildViewCells();
  }

  onCellClick(cell: ICell) {
    this.markedCell ? this.onCellClickMitMark(cell) : this.onCellClickOhneMark(cell);
  }

  private onCellClickOhneMark(cell: ICell) {
    if (cell.is('tisch') || cell.is('lager')) {
      this.markedCell = cell;
      cell.toggle(MARKIERUNG);
    }
    if (cell.is('tafel')) {
      this.shuffle();
    }
  }

  private onCellClickMitMark(cell: ICell) {
    if (this.markedCell == cell) {
      this.doubleClick(cell)
    } else {
      this.newCellClick(cell);
    }
    this.markedCell.toggle(MARKIERUNG);
    this.markedCell = null;
  }

  private doubleClick(cell: ICell) {
    if (cell.is('tisch')) {
      cell.toggle(FEST);
    }
  }

  private newCellClick(cell: ICell) {
    if (this.markedCell.is('lager') && !cell.is('tisch')) {
      this.newTisch(cell.i, cell.j);
    }
    if (this.markedCell.is('tisch') && cell.is('lager')) {
      this.removeTisch(<Tisch> this.markedCell);
    }
    let newI = cell.i;
    let newJ = cell.j;

    if (!cell.is('fest') && !this.markedCell.is('fest')) {
      if (cell.is('tisch')) {
        cell.i = this.markedCell.i;
        cell.j = this.markedCell.j;
      }
      this.markedCell.i = newI;
      this.markedCell.j = newJ;
      this.buildViewCells();
    }
  }

  private newTisch(i: number, j: number) {
    this._plan.addTisch(i, j);
    this.planTischAnordnung = new PlanTischAnordnung({tische: this._plan.getTischeOhneLager()});
    this.buildViewCells();
  }

  private removeTisch(tisch: Tisch) {
    if (tisch.sus && tisch.sus.id) {
      alert('Der Tisch kann nicht entfernt werden, weil er belegt ist');
    } else {
      this._plan.moveToLager(tisch);
    }
    this.planTischAnordnung = new PlanTischAnordnung({tische: this._plan.getTischeOhneLager()});
    this.buildViewCells();
  }

  readPlan() {
    this.planService.readPlan(this.planId).subscribe(plan => {
      this.plan = new Plan(plan);
    });
  }

  private buildViewCells() {
    this.layoutService.setMaxIJ(this._plan.tische);
    let lager: ICell = new Lager();
    let tafel: Tafel = new Tafel();
    tafel.j = 0;
    tafel.i = (this.layoutService.maxI + 1) / 2;
    this.viewCells =
      this.layoutService.getEmptyCells().concat(this._plan.tische).concat(lager).concat(tafel);
                                                //hier _tische, da der Lagertisch mit dazugehört
  }
}

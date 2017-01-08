import {Tisch} from "./tisch";
import {Sus} from "./sus";
export class Plan {
  get tische(): Tisch[] {
    return this._tische.filter(t => t.i > 0 && t.j > 0);
  }

  set tische(value: Tisch[]) {
    this._tische = value;
  }

  _tische: Tisch[] = [];
  id: number = 0;
  gruppe_id: number;
  gruppe: string;
  raum: string = "";
  start: string = "";
  stop: string = "";
  nr: number = 0;
  private lagerTisch: Tisch;

  constructor(sqlPlan) {
    this.id = sqlPlan.id;
    this.gruppe_id = sqlPlan.gruppe_id;
    this.gruppe = sqlPlan.gruppe;
    this.raum = sqlPlan.raum;
    this.start = sqlPlan.start;
    this.stop = sqlPlan.stop;
    this.nr = sqlPlan.nr;
    this._tische = sqlPlan.tische.map(t => {
      let tisch = new Tisch(t.i, t.j);
      tisch.classes = t.classes;
      tisch.sus = new Sus(t.sus);
      return tisch;
    });
    this.addLagerTisch();
  }

  private addLagerTisch() {
    this.lagerTisch = new Tisch(0, 0);
    this._tische.push(this.lagerTisch);
  }

  addTisch(i: number, j: number) {
    this.lagerTisch.i = i;
    this.lagerTisch.j = j;
    this.addLagerTisch();
  }

  isLagertisch(tisch:Tisch) :boolean {
    return tisch.i==0 && tisch.j==0;
  }

  moveToLager(tisch: Tisch) {
    let index = this._tische.indexOf(this.lagerTisch);
    this._tische.splice(index, 1);
    tisch.i = 0;
    tisch.j = 0;
    this.lagerTisch = tisch;
  }


  getsqlPlan() {
    let tische = this.tische.map(t => {
      let susId = t.sus ? t.sus.id : 0;
      return {
        i: t.i, j: t.j, classes: t.classes, sus_id: susId
      }
    });

    return {
      id: this.id,
      gruppe_id: this.gruppe_id,
      gruppe: this.gruppe,
      raum: this.raum,
      start: this.start,
      stop: this.stop,
      nr: this.nr,
      tische: JSON.stringify(tische)
    };
  }

  static newPlan(groupId: number): Plan {
    return new Plan({
      id: 0,
      gruppe_id: groupId,
      gruppe: '',
      raum: '',
      start: '',
      stop: '',
      nr: 0,
      tische: []
    })
  }

}

import {Tisch} from "./tisch";
import {Sus} from "./sus";
export class Plan {
  id: number = 0;
  gruppe_id: number;
  gruppe: string;
  raum: string = "";
  start: string = "";
  stop: string = "";
  nr: number = 0;
  tische: Tisch[] = [];

  constructor(s) {
    this.id = s.id;
    this.gruppe_id = s.gruppe_id;
    this.gruppe = s.gruppe;
    this.raum = s.raum;
    this.start = s.start;
    this.stop = s.stop;
    this.nr = s.nr;
    this.tische = s.tische.map(t => {
      let tisch = new Tisch(t.i, t.j);
      tisch.classes = t.classes;
      tisch.sus = new Sus(t.sus);
      return tisch;
    });
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

  static newPlan(groupId:number): Plan {
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

import {ICell} from "../pojos/icell";
export class PlanEditService {

  static shuffle(cells: ICell[]) {
    let coords = cells.map(c => {
      return {i: c.i, j: c.j}
    });
    let anzahl = coords.length;
    let shuf = PlanEditService.randomArray(anzahl);
    for (let index=0; index<anzahl; index++) {
      cells[index].i = coords[shuf[index]].i;
      cells[index].j = coords[shuf[index]].j;
    }
  }


  private static randomArray(anzahl) {
    let shuf = [];
    for (let i = 0; i < anzahl; i++) {
      shuf[i] = i;
    }
    for (let i = anzahl - 1; i > 0; i--) {
      let z = PlanEditService.zufallszahl(i);
      let hilf = shuf[z];
      shuf[z] = shuf[i];
      shuf[i] = hilf;
    }
    return shuf;
  }

  private static zufallszahl(i): number { //Zufallszahl von 0 bis i
    return Math.floor(Math.random() * (i + 1));
  }
}

import {ICell} from "../pojos/icell";
import {Cell} from "../pojos/cell";
export class PlanLayoutService {
  get border(): number {
    return this._border;
  }

  set border(value: number) {
    this._border = value;
    this.calcCellWidth();
    this.calcCellHeight();
  }
  get planWidth() {
    return this._planWidth;
  }

  set planWidth(value) {
    this._planWidth = value;
    this.calcCellWidth();
  }

  get planHeight() {
    return this._planHeight;
  }

  set planHeight(value) {
    this._planHeight = value;
    this.calcCellHeight();
  }

  get maxI(): number {
    return this._maxI;
  }

  set maxI(value: number) {
    this._maxI = value;
    this.calcCellWidth();
  }

  get maxJ(): number {
    return this._maxJ;
  }

  set maxJ(value: number) {
    this._maxJ = value;
    this.calcCellHeight();
  }


  get cellWidth(): number {
    return this._cellWidth;
  }

  get cellHeight(): number {
    return this._cellHeight;
  }


  private calcCellHeight() {
    this._cellHeight = this._planHeight / (this._maxJ + 2*this._border) - this._distance;
  }

  private calcCellWidth() {
    this._cellWidth = this._planWidth / (this._maxI + 2*this.border) - this._distance;
  }

  private _maxI: number = 7;
  private _maxJ: number = 7;
  private _planWidth = 800;
  private _planHeight = 600;
  private _cellWidth = 80;
  private _cellHeight = 40;
  private _distance = 2;
  private _border: number;
  private teacherView: boolean = true;

  constructor() {
    this.maxI = 8;
    this.maxJ = 7;
    this.planWidth = 1000;
    this.planHeight = 400;
    this.border=1;
  }

  x(cell: ICell) {
    let i = this.teacherView ? cell.i - 1 + this._border : this.border + this.maxI - cell.i;
    return i * (this.cellWidth + this._distance);
  }

  y(cell: ICell) {
    let j = this.teacherView ? this.border + this.maxJ - cell.j : cell.j - 1 + this._border;
    return j * (this.cellHeight + this._distance);
  }

  getEmptyCells(): ICell[] {
    let emptyCells = [];
    for (let i = 1; i <= this.maxI+1; i++) {
      for (let j = 1; j <= this.maxJ+1; j++) {
        emptyCells.push(new Cell(i, j));
      }
    }
    return emptyCells;
  }

  setMaxIJ(cells: ICell[]) {
    let maxI = 1;
    let maxJ = 1;
    cells.forEach(cell => {
      if (maxI < cell.i) maxI = cell.i;
      if (maxJ < cell.j) maxJ = cell.j;
    });
    this.maxI = maxI;
    this.maxJ = maxJ;
  }

  setTeacherView() {
    this.teacherView = true;
  }

  setPupilView() {
    this.teacherView = false;
  }

  toggleViewDirection() {
    this.teacherView = !this.teacherView;
  }

}

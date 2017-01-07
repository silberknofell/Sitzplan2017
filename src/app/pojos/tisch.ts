import {Sus} from "./sus";
import {Cell} from "./cell";
export class Tisch extends Cell {
  sus: Sus;
  private _text: string = "";

  constructor(i: number, j: number) {
    super(i, j);
    this.classes.push('tisch');
    this.sus = null;
  }

  get text(): string {
    if (this.sus) {
      return this.sus.name;
    } else {
      return this._text;
    }
  }

  set text(value: string) {
    this._text = value;
  }
}

import {Cell} from "./cell";
export class Lager extends Cell{
  constructor() {
    super(0,0);
    this.text="Lager";
    this.classes.push('lager');
    this.classes.push('fest');
  }
}

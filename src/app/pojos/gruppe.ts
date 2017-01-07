import {Serializable} from "../util/serializable";
export class Gruppe extends Serializable{
  id:number;
  bezeichnung:string;

  static getLeereGruppe():Gruppe {
    return new Gruppe({id:0, bezeichnung:""});
}
}

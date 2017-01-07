import {Serializable} from "../util/serializable";
export class Sus extends Serializable {
  id: number;
  name: string;
  gruppe_id: string;
  nachname: string;
  aktiv: boolean;

  constructor(susVorlage) {
    super(null);
    this.id = susVorlage.id || 0;
    this.name = susVorlage.name || "";
    this.nachname = susVorlage.nachname || "";
    this.gruppe_id = susVorlage.gruppe_id;
    this.aktiv = susVorlage.aktiv;
  }

  getShortName(): string {
    return this.name;
  }

  getLongName(): string {
    return this.nachname + ", " + this.name;
  }

  static leererSus(groupId): Sus {
    return new Sus({id: 0, gruppe_id: groupId,  name: "", nachname: "", aktiv: true});
  }

  istLeer(): boolean {
    return this.id == 0;
  }
}

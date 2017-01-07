import {Tisch} from "../pojos/tisch";
import {letProto} from "rxjs/operator/let";
interface IPunkt {
  i:number;
  j:number;
}

const GRUPPEN_GROESSEN = [2, 3, 4, 5, 6, 8];
const REIHEN_GROESSEN = [2, 3, 4, 5, 6, 8];

export class  PlanTischAnordnung  {
  private tische:Tisch[];
  private anzahlTische;
  private blockBreite;
  private blockHoehe;
  private anzahlImBlock;
  private anzahlInBlockReihe;
  private ggIndex: number;
  private rIndex: number;

  constructor(optionen) {
    this.tische = optionen.tische;
    this.anzahlTische = this.tische.length;
    this.blockBreite = optionen.blockBreite || 3;
    this.blockHoehe = optionen.blockHoehe || 2;
    this.anzahlImBlock = this.blockBreite + this.blockHoehe - 1;
    this.anzahlInBlockReihe = this.anzahlImBlock * 2;

    this.ggIndex=2;
    this.rIndex=2;
  }

  private getIJ_U(nr0:number):IPunkt {
    this.anzahlImBlock = this.blockBreite + this.blockHoehe - 1;
    this.anzahlInBlockReihe = this.anzahlImBlock * 2;
    let blockReihe = Math.floor(nr0 / this.anzahlInBlockReihe);
    let jBlock = blockReihe * 2;
    let nrInBlockReihe = nr0 % this.anzahlInBlockReihe;
    let nrImBlock = nrInBlockReihe % this.anzahlImBlock;

    let i = (nrImBlock < this.blockBreite - 1) ? 1 + nrImBlock : 0;
    if (nrInBlockReihe < this.anzahlImBlock) {
      i = 2 * this.blockBreite - i;
    }
    let j = jBlock;
    if (nrImBlock >= this.blockBreite) {
      j += nrImBlock - this.blockBreite + 1;
    }
    return {"i": i + 1, "j": j + 1};
  }

  private getIJ_Reihen(nr0:number, breite?:number):IPunkt {
    breite = breite || this.blockBreite;
    this.anzahlImBlock = breite;
    this.anzahlInBlockReihe = this.anzahlImBlock * 2;
    let i = nr0 % (this.anzahlInBlockReihe);
    if (i >= breite) {
      i++;
    }
    let j = Math.floor(nr0 / this.anzahlInBlockReihe) * 2;
    return {"i": i + 1, "j": j + 1};
  }

  setzeReihen(optionen) {
    let breite=null;
    if (optionen && optionen.breite=='auto') {
      breite = this.getReihenGroesse();
      this.nextReihenGroesse();
    }
    for (let nr = 0; nr < this.anzahlTische; nr++) {
      let punkt:IPunkt = this.getIJ_Reihen(nr, breite);
      this.setIJ(nr, punkt);
    }
  }
  getReihenGroesse() {
    let gruppenGroesse = REIHEN_GROESSEN[this.rIndex];
    return gruppenGroesse;
  }
  nextReihenGroesse() {
    this.rIndex = (this.rIndex + 1) % REIHEN_GROESSEN.length;
  }

  setzeU() {
    for (let nr = 0; nr < this.anzahlTische; nr++) {
      let punkt:IPunkt = this.getIJ_U(nr);
      this.setIJ(nr, punkt);
    }
  }

  setzeGruppen(optionen) {
    let anzahlGruppen = optionen.anzahlGruppen;
    if (optionen.gruppenGroesse='auto') {
      optionen.gruppenGroesse = this.getGruppenGroesse();
    }

    if (optionen.gruppenGroesse) {
      anzahlGruppen = Math.round(this.anzahlTische / optionen.gruppenGroesse);
    }
    let nr = 0;
    let anzahlTischeRest = this.anzahlTische;
    let anzahlGruppenRest = anzahlGruppen;
    let j:number = 1;
    while (anzahlTischeRest > 0) {
      let reihenLaenge = Math.floor((anzahlTischeRest - 1) / anzahlGruppenRest + 1);
      for (let i = 1; i <= reihenLaenge; i++) {
        this.setIJ(nr, {i:i, j:j});
        nr++;
      }
      j += 2;
      anzahlGruppenRest--;
      anzahlTischeRest -= reihenLaenge;
    }
  }
   getGruppenGroesse() {
    let gruppenGroesse = GRUPPEN_GROESSEN[this.ggIndex];
    return gruppenGroesse;
  }
   nextGruppenGroesse() {
    this.ggIndex = (this.ggIndex + 1) % GRUPPEN_GROESSEN.length;
  }

  private setIJ(nr: number, punkt: IPunkt) {
    this.tische[nr].i = punkt.i;
    this.tische[nr].j = punkt.j;
  }
}

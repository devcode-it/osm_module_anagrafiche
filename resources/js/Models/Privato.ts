import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

/**
 * @property {string} nome
 */
export default class Privato extends Model {
  jsonApiType = 'anagrafiche-privati';

  public nome: string;
  public cognome?: string;
  public codiceFiscale: string;

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica') as Anagrafica;
  }

  get denominazione() {
    let s = this.nome;

    if (this.cognome) {
      s += ` ${this.cognome}`;
    }

    return s;
  }

  set denominazione(value: string) {
    [this.nome, this.cognome] = value.split(' ');
    this.setAttributes({nome: this.nome, cognome: this.cognome});
  }
}

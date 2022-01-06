import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import {Anagrafica} from './Anagrafica';

/**
 * @property {string} nome
 * @property {string} cognome
 * @property {string} codiceFiscale
 */
export class Privato extends Model {
  jsonApiType = 'anagrafiche/privati'

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica');
  }

  get denominazione() {
    return this.nome + this.cognome;
  }

  set denominazione(value: string) {
    [this.nome, this.cognome] = value.split(' ');
  }
}

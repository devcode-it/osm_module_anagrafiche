import {Model} from 'openstamanager';

import {Anagrafica} from './Anagrafica';

/**
 * @property {string} nome
 * @property {string} cognome
 * @property {string} codiceFiscale
 */
export class Privato extends Model {
  jsonApiType = 'anagrafiche'

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

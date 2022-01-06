import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import {Anagrafica} from './Anagrafica';

/**
 * @property {string} denominazione
 * @property {string} partitaIva
 * @property {string} codiceDestinatario
 */
export class Azienda extends Model {
  jsonApiType = 'anagrafiche/aziende'

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica');
  }
}

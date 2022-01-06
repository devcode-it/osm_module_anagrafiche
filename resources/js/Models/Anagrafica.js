/* eslint-disable no-param-reassign */
import {Model} from 'openstamanager';

import {Azienda} from './Azienda';
// eslint-disable-next-line import/no-cycle
import {Privato} from './Privato';

/**
 * @property {'CLIENTE'|'FORNITORE'} tipo
 * @property {'AZIENDA'|'PRIVATO'|'ENTE'} tipologia
 * @property {string} indirizzo
 * @property {string} cap
 * @property {string} citta
 * @property {string} provincia
 * @property {string} nazione
 * @property {number} telefono
 * @property {number} cellulare
 * @property {string} email
 * @property {string} pec
 * @property {string} sitoWeb
 */
export class Anagrafica extends Model {
  jsonApiType = 'anagrafiche';

  istanza() {
    return this.hasOne('istanza');
  }

  getIstanza(): Azienda | Privato {
    return this.getRelation('istanza');
  }
}

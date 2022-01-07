/* eslint-disable no-param-reassign, import/no-cycle */
import {Model} from 'openstamanager';

import Azienda from './Azienda';
import Privato from './Privato';

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
export default class Anagrafica extends Model {
  jsonApiType = 'anagrafiche';

  getIstanza() {
    return this.getRelation('istanza') as Azienda | Privato;
  }
}

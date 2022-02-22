import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

export default class Azienda extends Model {
  static jsonApiType = 'anagrafiche-aziende';
  static relationships = ['anagrafica'];

  denominazione: string;
  partitaIva: string;
  codiceDestinatario: string;

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica') as Anagrafica;
  }
}

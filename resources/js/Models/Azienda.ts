import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

export default class Azienda extends Model {
  jsonApiType = 'anagrafiche-aziende';

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
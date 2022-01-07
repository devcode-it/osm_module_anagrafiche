import {Model} from 'openstamanager';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

export default class Privato extends Model {
  jsonApiType = 'anagrafiche-privati';

  codiceFiscale: string;
  cognome: string;
  nome: string;

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica') as Anagrafica;
  }

  get denominazione() {
    return this.nome + this.cognome;
  }

  set denominazione(value: string) {
    [this.nome, this.cognome] = value.split(' ');
  }
}

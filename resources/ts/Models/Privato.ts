import Model, {
  ModelAttributes,
  ModelRelations
} from '@osm/Models/Model';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

export interface PrivatoAttributes extends ModelAttributes {
  nome: string;
  cognome?: string;
  codiceFiscale: string;
}

export interface PrivatoRelationships extends ModelRelations {
  anagrafica: Anagrafica;
}
export default class Privato extends Model<PrivatoAttributes, PrivatoRelationships> {
  static get jsonApiType() {
    return 'anagrafiche__privati';
  }

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  get denominazione() {
    let denominazione = this.getAttribute('nome');

    const cognome = this.getAttribute('cognome');
    if (cognome) {
      denominazione += ` ${cognome}`;
    }

    return denominazione;
  }

  set denominazione(value: string) {
    const [nome, cognome] = value.split(' ');
    this.setAttributes({nome, cognome});
  }
}

import Model, {
  ModelAttributes,
  ModelRelations
} from '@osm/Models/Model';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

export interface AziendaAttributes extends ModelAttributes {
  denominazione: string;
  partitaIva: string;
  codiceDestinatario: string;
}

export interface AziendaRelationships extends ModelRelations {
  anagrafica: Anagrafica;
}

export default class Azienda extends Model<AziendaAttributes, AziendaRelationships> {
  static get jsonApiType() {
    return 'anagrafiche__aziende';
  }

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  get denominazione() {
    return this.getAttribute('denominazione');
  }
}

/* eslint-disable no-param-reassign, import/no-cycle */
import Model, {
  ModelAttributes,
  ModelRelations
} from '@osm/Models/Model';

import Azienda from './Azienda';
import Privato from './Privato';
import {CountryCode} from 'countries-and-timezones';

export interface AnagraficaAttributes extends ModelAttributes {
  tipo: 'CLIENTE' | 'FORNITORE';
  tipologia: 'AZIENDA' | 'PRIVATO' | 'ENTE';
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
  nazione: CountryCode;
  telefono: string;
  cellulare: string;
  email: string;
  pec: string;
  sitoWeb: string;
}

export interface AnagraficaRelationships extends ModelRelations {
  privato: Privato;
  azienda: Azienda;
}

export default class Anagrafica extends Model<AnagraficaAttributes, AnagraficaRelationships> {
  static get jsonApiType() {
    return 'anagrafiche';
  }

  getIstanza() {
    const privato = this.getRelation('privato');
    if (privato) {
      return privato;
    }

    const azienda = this.getRelation('azienda');
    if (azienda) {
      return azienda;
    }
  }

  async getIstanzaAsync(): Promise<Privato | Azienda | null> {
    const privatoResponse = await this.privato().first();
    let istanza: Privato | Azienda | null = privatoResponse.getData() as Privato | null;
    if (!istanza) {
      const aziendaResponse = await this.azienda().first();
      istanza = aziendaResponse.getData() as Azienda | null;
    }
    return istanza;
  }

  privato() {
    return this.hasOne(Privato);
  }

  azienda() {
    return this.hasOne(Azienda);
  }
}

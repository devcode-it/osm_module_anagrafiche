/* eslint-disable no-param-reassign, import/no-cycle */
import Record from '@osm/Models/Record';
import {CountryCode} from 'countries-and-timezones';
import {
  Attr,
  HasOne,
  Model
} from 'spraypaint';

import Azienda from './Azienda';
import Privato from './Privato';


@Model()
export default class Anagrafica extends Record {
  static jsonapiType = 'anagrafiche';

  @Attr() tipo!: 'CLIENTE' | 'FORNITORE';
  @Attr() tipologia!: 'AZIENDA' | 'PRIVATO' | 'ENTE';
  @Attr() indirizzo!: string;
  @Attr() cap!: string;
  @Attr() citta!: string;
  @Attr() provincia!: string;
  @Attr() nazione!: CountryCode;
  @Attr() telefono!: string;
  @Attr() cellulare!: string;
  @Attr() email!: string;
  @Attr() pec!: string;
  @Attr() sitoWeb!: string;
  @Attr({persist: false}) createdAt!: string;
  @Attr({persist: false}) updatedAt!: string;

  @HasOne(Privato) privato?: Privato;
  @HasOne({name: 'anagrafiche__aziende', type: Azienda}) azienda?: Azienda;

  getIstanza() {
    return this.privato || this.azienda;
  }
}

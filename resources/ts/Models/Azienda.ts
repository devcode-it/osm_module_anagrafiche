import Record from '@osm/Models/Record';
import {
  Attr,
  BelongsTo,
  Model
} from 'spraypaint';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

@Model()
export default class Azienda extends Record {
  static jsonapiType = 'anagrafiche__aziende';

  @Attr() denominazione!: string;
  @Attr() partitaIva!: string;
  @Attr() codiceDestinatario!: string;
  @Attr({persist: false}) createdAt!: string;
  @Attr({persist: false}) updatedAt!: string;

  @BelongsTo('anagrafica') anagrafica!: Anagrafica;
}

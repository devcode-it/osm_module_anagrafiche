import Record from '@osm/Models/Record';
import {
  Attr,
  BelongsTo,
  Model
} from 'spraypaint';

// eslint-disable-next-line import/no-cycle
import Anagrafica from './Anagrafica';

@Model()
export default class Privato extends Record {
  static jsonapiType = 'anagrafiche__privati';

  @Attr() nome!: string;
  @Attr() cognome?: string;
  @Attr() codiceFiscale!: string;
  @Attr({persist: false}) createdAt!: string;
  @Attr({persist: false}) updatedAt!: string;

  @BelongsTo('anagrafica') anagrafica!: Anagrafica;

  get denominazione() {
    let denominazione = this.nome;

    const {cognome} = this;
    if (cognome) {
      denominazione += ` ${cognome}`;
    }

    return denominazione;
  }

  set denominazione(value: string) {
    const [nome, cognome] = value.split(' ');
    this.nome = nome;
    this.cognome = cognome;
  }
}

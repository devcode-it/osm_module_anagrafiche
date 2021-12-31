import {Model} from 'openstamanager';

import {Azienda} from './Azienda';
import {Privato} from './Privato';

/**
 * @property {string} tipo
 * @property {string} tipologia
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
export class Anagrafica extends Model {
  jsonApiType = 'anagrafiche';

  istanza() {
    return this.hasOne('istanza');
  }

  getIstanza() {
    return this.getRelation('istanza');
  }

  /** Getter e setter per Records */

  get denominazione() {
    const map = new Map();

    map.set(Azienda, (model: Azienda) => {
      return model.denominazione;
    });
    map.set(Privato, (model: Privato) => {
      return `${model.nome} ${model.cognome}`;
    });

    // TODO: Test if it returns a promise
    return this.relationshipValue(this.istanza(), map);
  }

  set denominazione(value: string) {
    const map = new Map();

    map.set(Azienda, (model: Azienda) => {
      model.denominazione = value;
    });
    map.set(Privato, (model: Privato) => {
      [model.nome, model.cognome] = value.split(" ");
    });

    this.relationshipValue(this.istanza(), map);
  }

  get partitaIva() {
    const map = new Map();

    map.set(Azienda, (model: Azienda) => {
      return model.partitaIva;
    });

    // TODO: Test if it returns a promise
    return this.relationshipValue(this.istanza(), map);
  }

  set partitaIva(value: string) {
    const map = new Map();

    map.set(Azienda, (model: Azienda) => {
      model.partitaIva = value;
    });

    this.relationshipValue(this.istanza(), map);
  }

  get codiceFiscale() {
    const map = new Map();

    map.set(Privato, (model: Privato) => {
      return model.codiceFiscale;
    });

    // TODO: Test if it returns a promise
    return this.relationshipValue(this.istanza(), map);
  }

  set codiceFiscale(value: string) {
    const map = new Map();

    map.set(Privato, (model: Privato) => {
      model.codiceFiscale = value;
    });

    this.relationshipValue(this.istanza(), map);
  }
}

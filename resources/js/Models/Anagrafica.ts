/* eslint-disable no-param-reassign, import/no-cycle */
import {Model} from 'openstamanager';

import Azienda from './Azienda';
import Privato from './Privato';

export default class Anagrafica extends Model {
  static jsonApiType = 'anagrafiche';

  public tipo: 'CLIENTE' | 'FORNITORE';
  public tipologia: 'AZIENDA' | 'PRIVATO' | 'ENTE';
  public indirizzo: string;
  public cap: string;
  public citta: string;
  public provincia: string;
  public nazione: string;
  public telefono: string;
  public cellulare: string;
  public email: string;
  public pec: string;
  public sitoWeb: string;

  public static relationships = ['privato', 'azienda'];

  getIstanza(): Privato | Azienda {
    return (this.getPrivato() ?? this.getAzienda());
  }

  privato() {
    return this.hasOne(Privato);
  }

  getPrivato() {
    return this.getRelation('privato') as Privato;
  }

  azienda() {
    return this.hasOne(Azienda);
  }

  getAzienda() {
    return this.getRelation('azienda') as Azienda;
  }

  get denominazione() {
    return this.getIstanza().denominazione;
  }

  set denominazione(value) {
    this.getIstanza().denominazione = value;
  }
}

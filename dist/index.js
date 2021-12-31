import { Model, RecordsPage, __ } from '../../../index.js';

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
class Anagrafica extends Model {
  jsonApiType = 'anagrafiche';

  istanza() {
    return this.hasOne('istanza');
  }

  getIstanze() {
    return this.getRelation('istanza');
  }
}

/**
 * @property {string} denominazione
 * @property {string} partitaIva
 * @property {string} codiceDestinatario
 */
class Azienda extends Model {
  jsonApiType = 'anagrafiche'


}

/**
 * @property {string} nome
 * @property {string} cognome
 * @property {string} codiceFiscale
 */
class Privato extends Model {
  jsonApiType = 'anagrafiche'

  anagrafica() {
    return this.hasOne(Anagrafica, 'anagrafica');
  }

  getAnagrafiche() {
    return this.getRelation('anagrafica');
  }

  get denominazione() {
    return this.nome + this.cognome;
  }

  set denominazione(value) {
    [this.nome, this.cognome] = value.split(' ');
  }
}

class Anagrafiche extends RecordsPage {
  columns = {
    denominazione: __("Ragione sociale"),
    tipo: __("Tipo"),
    tipologia: __("Tipologia"),
    citta: __("Citt\xE0"),
    telefono: __("Telefono")
  };
  sections = [
    {
      heading: __("Dati anagrafici"),
      fields: {
        denominazione: {
          label: __("Denominazione"),
          type: "text",
          required: true
        },
        tipo: {
          label: __("Tipo"),
          type: "select",
          options: [
            {
              label: __("Fornitore"),
              value: "FORNITORE"
            },
            {
              label: __("Cliente"),
              value: "CLIENTE"
            }
          ],
          required: true
        },
        tipologia: {
          label: __("Tipologia"),
          type: "select",
          options: [
            {
              label: __("Privato"),
              value: "PRIVATO"
            },
            {
              label: __("Azienda"),
              value: "AZIENDA"
            }
          ],
          required: true
        },
        partita_iva: {
          label: __("Partita IVA"),
          type: "text",
          required: true
        },
        codice_fiscale: {
          label: __("Codice fiscale"),
          type: "text",
          required: true
        }
      }
    }
  ];
  model = Anagrafica;
}

export { Anagrafica, Anagrafiche, Azienda, Privato };

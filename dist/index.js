import { Model, RecordsPage } from '../../../index.js';

class Azienda extends Model {
  jsonApiType = "anagrafiche-aziende";
  denominazione;
  partitaIva;
  codiceDestinatario;
  anagrafica() {
    return this.hasOne(Anagrafica, "anagrafica");
  }
  getAnagrafiche() {
    return this.getRelation("anagrafica");
  }
}

class Privato extends Model {
  jsonApiType = "anagrafiche-privati";
  nome;
  cognome;
  codiceFiscale;
  anagrafica() {
    return this.hasOne(Anagrafica, "anagrafica");
  }
  getAnagrafiche() {
    return this.getRelation("anagrafica");
  }
  get denominazione() {
    let s = this.nome;
    if (this.cognome) {
      s += ` ${this.cognome}`;
    }
    return s;
  }
  set denominazione(value) {
    [this.nome, this.cognome] = value.split(" ");
  }
}

class Anagrafica extends Model {
  jsonApiType = "anagrafiche";
  tipo;
  tipologia;
  indirizzo;
  cap;
  citta;
  provincia;
  nazione;
  telefono;
  cellulare;
  email;
  pec;
  sitoWeb;
  static relationships = ["privato", "azienda"];
  getIstanza() {
    return this.getPrivato() ?? this.getAzienda();
  }
  privato() {
    return this.hasOne(Privato);
  }
  getPrivato() {
    return this.getRelation("privato");
  }
  azienda() {
    return this.hasOne(Azienda);
  }
  getAzienda() {
    return this.getRelation("azienda");
  }
  get denominazione() {
    return this.getIstanza().denominazione;
  }
  set denominazione(value) {
    this.getIstanza().denominazione = value;
  }
  get partitaIva() {
    const istanza = this.getIstanza();
    return istanza instanceof Azienda ? istanza.partitaIva : void 0;
  }
  set partitaIva(value) {
    const istanza = this.getIstanza();
    if (istanza instanceof Azienda) {
      istanza.partitaIva = value;
    }
  }
  get codiceDestinatario() {
    const istanza = this.getIstanza();
    return istanza instanceof Azienda ? istanza.partitaIva : void 0;
  }
  set codiceDestinatario(value) {
    const istanza = this.getIstanza();
    if (istanza instanceof Azienda) {
      istanza.codiceDestinatario = value;
    }
  }
  get codiceFiscale() {
    const istanza = this.getIstanza();
    return istanza instanceof Privato ? istanza.codiceFiscale : void 0;
  }
  set codiceFiscale(value) {
    const istanza = this.getIstanza();
    if (istanza instanceof Privato) {
      istanza.codiceFiscale = value;
    }
  }
}

class Records extends RecordsPage {
  title = __("Anagrafiche");
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
        indirizzo: {
          label: __("Indirizzo"),
          type: "text",
          icon: "map-marker-outline"
        },
        cap: {
          label: __("CAP"),
          type: "text"
        },
        citta: {
          label: __("Citt\xE0"),
          type: "text",
          icon: "city-variant-outline"
        },
        provincia: {
          label: __("Provincia"),
          type: "text"
        },
        nazione: {
          label: __("Nazione"),
          type: "text",
          icon: "flag-variant-outline"
        },
        telefono: {
          label: __("Telefono"),
          type: "tel",
          icon: "phone-classic"
        },
        cellulare: {
          label: __("Cellulare"),
          type: "tel",
          icon: "cellphone"
        },
        email: {
          label: __("Email"),
          type: "email",
          icon: "email-outline"
        },
        pec: {
          label: __("PEC"),
          type: "email",
          icon: "email-seal-outline"
        },
        sitoWeb: {
          label: __("Sito web"),
          type: "url",
          icon: "web"
        }
      }
    },
    {
      id: "dati-azienda",
      heading: __("Dati azienda"),
      fields: {
        partitaIva: {
          label: __("Partita IVA"),
          type: "text",
          disabled: true
        },
        codiceDestinatario: {
          label: __("Codice destinatario"),
          type: "text",
          disabled: true
        }
      }
    },
    {
      id: "dati-privato",
      heading: __("Dati privato"),
      fields: {
        codiceFiscale: {
          label: __("Codice fiscale"),
          type: "text",
          disabled: true
        }
      }
    }
  ];
  model = Anagrafica;
  customSetter = async (model, data) => {
    const relation = data.get("tipologia") === "AZIENDA" ? Azienda : Privato;
    let relationModel = model.getIstanza();
    if (!(relationModel instanceof relation)) {
      relationModel = new relation();
    }
    if (relationModel instanceof Privato) {
      const denominazione = data.pull("denominazione");
      const split = denominazione.split(" ");
      if (split?.length === 1) {
        split.push("");
      }
      [relationModel.nome, relationModel.cognome] = split;
      relationModel.codiceFiscale = data.pull("codiceFiscale");
    } else {
      relationModel.denominazione = data.pull("denominazione");
      relationModel.partitaIva = data.pull("partitaIva");
      relationModel.codiceDestinatario = data.pull("codiceDestinatario");
    }
    const response = await relationModel.save();
    relationModel = response.getModel();
    model.setRelation(relationModel instanceof Azienda ? "azienda" : "privato", relationModel);
    data.each((value, key) => {
      model[key] = value;
    });
  };
  oncreate(vnode) {
    super.oncreate(vnode);
    $("material-select#tipologia").on("selected", (event) => {
      const tipologia = $(event.target);
      const azienda = $("#dati-azienda [data-default-value]");
      const privato = $("#dati-privato [data-default-value]");
      if (tipologia.val() === "AZIENDA") {
        azienda.prop("disabled", false).prop("required", true);
        privato.prop("disabled", true).prop("required", false);
      } else {
        azienda.prop("disabled", true).prop("required", false);
        privato.prop("disabled", false).prop("required", true);
      }
    });
  }
}

export { Anagrafica, Azienda, Privato, Records };

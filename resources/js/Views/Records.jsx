import {type Collection} from 'collect.js';
import {type ColumnsT, type SectionsT,__, RecordsPage} from 'openstamanager';

import {Anagrafica, Azienda, Privato} from '../Models';

export class Records extends RecordsPage {
  title = __('Anagrafiche');

  columns: ColumnsT = {
    denominazione: __('Ragione sociale'),
    tipo: __('Tipo'),
    tipologia: __('Tipologia'),
    citta: __('Città'),
    telefono: __('Telefono')
  };

  sections: SectionsT = [
    {
      heading: __('Dati anagrafici'),
      fields: {
        denominazione: {
          label: __('Denominazione'),
          type: 'text',
          required: true
        },
        tipo: {
          label: __('Tipo'),
          type: 'select',
          options: [
            {
              label: __('Fornitore'),
              value: 'FORNITORE'
            },
            {
              label: __('Cliente'),
              value: 'CLIENTE'
            }
          ],
          required: true
        },
        tipologia: {
          label: __('Tipologia'),
          type: 'select',
          options: [
            {
              label: __('Privato'),
              value: 'PRIVATO'
            },
            {
              label: __('Azienda'),
              value: 'AZIENDA'
            }
          ],
          required: true
        },
        indirizzo: {
          label: __('Indirizzo'),
          type: 'text',
          icon: 'map-marker-outline'
        },
        cap: {
          label: __('CAP'),
          type: 'text'
        },
        citta: {
          label: __('Città'),
          type: 'text',
          icon: 'city-variant-outline'
        },
        provincia: {
          label: __('Provincia'),
          type: 'text'
        },
        nazione: {
          label: __('Nazione'),
          type: 'text',
          icon: 'flag-variant-outline'
        },
        telefono: {
          label: __('Telefono'),
          type: 'tel',
          icon: 'phone-classic'
        },
        cellulare: {
          label: __('Cellulare'),
          type: 'tel',
          icon: 'cellphone'
        },
        email: {
          label: __('Email'),
          type: 'email',
          icon: 'email-outline'
        },
        pec: {
          label: __('PEC'),
          type: 'email',
          icon: 'email-seal-outline'
        },
        sitoWeb: {
          label: __('Sito web'),
          type: 'url',
          icon: 'web'
        }
      }
    },
    {
      id: 'dati-azienda',
      heading: __('Dati azienda'),
      fields: {
        partitaIva: {
          label: __('Partita IVA'),
          type: 'text',
          disabled: true
        },
        codiceDestinatario: {
          label: __('Codice destinatario'),
          type: 'text',
          disabled: true
        }
      }
    },
    {
      id: 'dati-privato',
      heading: __('Dati privato'),
      fields: {
        codiceFiscale: {
          label: __('Codice fiscale'),
          type: 'text',
          disabled: true
        }
      }
    }
  ];

  model = Anagrafica;

  customSetter = async (model: Anagrafica, data: Collection<string, string>) => {
    const relationModel = data.get('tipologia') === 'AZIENDA' ? Azienda : Privato;
    let relationInstance = model.getIstanza();

    if (!(relationInstance instanceof relationModel)) {
      // eslint-disable-next-line new-cap
      relationInstance = new relationModel();
    }
    if (relationInstance instanceof Privato) {
      const split = data.pull('denominazione').split(' ');
      if (split.length === 1) {
        split.push('');
      }
      [relationInstance.nome, relationInstance.cognome] = split;
      relationInstance.codiceFiscale = data.pull('codiceFiscale');
    } else {
      relationInstance.denominazione = data.pull('denominazione');
      relationInstance.partitaIva = data.pull('partitaIva');
      relationInstance.codiceDestinatario = data.pull('codiceDestinatario');
    }

    const response = await relationInstance.save();
    model.setRelation('istanza', response.getModel());

    data.each((value, key) => {
      model[key] = value;
    });
  };

  oncreate(vnode) {
    super.oncreate(vnode);

    $('material-select#tipologia').on("selected", (event) => {
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

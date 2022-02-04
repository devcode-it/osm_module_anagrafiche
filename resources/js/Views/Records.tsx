import {capitalize} from 'lodash-es';
import {VnodeDOM} from 'mithril';
import {
  type ColumnsT,
  type SectionsT,
  IModel,
  RecordsPage,
  SelectOptionsT
} from 'openstamanager';

import {Anagrafica} from '../Models';
import {Collection} from 'collect.js';

export default class Records extends RecordsPage {
  title = __('Anagrafiche');

  columns: ColumnsT = {
    denominazione: __('Ragione sociale'),
    tipo: {
      title: __('Tipo'),
      valueModifier: (value: string) => capitalize(value)
    },
    tipologia: {
      title: __('Tipologia'),
      valueModifier: (value: string) => capitalize(value)
    },
    citta: __('Città'),
    telefono: __('Telefono')
  };

  sections: SectionsT = {
    generali: {
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
          type: 'select',
          options: this.page.props.nazioni as SelectOptionsT,
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
    datiAzienda: {
      heading: __('Dati azienda'),
      fields: {
        'azienda:partitaIva': {
          label: __('Partita IVA'),
          type: 'text',
          disabled: true
        },
        'azienda:codiceDestinatario': {
          label: __('Codice destinatario'),
          type: 'text',
          disabled: true,
          maxLength: 7,
          minLength: 7
        }
      }
    },
    datiPrivato: {
      heading: __('Dati privato'),
      fields: {
        'privato:codiceFiscale': {
          label: __('Codice fiscale'),
          type: 'text',
          disabled: true
        }
      }
    }
  };

  model = Anagrafica;

  oncreate(vnode: VnodeDOM) {
    super.oncreate(vnode);

    $('material-select#tipologia').on('selected', (event: Event) => {
      const tipologia = $(event.target as HTMLElement);
      const azienda = $('#datiAzienda [data-default-value]');
      const privato = $('#datiPrivato [data-default-value]');

      if (tipologia.val() === 'AZIENDA') {
        azienda.prop('disabled', false).prop('required', true);
        privato.prop('disabled', true).prop('required', false);
      } else {
        azienda.prop('disabled', true).prop('required', false);
        privato.prop('disabled', false).prop('required', true);
      }
    });
  }

  async loadRelations(model: IModel, data: Collection<File | string>) {
    const relations = await super.loadRelations(model, data);
    delete relations[data.get('tipologia') === 'AZIENDA' ? 'privato' : 'azienda'];
    return relations;
  }

  async setFields(
    model: IModel,
    relations: Record<string, IModel>,
    data: Collection<File | string>
  ) {
    const tipologia = data.get('tipologia') === 'AZIENDA' ? 'privato' : 'azienda';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await super.setFields(model, relations, data
      .put(`${(data.get('tipologia') as string).toLowerCase()}:denominazione`, data.get('denominazione'))
      .forget('denominazione')
      .reject((item) => (item as string).startsWith(`${tipologia}:`)));
  }
}

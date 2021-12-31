import {type ColumnsT, __, RecordsPage,SectionsT} from 'openstamanager';

import {Anagrafica} from '../Models';

export class Records extends RecordsPage {
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
              partitaIva: {
                  label: __('Partita IVA'),
                  type: 'text',
                  required: true
              },
              codiceFiscale: {
                  label: __('Codice fiscale'),
                  type: 'text',
                  required: true
              }
          }
      }
  ]

  model = Anagrafica;
}

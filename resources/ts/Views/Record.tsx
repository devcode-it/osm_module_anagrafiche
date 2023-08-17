import '@maicol07/material-web-additions/card/outlined-card.js';
import '@maicol07/material-web-additions/layout-grid/layout-grid.js';
import '@maicol07/material-web-additions/layout-grid/layout-grid-inner.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/select-option.js';
import '@material/web/textfield/filled-text-field.js';
import '../../scss/styles.scss';

import Anagrafica, {AnagraficaAttributes} from '@anagrafiche/Models/Anagrafica';
import Azienda from '@anagrafiche/Models/Azienda';
import Privato from '@anagrafiche/Models/Privato';
import {
  mdiCellphone,
  mdiCityVariantOutline,
  mdiContentSaveOutline,
  mdiDomain,
  mdiEmailOutline,
  mdiEmailSealOutline,
  mdiFlagVariantOutline,
  mdiMapMarkerOutline,
  mdiPhoneClassic,
  mdiShapeOutline,
  mdiWeb
} from '@mdi/js';
import MdIcon from '@osm/Components/MdIcon';
import RecordPage, {RecordPageAttributes} from '@osm/Components/Pages/RecordPage';
import {JSONAPI} from '@osm/typings/request';
import {
  isFormValid,
  showSnackbar
} from '@osm/utils/misc';
import collect, {Collection} from 'collect.js';
import {Builder} from 'coloquent';
import {
  CountryCode,
  getAllCountries
} from 'countries-and-timezones';
import {
  Children,
  Vnode
} from 'mithril';
import Stream from 'mithril/stream';
import {
  Form,
  FormSubmitEvent,
  RequestError
} from 'mithril-utilities';
import {
  match,
  P
} from 'ts-pattern';

export default class Record extends RecordPage<Anagrafica> {
  recordType = Anagrafica;

  datiAnagraficiState = {
    tipologia: Stream<AnagraficaAttributes['tipologia']>(),
    tipo: Stream<AnagraficaAttributes['tipo']>(),
    denominazione: Stream<string>(),
    nome: Stream<string>(),
    cognome: Stream<string>()
  };

  datiRecapitoState = {
    indirizzo: Stream<string>(),
    citta: Stream<string>(),
    provincia: Stream<string>(),
    nazione: Stream<CountryCode>(),
    cap: Stream<string>(),
    telefono: Stream<string>(),
    cellulare: Stream<string>(),
    email: Stream<string>(),
    pec: Stream<string>(),
    sitoWeb: Stream<string>()
  };

  datiAziendaState = {
    partitaIva: Stream<string>(),
    codiceDestinatario: Stream<string>()
  };

  datiPrivatoState = {
    codiceFiscale: Stream<string>()
  };

  async oninit(vnode: Vnode<RecordPageAttributes<Anagrafica>, this>) {
    await super.oninit(vnode);
    this.datiAnagraficiState.tipologia.map((tipologia) => {
      m.redraw();
      return tipologia;
    });
  }

  modelQuery(): Builder<Anagrafica> {
    return super.modelQuery().with(['privato', 'azienda']);
  }

  isPrivato(): boolean {
    return this.datiAnagraficiState.tipologia() === 'PRIVATO';
  }

  async loadRecord(recordId?: number | string): Promise<void> {
    await super.loadRecord(recordId);

    if (this.record && !this.record.isNew()) {
      this.datiAnagraficiState.tipologia(this.record.getAttribute('tipologia'));
      this.datiAnagraficiState.tipo(this.record.getAttribute('tipo'));

      for (const [key, value] of Object.entries(this.datiRecapitoState)) {
        value(this.record.getAttribute(key) as string);
      }

      const istanza = this.record.getIstanza();
      match(istanza)
        .with(P.instanceOf(Azienda), (azienda: Azienda) => {
          this.datiAnagraficiState.denominazione(azienda.getAttribute('denominazione'));
          this.datiAziendaState.partitaIva(azienda.getAttribute('partitaIva'));
          this.datiAziendaState.codiceDestinatario(azienda.getAttribute('codiceDestinatario'));
        })
        .with(P.instanceOf(Privato), (privato: Privato | undefined) => {
          this.datiPrivatoState.codiceFiscale(privato!.getAttribute('codiceFiscale'));
          this.datiAnagraficiState.nome(privato!.getAttribute('nome'));
          this.datiAnagraficiState.cognome(privato!.getAttribute('cognome') ?? '');
        })
        .otherwise(() => {});
      m.redraw();
    }
  }

  contents(vnode: Vnode<RecordPageAttributes<Anagrafica>>): Children {
    const state = {
      ...this.datiAnagraficiState,
      ...this.datiRecapitoState,
      ...this.datiAziendaState,
      ...this.datiPrivatoState
    };
    return (
      <>
        <Form state={state} onsubmit={this.onFormSubmit.bind(this)} additionalElementsSelector="md-filled-select">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {super.contents(vnode)}
            {this.datiAnagrafici()}
            {this.datiRecapito()}
          </div>
          <md-layout-grid>
            {this.datiAzienda()}
            {this.datiPrivato()}
          </md-layout-grid>
          <md-text-button>
          </md-text-button>
          <md-filled-button type="submit" style={{float: 'right'}}>
            {__('Salva')}
            <MdIcon icon={mdiContentSaveOutline} slot="icon"/>
          </md-filled-button>
        </Form>
      </>
    );
  }

  datiAnagrafici(): Children {
    return (
      <>
        {/*<md-outlined-card>*/}
          <h4 style={{marginLeft: '16px'}}>{__('Dati anagrafici')}</h4>
          <md-layout-grid>
            {this.datiAnagraficiFields().values().all()}
          </md-layout-grid>
        {/*</md-outlined-card>*/}
      </>
    );
  }

  datiAnagraficiFields(): Collection<Children> {
    return collect({
      tipologia: (
        <md-filled-select label={__('Tipologia')} name="tipologia" required grid-span={6}>
          <MdIcon icon={mdiShapeOutline} slot="leadingicon"/>
          <md-select-option headline={__('Privato')} value="PRIVATO"/>
          <md-select-option headline={__('Azienda')} value="AZIENDA"/>
          <md-select-option headline={__('Ente')} value="ENTE"/>
        </md-filled-select>
      ),
      tipo: (
        <md-filled-select label={__('Tipo')} name="tipo" required grid-span={6}>
          <md-select-option headline={__('Fornitore')} value="FORNITORE"/>
          <md-select-option headline={__('Cliente')} value="CLIENTE"/>
        </md-filled-select>
      ),
      denominazione: (
        <md-filled-text-field label={__('Ragione sociale')} name="denominazione" grid-span={4} required={!this.isPrivato()} disabled={this.isPrivato()}>
          <MdIcon icon={mdiDomain} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      nome: <md-filled-text-field label={__('Nome')} name="nome" grid-span={4} required={this.isPrivato()} disabled={!this.isPrivato()}/>,
      cognome: <md-filled-text-field label={__('Cognome')} name="cognome" grid-span={4} required={this.isPrivato()} disabled={!this.isPrivato()}/>
    });
  }

  datiRecapito(): Children {
    return (
      <>
        {/*<md-outlined-card>*/}
          <h4 style={{marginLeft: '16px'}}>{__('Dati di recapito')}</h4>
          <md-layout-grid>
            {this.datiRecapitoFields().values().all()}
          </md-layout-grid>
        {/*</md-outlined-card>*/}
      </>
    );
  }

  datiRecapitoFields(): Collection<Children> {
    return collect({
      indirizzo: (
        <md-filled-text-field label={__('Indirizzo')} name="indirizzo" grid-span={6}>
          <MdIcon icon={mdiMapMarkerOutline} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      citta: (
        <md-filled-text-field label={__('Città')} name="citta" grid-span={6}>
          <MdIcon icon={mdiCityVariantOutline} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      cap: <md-filled-text-field label={__('CAP')} name="cap" grid-span={2}/>,
      provincia: <md-filled-text-field label={__('Provincia')} name="provincia" grid-span={2}/>,
      nazione: (
        <md-filled-select label={__('Nazione')} name="nazione" grid-span={2}>
          <MdIcon icon={mdiFlagVariantOutline} slot="leadingicon"/>
          {Object.values(getAllCountries()).map((country) => (
            <md-select-option key={country.id} headline={country.name} value={country.id}/>
          ))}
        </md-filled-select>
      ),
      telefono: (
        <md-filled-text-field label={__('Telefono')} name="telefono" grid-span={3}>
          <MdIcon icon={mdiPhoneClassic} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      cellulare: (
        <md-filled-text-field label={__('Cellulare')} name="cellulare" grid-span={3}>
          <MdIcon icon={mdiCellphone} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      email: (
        <md-filled-text-field label={__('Email')} name="email" grid-span={4}>
          <MdIcon icon={mdiEmailOutline} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      pec: (
        <md-filled-text-field label={__('PEC')} name="pec" grid-span={4}>
          <MdIcon icon={mdiEmailSealOutline} slot="leadingicon"/>
        </md-filled-text-field>
      ),
      sitoWeb: (
        <md-filled-text-field label={__('Sito web')} name="sitoWeb" grid-span={4}>
          <MdIcon icon={mdiWeb} slot="leadingicon"/>
        </md-filled-text-field>
      )
    });
  }

  datiAzienda(): Children {
    return (
      <div grid-span={6}>
        {/*<md-outlined-card>*/}
          <h4 style={{marginLeft: '16px'}}>{__('Dati azienda')}</h4>
          <md-layout-grid>
            {this.datiAziendaFields().values().all()}
          </md-layout-grid>
        {/*</md-outlined-card>*/}
      </div>
    );
  }

  datiAziendaFields(): Collection<Children> {
    return collect({
      partitaIva: (
        <md-filled-text-field label={__('Partita IVA')} name="partitaIva" grid-span={6} required={!this.isPrivato()} disabled={this.isPrivato()}/>
      ),
      codiceDestinatario: (
        <md-filled-text-field label={__('Codice destinatario')} name="codiceDestinatario" grid-span={6} minLength={7} maxLength={7} required={!this.isPrivato()} disabled={this.isPrivato()}/>
      )
    });
  }

  datiPrivato(): Children {
    return (
      <div grid-span={6}>
        {/*<md-outlined-card>*/}
          <h4 style={{marginLeft: '16px'}}>{__('Dati privato')}</h4>
          <md-layout-grid-inner>
            {this.datiPrivatoFields().values().all()}
          </md-layout-grid-inner>
        {/*</md-outlined-card>*/}
      </div>
    );
  }

  datiPrivatoFields(): Collection<Children> {
    return collect({
      codiceFiscale: <md-filled-text-field label={__('Codice fiscale')} name="codiceFiscale" grid-span={6} minLength={16} maxLength={16} required={this.isPrivato()} disabled={!this.isPrivato()}/>
    });
  }

  async onFormSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    if (isFormValid(document.querySelector('form')!)) {
      await this.save();
    }
  }

  async save() {
    this.record?.setAttributes({
      tipo: this.datiAnagraficiState.tipo(),
      tipologia: this.datiAnagraficiState.tipologia(),
      ...collect<Stream<string>>(this.datiRecapitoState).map((state) => state()).all()
    });

    const relationName = this.isPrivato() ? 'privato' : 'azienda';
    let relationModel = this.record?.getRelation(relationName);
    if (!relationModel) {
      relationModel = relationName === 'privato' ? new Privato() : new Azienda();
    }
    relationModel.setAttributes({
      denominazione: this.datiAnagraficiState.denominazione(),
      nome: this.datiAnagraficiState.nome(),
      cognome: this.datiAnagraficiState.cognome(),
      partitaIva: this.datiAziendaState.partitaIva(),
      codiceDestinatario: this.datiAziendaState.codiceDestinatario(),
      codiceFiscale: this.datiPrivatoState.codiceFiscale()
    });

    // Save models
    try {
      const response = await relationModel.save();
      if (response.getModelId()) {
        this.record?.setRelation(relationName, relationModel);
        console.log(this.record?.getAttributes(), this.record!.getRelations());
        const saveResponse = await this.record?.save();
        if (saveResponse?.getModelId()) {
          void showSnackbar(__('Salvataggio effettuato'));
        }
      }
    } catch (error: any) {
      const apiError = error as RequestError<JSONAPI.RequestError['response'] & {message: string}>;
      void showSnackbar(__('Errore durante il salvataggio: :error', {error: apiError.response.message}));
    }
  }
}

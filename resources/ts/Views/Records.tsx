import Anagrafica from '@anagrafiche/Models/Anagrafica';
import RecordsTableColumn from '@osm/Components/DataTable/RecordsTableColumn';
import RecordsPage from '@osm/Components/Pages/RecordsPage';
import collect, {Collection} from 'collect.js';
import {
  Children
} from 'mithril';

export default class Records extends RecordsPage<Anagrafica> {
  title = __('Anagrafiche');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  modelType = Anagrafica;
  recordPageRouteName = 'anagrafiche.show';

  tableColumns(): Collection<Children> {
    return collect({
      denominazione: <RecordsTableColumn name="denominazione">{__('Ragione sociale')}</RecordsTableColumn>,
      tipo: <RecordsTableColumn name="tipo">{__('Tipo')}</RecordsTableColumn>,
      tipologia: <RecordsTableColumn name="tipologia">{__('Tipologia')}</RecordsTableColumn>,
      citta: <RecordsTableColumn name="citta">{__('Città')}</RecordsTableColumn>,
      telefono: <RecordsTableColumn name="telefono">{__('Telefono')}</RecordsTableColumn>,
      createdAt: <RecordsTableColumn name="created_at">{__('Creato il')}</RecordsTableColumn>,
      updatedAt: <RecordsTableColumn name="updated_at">{__('Aggiornato il')}</RecordsTableColumn>
    });
  }

  protected cellValueModifier(value: any, attribute: string, record: Anagrafica) {
    return super.cellValueModifier(value, attribute, record)
      .with('denominazione', () => record.getIstanza()?.denominazione);
  }

  modelQuery() {
    return super.modelQuery()
      .with(['privato', 'azienda']);
  }
}

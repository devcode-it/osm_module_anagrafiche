/**
 * Questo file viene utilizzato per tutte le operazioni da eseguire prima del caricamento e del rendering del componente
 * principale di OpenSTAManager.
 * Ad esempio, è possibile utilizzare questo file per inizializzare librerie esterne, utilizzare funzioni extend, override, ecc.
 * Se non utilizzato, il file può essere eliminato.
 */

import {
  mdiAccountGroupOutline
} from '@mdi/js';
import {manageDrawerEntries} from '@osm/Components/extend/utils';
import {DrawerItem} from '@osm/Components/layout/DrawerItem';

manageDrawerEntries((entries) => entries
  .put('anagrafiche', <DrawerItem href={route('anagrafiche.index')} icon={mdiAccountGroupOutline}>{__('Anagrafiche')}</DrawerItem>));

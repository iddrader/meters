import { t } from 'mobx-state-tree';

export const PaginationModel = t.model('AreaModel', {
  currentPage: t.number,
});

import { t } from 'mobx-state-tree';

export const HouseModel = t.model('HouseModel', {
  address: t.string,
  id: t.string,
  fias_addrobjs: t.array(t.string),
});

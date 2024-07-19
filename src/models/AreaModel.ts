import { Instance, t } from 'mobx-state-tree';
import { HouseModel } from './HouseModel';

export const AreaModel = t.model('AreaModel', {
  id: t.maybeNull(t.string),
  number: t.maybeNull(t.number),
  str_number: t.maybeNull(t.string),
  str_number_full: t.maybeNull(t.string),
  house: t.maybeNull(HouseModel),
});

export type AreaModelType = Instance<typeof AreaModel>;

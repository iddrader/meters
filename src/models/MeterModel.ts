import { Instance, t } from 'mobx-state-tree';
import { AreaModel } from './AreaModel';

export const MeterModel = t.model('MeterModel', {
  id: t.string,
  _type: t.maybeNull(t.array(t.string)),
  area: t.maybeNull(AreaModel),
  is_automatic: t.maybeNull(t.boolean),
  communication: t.maybeNull(t.string),
  description: t.maybeNull(t.string),
  serial_number: t.maybeNull(t.string),
  installation_date: t.maybeNull(t.string),
  brand_name: t.maybeNull(t.string),
  model_name: t.maybeNull(t.string),
  initial_values: t.maybeNull(t.array(t.number)),
});

export type MeterModelType = Instance<typeof MeterModel>;

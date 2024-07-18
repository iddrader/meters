import { Instance, t } from 'mobx-state-tree';
import { MeterModel, MeterModelType } from './MeterModel';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
  })
  .actions((store) => ({
    updateMeters(meters: MeterModelType[]) {
      store.meters.replace(meters);
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) rootStore = RootStore.create();
  return rootStore;
}

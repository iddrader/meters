import { Instance, t } from 'mobx-state-tree';
import { MeterModel, MeterModelType } from './MeterModel';
import { PaginationModel } from './PaginationModel';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
    page: PaginationModel,
  })
  .actions((store) => ({
    updateMeters(meters: MeterModelType[]) {
      store.meters.replace(meters);
    },
    setPage(page: number) {
      store.page.currentPage = page;
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore)
    rootStore = RootStore.create({
      meters: [],
      page: {
        currentPage: 1,
      },
    });
  return rootStore;
}

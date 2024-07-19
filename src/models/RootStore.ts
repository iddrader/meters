import { Instance, t } from 'mobx-state-tree';
import { MeterModel, MeterModelType } from './MeterModel';
import { PaginationModel } from './PaginationModel';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
    page: PaginationModel,
    isLoading: t.boolean,
  })
  .actions((store) => ({
    updateMeters(meters: MeterModelType[]) {
      store.meters.replace(meters);
    },
    addMeter(meter: MeterModelType) {
      store.meters.push(meter);
    },
    removeMeter(meter: MeterModelType) {
      store.meters.remove(meter);
    },
    setPage(page: number) {
      store.page.currentPage = page;
    },
    setIsLoading(isLoading: boolean) {
      store.isLoading = isLoading;
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
      isLoading: false,
    });
  return rootStore;
}

import { Instance, t } from 'mobx-state-tree';
import { MeterModel, MeterModelType } from './MeterModel';
import { PaginationModel } from './PaginationModel';
import { AreaModel, AreaModelType } from './AreaModel';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
    page: PaginationModel,
    isLoading: t.boolean,
    areas: t.array(AreaModel),
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
    addArea(area: AreaModelType) {
      store.areas.push(area);
    },
    setArea(area: AreaModelType, meterID: string) {
      const meter = store.meters.find((meter) => meter.id === meterID);
      if (meter) meter.setArea(area);
    },
  }))
  .views((self) => ({
    getAreaById(id: string | null) {
      return self.areas.find((element) => element.id === id);
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
      areas: [],
    });
  return rootStore;
}

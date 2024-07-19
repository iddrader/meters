import MetersTable from './components/MetersTable';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { useStore } from './models/RootStore';
import { observer } from 'mobx-react-lite';
import Loader from './components/Loader';
import { MeterModelType } from './models/MeterModel';

const App = observer(() => {
  const rootStore = useStore();
  const [metersCount, setMetersCount] = useState(0);

  const fetchMeters = async () => {
    await fetch(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=${20}&offset=${(rootStore.page.currentPage - 1) * 20}`
    )
      .then((response) => response.json())
      .then((data) => {
        rootStore.updateMeters(data.results);
        setMetersCount(parseInt(data.count));
        data.results.forEach((meter: MeterModelType) => {
          // const existingArea = rootStore.getAreaById(meter.area!.id);
          // if (!existingArea) {
          fetch(
            `http://showroom.eis24.me/api/v4/test/areas/?id__in=${meter.area!.id}`
          )
            .then((response) => response.json())
            .then((data) => {
              rootStore.addArea(data.results[0]);
              rootStore.setArea(data.results[0], meter.id);
            });
          // } else {
          //   rootStore.setArea(existingArea, meter.id);
          // }
        });
      })
      .then(() => rootStore.setIsLoading(false));
  };

  useEffect(() => {
    rootStore.setIsLoading(true);
    fetchMeters();
  }, [rootStore.page.currentPage]);

  return (
    <div className="container">
      {rootStore.isLoading && <Loader />}
      <div className="header">Список счётчиков</div>
      <MetersTable />
      <Footer metersCount={metersCount} />
    </div>
  );
});

export default App;

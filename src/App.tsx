import MetersTable from './components/MetersTable';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { useStore } from './models/RootStore';
import { observer } from 'mobx-react-lite';
import Loader from './components/Loader';

const App = observer(() => {
  const rootStore = useStore();
  const [metersCount, setMetersCount] = useState(0);

  useEffect(() => {
    rootStore.setIsLoading(true);
    fetch(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=${20}&offset=${(rootStore.page.currentPage - 1) * 20}`
    )
      .then((response) => response.json())
      .then((data) => {
        rootStore.updateMeters(data.results);
        setMetersCount(parseInt(data.count));
      })
      .then(() => rootStore.setIsLoading(false));
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

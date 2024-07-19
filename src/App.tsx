import MetersTable from './components/MetersTable';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { useStore } from './models/RootStore';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const rootStore = useStore();
  const [metersCount, setMetersCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=${20}&offset=${(rootStore.page.currentPage - 1) * 20}`
    )
      .then((response) => response.json())
      .then((data) => {
        rootStore.updateMeters(data.results);
        setMetersCount(parseInt(data.count));
      });
  }, [rootStore.page.currentPage]);
  return (
    <div className="container">
      <div className="header">Список счётчиков</div>
      <MetersTable />
      <Footer metersCount={metersCount} />
    </div>
  );
});

export default App;

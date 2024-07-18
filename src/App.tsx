import MetersTable from './components/MetersTable';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { useStore } from './models/RootStore';

function App() {
  const rootStore = useStore();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=${20}&offset=${currentPage * 20}`
    )
      .then((response) => response.json())
      .then((data) => rootStore.updateMeters(data.results));
  }, []);
  return (
    <div className="container">
      <div className="header">Список счётчиков</div>
      <MetersTable />
      <Footer />
    </div>
  );
}

export default App;

import MetersTable from './components/MetersTable';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { IMetric } from './types';

function App() {
  const [metrics, setMetrics] = useState<IMetric[]>();

  useEffect(() => {
    fetch(
      `http://showroom.eis24.me/api/v4/test/meters/?limit=${20}&offset=${0}`
    )
      .then((response) => response.json())
      .then((data) => setMetrics(data.results));
  });
  return (
    <div className="container">
      <div className="header">Список счётчиков</div>
      {metrics && <MetersTable metrics={metrics} />}
      <Footer />
    </div>
  );
}

export default App;

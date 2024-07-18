import { IMetric } from '../types';

type MetersTableProps = {
  metrics: IMetric[];
};

const MetersTable = ({ metrics }: MetersTableProps) => {
  return (
    <table className="metrics-table">
      <thead className="metrics-table__header">
        <th>№</th>
        <th>Тип</th>
        <th>Дата установки</th>
        <th>Автоматический</th>
        <th>Текущие показания</th>
        <th>Адрес</th>
        <th>Примечания</th>
      </thead>
      {metrics.map((metric, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{metric._type}</td>
          <td>{metric.installation_date}</td>
          <td>{metric.is_automatic ? 'Да' : 'Нет'}</td>
          <td>{metric.initial_values}</td>
          <td>{metric.area.id}</td>
          <td>{metric.description}</td>
        </tr>
      ))}
    </table>
  );
};

export default MetersTable;

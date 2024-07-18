import '../assets/styles/MetersTable.css';
import ColdWaterAreaMeter from '/ColdWaterAreaMeter.svg';
import HotWaterAreaMeter from '/HotWaterAreaMeter.svg';
import RemoveButton from '/remove-button.svg';
import { useStore } from '../models/RootStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const MetersTable = observer(() => {
  const meters = useStore().meters;

  useEffect(() => {}, [meters]);

  return (
    <table className="meters-table">
      <thead className="meters-table__header">
        <th>№</th>
        <th>Тип</th>
        <th>Дата установки</th>
        <th>Автоматический</th>
        <th>Текущие показания</th>
        <th>Адрес</th>
        <th>Примечания</th>
        {/* remove metric button */}
        <th></th>
      </thead>
      {meters.map((meter, index) => (
        <tr key={meter.id} className="meters-table__row">
          <td className="text-light">{index + 1}</td>
          {meter._type![0] == 'ColdWaterAreaMeter' ? (
            <td className="row-type">
              <img src={HotWaterAreaMeter} className="icon" />
              <span>ХВС</span>
            </td>
          ) : (
            <td className="row-type">
              <img src={ColdWaterAreaMeter} className="icon" />
              <span>ГВС</span>
            </td>
          )}
          <td>{meter.installation_date}</td>
          <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
          <td>{meter.initial_values}</td>
          <td>{meter.area?.id}</td>
          <td>{meter.description}</td>
          <td className="remove-button" data-id={meter.id}>
            <img src={RemoveButton} />
          </td>
        </tr>
      ))}
    </table>
  );
});

export default MetersTable;

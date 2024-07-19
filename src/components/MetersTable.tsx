import '../assets/styles/MetersTable.css';
import ColdWaterAreaMeter from '/ColdWaterAreaMeter.svg';
import HotWaterAreaMeter from '/HotWaterAreaMeter.svg';
import RemoveButton from '/remove-button.svg';
import { useStore } from '../models/RootStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const MetersTable = observer(() => {
  const meters = useStore().meters;
  const page = useStore().page;

  useEffect(() => {}, []);

  const handleRemoveButtonHover = (id: string) => {
    const button = document.querySelector(`.remove-button[data-id="${id}"]`);
    button?.classList.toggle('visible');
  };

  return (
    <div className="table-container">
      <table className="meters-table">
        <thead className="meters-table__header">
          <th>№</th>
          <th>Тип</th>
          <th>Дата установки</th>
          <th>Автоматический</th>
          <th>Текущие показания</th>
          <th>Адрес</th>
          <th>Примечания</th>
          <th></th> {/* remove metric button */}
        </thead>
        {meters.map((meter, index) => (
          <tr
            key={meter.id}
            className="meters-table__row"
            onMouseEnter={() => handleRemoveButtonHover(meter.id)}
            onMouseLeave={() => handleRemoveButtonHover(meter.id)}
          >
            <td className="text-light">
              {(page.currentPage - 1) * 20 + index + 1}
            </td>
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
    </div>
  );
});

export default MetersTable;

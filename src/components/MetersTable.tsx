import '../assets/styles/MetersTable.css';
import ColdWaterAreaMeter from '/ColdWaterAreaMeter.svg';
import HotWaterAreaMeter from '/HotWaterAreaMeter.svg';
import RemoveButton from '/remove-button.svg';
import { useStore } from '../models/RootStore';
import { observer } from 'mobx-react';
import { MeterModelType } from '../models/MeterModel';

const MetersTable = observer(() => {
  const rootStore = useStore();

  const handleRemoveButtonHover = (id: string) => {
    const button = document.querySelector(`.remove-button[data-id="${id}"]`);
    button?.classList.toggle('visible');
  };

  const handleRemoveMeter = async (meter: MeterModelType) => {
    try {
      rootStore.setIsLoading(true);
      await fetch(`http://showroom.eis24.me/api/v4/test/meters/${meter.id}/`, {
        method: 'DELETE',
      }).then(() => rootStore.removeMeter(meter));
      await fetch(
        `http://showroom.eis24.me/api/v4/test/meters/?limit=1&offset=${rootStore.page.currentPage * 20}`
      )
        .then((response) => response.json())
        .then((data) => rootStore.addMeter(data.results[0]))
        .then(() => rootStore.setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
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
        {rootStore.meters.map((meter, index) => (
          <tr
            key={meter.id}
            className="meters-table__row"
            onMouseEnter={() => handleRemoveButtonHover(meter.id)}
            onMouseLeave={() => handleRemoveButtonHover(meter.id)}
          >
            <td className="text-light">
              {(rootStore.page.currentPage - 1) * 20 + index + 1}
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
              <img
                src={RemoveButton}
                onClick={() => handleRemoveMeter(meter)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
});

export default MetersTable;

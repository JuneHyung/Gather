import { useCallback, useEffect, useState } from "react";
import { getChracterEquipment } from "../../api/maple/maple";
import { divideGrade } from "../../api/maple/util";

const EquipmentInfo = ({ ocid }) => {
  const [equipmentInfo, setEquipmentInfo] = useState({});

  const getItemEquipmentInfo = useCallback(async (targetOcid) => {
    try {
      const info = await getChracterEquipment(targetOcid);
      console.log(info);
      setEquipmentInfo(info);
    } catch (e) {
      setEquipmentInfo({});
      const { error } = e.response.data;
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    getItemEquipmentInfo(ocid);
  }, [getItemEquipmentInfo, ocid]);

  return (
    <ul className="equipment-info-list">
      <h1>장비</h1>
      {equipmentInfo.item_equipment !== undefined
        ? equipmentInfo.item_equipment.map((item) => (
            <li key={item.item_equipment_slot} className="equipment-info-item">
              <div className="equipment-img-wrap">
                <div className="equipment-icon">
                  <img src={item.item_icon} alt={`${item.item_name} icon`} />
                </div>
                <div className="equipment-description">
                  <p className="font-bold">{item.item_equipment_slot}</p>
                  <p className="item-name ellipsis-1 font-bold">{item.item_name}</p>
                  <p className="star-force font-bold">★ {item.starforce} </p>
                </div>
              </div>
              <ul className="item-potential-option-list">
                <li className={`item-potential-option-item ${divideGrade(item.potential_option_grade)}`}>{item.potential_option_1}</li>
                <li className={`item-potential-option-item ${divideGrade(item.potential_option_grade)}`}>{item.potential_option_2}</li>
                <li className={`item-potential-option-item ${divideGrade(item.potential_option_grade)}`}>{item.potential_option_3}</li>
              </ul>
            </li>
          ))
        : null}
    </ul>
  );
};

export default EquipmentInfo;

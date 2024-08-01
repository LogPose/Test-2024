import React from "react";
import { TEvent } from "../../types";
import "./styles.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { changeEventModel, deleteEventModel } from "../../model";

interface IListElement {
  data: TEvent;
}

export const ListElement: React.FC<IListElement> = ({ data }) => {
  const handleDeleteClick = () => {
    deleteEventModel.deleteEvent(data.id);
  };

  const handleChangeClick = () => {
    changeEventModel.chooseEventToChange(data);
    changeEventModel.openChangeEvent(true);
  };

  return (
    <div className="flex flex-col items-start border border-blue-200 rounded-xl p-3 min-w-80">
      <div className="flex justify-between w-full">
        <p className="font-bold text-cyan-500">{data.name}</p>
        <div className="flex gap-1">
          <p onClick={handleDeleteClick} className="cursor-pointer">
            <DeleteOutlined />
          </p>
          <p onClick={handleChangeClick} className="cursor-pointer">
            <EditOutlined />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        {data.budget && <p className="infoItem">Budget: {data.budget}</p>}
        {data.address && <p className="infoItem">Address: {data.address}</p>}
        {data.time && <p className="infoItem">Time: {data.time}</p>}
        {data.note && <p className="infoItem">{data.note}</p>}
      </div>
    </div>
  );
};

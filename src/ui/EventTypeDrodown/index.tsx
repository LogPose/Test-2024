import { useField } from "effector-forms";
import React, { useState } from "react";
import { createEventModel } from "../../model";
import { EEventType } from "../../types";
import "./styles.scss";

export const EventTypeDrodown: React.FC = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { value, onChange } = useField(
    createEventModel.createEventForm.fields.type
  );

  const handleHeaderClick = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleValueClick = (value: EEventType) => () => {
    onChange(value);
    setIsOpenDropdown(false);
  };

  return (
    <div className="relative mb-2">
      <div
        onClick={handleHeaderClick}
        className="border cursor-pointer rounded-lg text-center"
      >
        {value ?? "Выберите тип"}
      </div>
      <div data-is-open={isOpenDropdown} className="dropdownContainer">
        {Object.entries(EEventType).map(([key, value]) => (
          <p
            key={value}
            className="cursor-pointer px-1 rounded-lg text-center hover:bg-cyan-700 hover:text-cyan-50"
            onClick={handleValueClick(value)}
          >
            {key}
          </p>
        ))}
      </div>
    </div>
  );
};

import { useField } from "effector-forms";
import React, { useState } from "react";
import { EEventType, IEventTypeDropdown } from "../../types";
import "./styles.scss";

export const EventTypeDrodown: React.FC<IEventTypeDropdown> = ({
  fieldToChange,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { value, onChange } = useField(fieldToChange);

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

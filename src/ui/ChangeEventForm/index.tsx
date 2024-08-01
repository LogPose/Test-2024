import { useUnit } from "effector-react";
import React from "react";
import "./styles.scss";
import { changeEventModel } from "../../model";

export const ChangeEventForm: React.FC = () => {
  const isOpenChangeMode = useUnit(changeEventModel.$isOpenChangeEvent);

  return (
    <div
      data-is-change-mode={isOpenChangeMode}
      className="flex flex-col p-2 border border-lime-500 rounded-xl min-w-[330px] min-h-[330px] overflow-y-auto change-container"
    ></div>
  );
};

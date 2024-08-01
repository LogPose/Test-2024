import { useUnit } from "effector-react";
import React from "react";
import "./styles.scss";
import { changeEventModel } from "../../model";
import { useForm } from "effector-forms";
import { EventTypeDrodown } from "../EventTypeDrodown";
import { EEventType } from "../../types";

export const ChangeEventForm: React.FC = () => {
  const isOpenChangeMode = useUnit(changeEventModel.$isOpenChangeEvent);

  const { fields, errorText, isValid } = useForm(
    changeEventModel.changeEventForm
  );

  const handleSaveClick = () => {
    changeEventModel.saveChangedEvent();
    changeEventModel.openChangeEvent(false);
  };

  const handleCancelClick = () => {
    changeEventModel.openChangeEvent(false);
  };

  const isSubmitDisabled =
    !isValid ||
    !fields.eventName.value ||
    !fields.type.value ||
    (fields.type.value === EEventType.Chores && !fields.note.value) ||
    (fields.type.value === EEventType.DayEvent &&
      !fields.address.value &&
      !fields.time.value) ||
    (fields.type.value === EEventType.Holiday && !fields.budget.value);

  return (
    <div
      data-is-change-mode={isOpenChangeMode}
      className="flex flex-col p-2 border border-lime-500 rounded-xl min-w-[330px] min-h-[330px] overflow-y-auto change-container"
    >
      <div className="mb-2">
        <p>Название меропяриятия:</p>
        <input
          value={fields.eventName.value}
          onChange={(event) => fields.eventName.onChange(event.target.value)}
          className="change-input"
          data-with-error={Boolean(errorText("eventName"))}
        />
        {errorText("eventName") && (
          <p className="text-red-400 text-xs">{errorText("eventName")}</p>
        )}
      </div>
      <div>
        <p>Тип мероприятия:</p>
        <EventTypeDrodown
          fieldToChange={changeEventModel.changeEventForm.fields.type}
        />
      </div>
      {fields.type.value && fields.type.value === EEventType.Holiday && (
        <div className="mb-2">
          <p>Бюджет?</p>
          <input
            value={fields.budget.value}
            onChange={(event) => fields.budget.onChange(event.target.value)}
            data-with-error={Boolean(errorText("budget"))}
            className="change-input"
          />
          {errorText("budget") && (
            <p className="text-red-400 text-xs">{errorText("budget")}</p>
          )}
        </div>
      )}

      {fields.type.value && fields.type.value === EEventType.DayEvent && (
        <div className="mb-2">
          <div>
            <p>Где?</p>
            <input
              value={fields.address.value}
              onChange={(event) => fields.address.onChange(event.target.value)}
              data-with-error={Boolean(errorText("address"))}
              className="change-input"
            />
            {errorText("address") && (
              <p className="text-red-400 text-xs">{errorText("address")}</p>
            )}
          </div>
          <div>
            <p>Во сколько?</p>
            <input
              value={fields.time.value}
              onChange={(event) => fields.time.onChange(event.target.value)}
              data-with-error={Boolean(errorText("time"))}
              className="change-input"
            />
            {errorText("time") && (
              <p className="text-red-400 text-xs">{errorText("time")}</p>
            )}
          </div>
        </div>
      )}

      {fields.type.value && fields.type.value === EEventType.Chores && (
        <div className="mb-2">
          <p>Не забыть:</p>
          <input
            value={fields.note.value}
            onChange={(event) => fields.note.onChange(event.target.value)}
            data-with-error={Boolean(errorText("note"))}
            className="change-input"
          />
          {errorText("note") && (
            <p className="text-red-400 text-xs">{errorText("note")}</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-auto">
        <button
          onClick={handleCancelClick}
          className="bg-red-400 hover:bg-red-300 p-2 rounded-2xl"
        >
          Отмена
        </button>
        <button
          disabled={isSubmitDisabled}
          onClick={handleSaveClick}
          className="bg-green-300 hover:bg-green-400 disabled:bg-gray-500 transition disabled:text-gray-200 p-2 rounded-2xl"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

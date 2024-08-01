import React from "react";
import { EventTypeDrodown } from "../EventTypeDrodown";
import { useForm } from "effector-forms";
import { createEventModel } from "../../model";
import { EEventType } from "../../types";
import "./styles.scss";
import { useUnit } from "effector-react";

export const CreateEventForm: React.FC = () => {
  const isOpenCreateMode = useUnit(createEventModel.$isOpenCreateEvent);
  const { fields, errorText, isValid } = useForm(
    createEventModel.createEventForm
  );

  const handleCancelClick = () => {
    createEventModel.openCreateEvent(false);
  };

  const handleCreateClick = () => {
    createEventModel.openCreateEvent(false);
    createEventModel.createClick();
  };

  const isSubmitDisabled =
    !isValid ||
    !fields.eventName.value ||
    !fields.type.value ||
    (fields.type.value === EEventType.Chores && !fields.note.value) ||
    (fields.type.value === EEventType.DayEvent &&
      (!fields.address.value || !fields.time.value)) ||
    (fields.type.value === EEventType.Holiday && !fields.budget.value);

  return (
    <div
      data-is-create-mode={isOpenCreateMode}
      className="flex flex-col p-2 border border-blue-500 rounded-xl min-w-[330px] min-h-[330px] overflow-y-auto create-container"
    >
      <div className="mb-2">
        <p>Название меропяриятия:</p>
        <input
          value={fields.eventName.value}
          onChange={(event) => fields.eventName.onChange(event.target.value)}
          className="create-input"
          data-with-error={Boolean(errorText("eventName"))}
        />
        {errorText("eventName") && (
          <p className="text-red-400 text-xs">{errorText("eventName")}</p>
        )}
      </div>
      <div>
        <p>Тип мероприятия:</p>
        <EventTypeDrodown
          fieldToChange={createEventModel.createEventForm.fields.type}
        />
      </div>
      {fields.type.value && fields.type.value === EEventType.Holiday && (
        <div className="mb-2">
          <p>Бюджет?</p>
          <input
            type="number"
            onChange={(event) => fields.budget.onChange(event.target.value)}
            data-with-error={Boolean(errorText("budget"))}
            className="create-input"
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
              onChange={(event) => fields.address.onChange(event.target.value)}
              data-with-error={Boolean(errorText("address"))}
              className="create-input"
            />
            {errorText("address") && (
              <p className="text-red-400 text-xs">{errorText("address")}</p>
            )}
          </div>
          <div>
            <p>Во сколько?</p>
            <input
              type="number"
              onChange={(event) => fields.time.onChange(event.target.value)}
              data-with-error={Boolean(errorText("time"))}
              className="create-input"
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
            onChange={(event) => fields.note.onChange(event.target.value)}
            data-with-error={Boolean(errorText("note"))}
            className="create-input"
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
          onClick={handleCreateClick}
          disabled={isSubmitDisabled}
          className="bg-green-300 hover:bg-green-400 disabled:bg-gray-500 transition disabled:text-gray-200 p-2 rounded-2xl"
        >
          Создать
        </button>
      </div>
    </div>
  );
};

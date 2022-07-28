import React, { useState, useEffect, useMemo } from "react";

import DropDown from "./components/drop-down/drop-down";

import styles from "./filter.module.css";

type Props = {
  changeFilter: (filter: IFilterCondition) => void;
};

const fieldsList = new Map([
  ["name", "Имя"],
  ["amount", "Количество"],
  ["distance", "Расстояние"],
]);

const conditionsInt = new Map([
  ["equals", "Равно"],
  ["smaller", "Меньше"],
  ["bigger", "Больше"],
]);

export function Filter({ changeFilter }: Props) {
  const [field, setField] = useState("name");
  const [condition, setCondition] = useState("contains");
  const [value, setValue] = useState("");

  const conditions = useMemo(() => {
    if (field === "name") {
      return new Map([["contains", "Включает"]]);
    }
    return conditionsInt;
  }, [field]);

  useEffect(() => {
    if (field && condition) {
      changeFilter({
        field,
        condition,
        value,
      });
    }
  }, [condition, field, value]);

  return (
    <div className={styles["filter-container"]}>
      <h2>Фильтр</h2>
      <div className={styles["filter"]}>
        <DropDown
          label="Поле"
          options={fieldsList}
          value={field}
          changeField={setField}
          changeCondition={setCondition}
          changeValue={setValue}
        />
        <DropDown
          label="Условие"
          options={conditions}
          value={condition}
          changeField={setCondition}
        />
        <div className={styles["input-container"]}>
          <p>Значение</p>
          <input
            className={styles["input"]}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";

import styles from "./drop-down.module.css";

type Props = {
  label: string;
  options: Map<string, string>;
  value: string;
  changeField: (value: string) => void;
  changeCondition?: (value: string) => void;
  changeValue?: (value: string) => void;
};

export default function DropDown({
  label,
  options,
  value,
  changeField,
  changeCondition,
  changeValue,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    changeField(value);

    if (changeCondition) {
      if (value === "name") {
        changeCondition("contains");
      } else {
        changeCondition("equals");
      }
    }

    if (changeValue) {
      changeValue("");
    }
  };

  return (
    <div className={styles["drop-down-container"]}>
      <div className={styles["drop-down"]}>
        <p>{label}</p>
        <select
          className={styles["select"]}
          value={value}
          onChange={handleChange}
        >
          {[...options].map((option, i) => {
            return (
              <option
                className={styles["option_font"]}
                value={option[0]}
                key={i}
              >
                {option[1]}
              </option>
            );
          })}
        </select>
        <span className={styles["focus"]}></span>
      </div>
    </div>
  );
}

import React, { useMemo } from "react";

import { convertStringToDate } from "../../utils/utils";

import styles from "./custom-table.module.css";

type Props = {
  data: IDataRow[];
  pagesAmount: number;
  currentPage: number;
  changePage: (offset: number) => void;
};

export function CustomTable({
  data,
  pagesAmount,
  currentPage,
  changePage,
}: Props) {
  const pages = useMemo(
    () => Array.from(Array(pagesAmount)).map((_, i) => (i + 1) * 10),
    [pagesAmount]
  );

  return (
    <div className={styles["container"]}>
      <table className={styles["table"]}>
        <thead>
          <tr>
            <th className={styles["table-date-field"]}>Дата</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Расстояние</th>
          </tr>
        </thead>

        <tbody>
          {data.length >= 1 &&
            data.map((item, i) => (
              <tr key={i}>
                <td>{convertStringToDate(item.date)}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.distance}</td>
              </tr>
            ))}
          {data.length < 1 && (
            <>
              <tr>
                <td className={styles["not-found"]} colSpan={100}>
                  Ничего не найдено
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <div className={styles["page-controls-container"]}>
        {pagesAmount > 1 && (
          <div className={styles["page-controls"]}>
            {pages.map((item, i) => (
              <button
                className={`${styles["page-button"]} ${
                  currentPage === i + 1 ? styles["page-button_active"] : ""
                } noselect`}
                key={i}
                onClick={() => changePage(item)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

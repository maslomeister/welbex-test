import React, { useEffect, useState } from "react";
import axios from "axios";

import { CustomTable } from "../../component/custom-table/custom-table";
import { Filter } from "../../component/filter/filter";

import styles from "./start.module.css";

const endpoint = process.env.REACT_API_URL
  ? process.env.REACT_API_URL
  : "http://localhost:5000/api";

export function Start() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IData>({} as IData);
  const [filter, setFilter] = useState<IFilterCondition>({
    field: "",
    condition: "",
    value: "",
  });

  useEffect(() => {
    const params = {
      offset: (currentPage - 1) * 10,
      ...(filter.field ? { field: filter.field } : {}),
      ...(filter.condition ? { condition: filter.condition } : {}),
      ...(filter.value ? { value: filter.value } : {}),
    };

    const loadData = async () => {
      const res = await axios.get(`${endpoint}/data`, { params });
      setData(res.data);
    };

    loadData().catch((err) =>
      console.log("Something went wrong while getting data from api", err)
    );
  }, [currentPage, filter.condition, filter.field, filter.value]);

  const changePage = (offset: number) => {
    setCurrentPage(offset / 10);
  };

  const changeFilter = (filter: IFilterCondition) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className={styles["container"]}>
      {data && data.data && (
        <>
          <CustomTable
            data={data.data}
            pagesAmount={data.pages}
            currentPage={currentPage}
            changePage={changePage}
          />
          <Filter changeFilter={changeFilter} />
        </>
      )}
    </div>
  );
}

import React from "react";
import styles from "./app.module.css";

import { Start } from "../../pages/start/start";

export function App() {
  return (
    <div className={styles["app"]}>
      <Start />
    </div>
  );
}

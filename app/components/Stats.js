import React from 'react';

import styles from './Stats.css';

const TOTAL = 12;

export default function Stats({ total, series }) {
  const tomato = <img src="/tomato.png" alt="tomato" />;

  const totalPart = total / TOTAL;
  const width = totalPart > 1 ? '300px' : `${totalPart * 300}px`;

  return [
    <p className={styles.seriesTitle} key="series-title">
      Series
    </p>,

    <div className={styles.seriesRow} key="series-row">
      {series > 0 ? tomato : <div className={styles.series} />}

      {series > 1 ? tomato : <div className={styles.series} />}

      {series > 2 ? tomato : <div className={styles.series} />}

      {series > 3 ? tomato : <div className={styles.series} />}
    </div>,

    <p className={styles.seriesTitle} key="total-title">
      Total: {total} / {TOTAL}
    </p>,

    <div className={styles.totalRow} key="total-row">
      <div className={styles.total} style={{ width }} />
    </div>
  ];
}

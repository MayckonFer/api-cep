import React from 'react';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.containerHeader}>
      <div className={styles.contentHeader}>
        <h1 className={styles.titleHeader}>Api Cep</h1>
      </div>
    </header>
  );
}

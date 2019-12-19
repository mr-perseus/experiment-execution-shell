import React from 'react';
import styles from './Description.css';

export default ({ children }: object) => {
  return <p className={styles.description}>{children}</p>;
};

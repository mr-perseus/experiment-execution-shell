import React from 'react';
import styles from './Form.css';

type FormProps = {
  children: string
};

export const Form = ({ children }: FormProps) => {
  return <form className={styles.basicForm}>{children}</form>;
};

type FormGroupProps = {
  children: string
};

export const FormGroup = ({ children }: FormGroupProps) => {
  return (
    <>
      <div className={styles.formGroup}>{children}</div>
    </>
  );
};

type FieldSetProps = {
  children: string,
  title: string
};

export const FieldSet = ({ children, title }: FieldSetProps) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDispatch, useUserState } from '../utils/userContext';
import { FieldSet, FormGroup } from './elements/Form';

export default () => {
  const dispatch = useUserDispatch();
  const user = useUserState();
  const { t } = useTranslation();

  const handleChange = event => {
    const payload = {};
    payload[event.target.name] = event.target.value;
    dispatch({ type: 'change', payload });
  };

  return (
    <>
      <FieldSet title={t('PatientData.Title')}>
        <FormGroup>
          <label htmlFor="patient-id">{t('PatientData.PatientId')}</label>
          <input
            type="text"
            id="patient-id"
            name="id"
            onChange={handleChange}
            value={user.id}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="dateOfBirth">{t('PatientData.DateOfBirth')}</label>
          <input
            id="dateOfBirth"
            onChange={handleChange}
            name="age"
            value={user.age}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="gender">{t('PatientData.Gender')}</label>
          <input
            id="gender"
            name="gender"
            onChange={handleChange}
            value={user.gender}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="yearsOfEducation">
            {t('PatientData.YearsOfEducation')}
          </label>
          <input
            id="yearsOfEduction"
            name="yearsOfEducation"
            onChange={handleChange}
            value={user.yearsOfEducation}
          />
        </FormGroup>
      </FieldSet>
    </>
  );
};

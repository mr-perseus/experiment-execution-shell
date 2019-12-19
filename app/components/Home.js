// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../constants/routes';

export default () => {
  const { t } = useTranslation();

  return (
    <ul>
      <li>
        <h1>{t('Home.Title')}</h1>
      </li>
      <li>
        <Link to={routes.PATIENT_DATA}>{t('Home.Tests')}</Link>
      </li>
      <li>
        <Link to={routes.CONFIG}>{t('Home.Configuration')}</Link>
      </li>
      <li>
        <Link to={routes.HELP}>{t('Home.Help')}</Link>
      </li>
      <li>
        <Link to={routes.HOME}>{t('Home.Exit')}</Link>
      </li>
    </ul>
  );
};

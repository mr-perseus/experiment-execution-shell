// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import Center from '../containers/Center';

export default () => {
  const { t } = useTranslation();

  return (
    <Center>
      <p>
        <i className="fas fa-smile" /> {t('GoodBye.Text')}
      </p>
    </Center>
  );
};

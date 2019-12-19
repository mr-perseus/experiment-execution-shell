import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../constants/routes';
import ControlBar from './elements/NavigationBar';
import { FieldSet, Form, FormGroup } from './elements/Form';
import PatientDataFields from './PatientDataFields';

export default () => {
  const { t } = useTranslation();

  return (
    <Form>
      <PatientDataFields />
      <FieldSet title={t('CompletionPage.Title')}>
        <FormGroup>
          <label htmlFor="correct">{t('CompletionPage.Correct')}</label>
          <input id="correct" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="wrong">{t('CompletionPage.Incorrect')}</label>
          <input id="wrong" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="noAnswer">{t('CompletionPage.Unanswered')}</label>
          <input id="noAnswer" />
        </FormGroup>
      </FieldSet>
      <ControlBar
        next={routes.EXPORT}
        title={t('CompletionPage.ExportButton')}
      />
    </Form>
  );
};

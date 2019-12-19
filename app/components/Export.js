// @flow
import React from 'react';
import { remote, SaveDialogReturnValue } from 'electron';
import * as fs from 'fs';
import { useTranslation } from 'react-i18next';
import { FieldSet, Form } from './elements/Form';
import ControlBar from './elements/NavigationBar';
import routes from '../constants/routes';
import styles from './Export.css';
import { useExperimentResultsState } from '../utils/experimentResultsContext';
import csvCreate, { getExperimentGroupNames } from '../utils/csvCreate';
import type { ExperimentStepResult } from '../utils/configTypes';
import { useUserState } from '../utils/userContext';
import ExportStateFlag from './elements/ExportStateFlag';

export default () => {
  const { t } = useTranslation();
  const [exportFlagMessage, setExportFlagMessage] = React.useState('');
  const [exportSuccessful, setExportSuccessful] = React.useState(true);

  async function exportToCsv(
    experimentResults: ExperimentStepResult[],
    groupName: string,
    userId: string
  ) {
    try {
      const csv = csvCreate(experimentResults, groupName, userId);

      const selectedPath: SaveDialogReturnValue = await remote.dialog.showSaveDialog(
        {
          defaultPath: `${groupName}.csv`
        }
      );

      if (!selectedPath.canceled) {
        fs.writeFileSync(selectedPath.filePath, csv);

        setExportSuccessful(true);
        setExportFlagMessage(t('Export.SuccessFlag'));
      } else {
        setExportSuccessful(false);
        setExportFlagMessage(t('Export.CanceledFlag'));
      }
    } catch (error) {
      console.error('Error', error);

      setExportSuccessful(false);
      setExportFlagMessage(error.message);
    }
  }

  const experimentResults: ExperimentStepResult[] = useExperimentResultsState();
  const user = useUserState();

  const experimentNames = getExperimentGroupNames(experimentResults);

  return (
    <Form>
      <FieldSet title={t('Export.Title')}>
        <ExportStateFlag state={exportFlagMessage} success={exportSuccessful} />
        {experimentNames.map((groupName: string) => {
          return (
            <div className={styles.buttonWrapper}>
              <input
                type="button"
                className={styles.exportButton}
                onClick={() =>
                  exportToCsv(experimentResults, groupName, user.id)
                }
                value={groupName}
              />
            </div>
          );
        })}
      </FieldSet>
      <ControlBar backRoute={routes.COMPLETION} />
    </Form>
  );
};

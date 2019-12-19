// @flow
import React from 'react';
import path from 'path';
import { useTranslation } from 'react-i18next';
import ControlBar from '../elements/NavigationBar';
import {
  ExperimentNavigation,
  useExperimentNavigation
} from '../../containers/ExperimentNavigationContext';
import { useExperimentData } from '../../containers/ExperimentDataContext';
import resourcePath from '../../utils/resourcePath';
import Center from '../../containers/Center';

export default ({
  onPracticeStart,
  onStimuliStart
}: {
  onPracticeStart: () => void,
  onStimuliStart: () => void
}) => {
  const { t } = useTranslation();
  const experimentNavigation: ExperimentNavigation = useExperimentNavigation();
  const experiments = useExperimentData();
  const experimentNumber = experimentNavigation.getExperimentNumber();
  const experiment = experiments[experimentNumber];

  let introductionText = experiment.introduction;

  if (experiment.keyBindings) {
    experiment.keyBindings.forEach(({ key, answerId }) => {
      introductionText = introductionText.replace(regex(answerId), key);
    });
  }
  const textPractice = experimentNavigation.isPractice()
    ? t('Buttons.StartPractice')
    : t('Buttons.RepeatPractice');
  return (
    <>
      <Center offset={120}>
        <h1>{experiment.groupName || experiment.name}</h1>
        <IntroductionText
          text={introductionText}
          imagePath={experiment.introductionImage}
        />
        <ControlBar onNext={onPracticeStart} title={textPractice} />
        {experimentNavigation.isPractice() ? (
          ''
        ) : (
          <>
            <br />
            <ControlBar
              onNext={onStimuliStart}
              title={t('Buttons.StartTest')}
            />
          </>
        )}
      </Center>
    </>
  );
};

const regex = key => `{{${key}}}`;

const IntroductionText = ({
  text,
  imagePath
}: {
  text: string,
  imagePath: string
}) => {
  if (!imagePath) {
    return <p>{text}</p>;
  }

  const splitTexts: string[] = text.split(regex('introductionImage'));

  return (
    <div>
      <p>{splitTexts[0]}</p>
      <img src={path.join(resourcePath, imagePath)} alt="not found" />
      <p>{splitTexts[1]}</p>
    </div>
  );
};

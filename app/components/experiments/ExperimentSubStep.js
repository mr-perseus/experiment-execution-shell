import React from 'react';
import path from 'path';
import Timeout from 'await-timeout';
import { useTranslation, Trans } from 'react-i18next';
import resourcePath from '../../utils/resourcePath';
import type { StepConfig, SubStepConfig } from '../../utils/configTypes';
import { CurrentExperimentPartContext } from '../../utils/experimentSubContexts';
import CenterImage from '../elements/CenterImage';
import { useExperimentResultsState } from '../../utils/experimentResultsContext';
import { ExperimentResult } from '../../utils/types';
import Center from '../../containers/Center';

function getSoundPaths(subStep, dataPath, step) {
  return subStep.stepIncludes.soundPaths.map(soundRef =>
    path.join(resourcePath, dataPath, step[soundRef])
  );
}

function getImagePath(dataPath, step, subStep) {
  return path.join(
    resourcePath,
    dataPath,
    step[subStep.stepIncludes.imagePath]
  );
}

async function playSounds(soundPaths: string[], timeBetweenSounds = 1000) {
  for (const soundPath of soundPaths) {
    new Audio(soundPath).play();
    await new Timeout().set(timeBetweenSounds);
  }
}

export default ({
  subStep,
  step
}: {
  subStep: SubStepConfig,
  step: StepConfig
}) => {
  const { dataPath }: { dataPath: string } = React.useContext(
    CurrentExperimentPartContext
  );

  const type = subStep.type;

  React.useEffect(() => {
    if (type === 'sound' || type === 'imageAndSound') {
      const soundPaths = getSoundPaths(subStep, dataPath, step);
      playSounds(soundPaths, subStep.timeBetweenSounds);
    }
  }, [subStep]);

  if (subStep.displayAnswer) {
    return <ResultSubStep step={step} />;
  }

  switch (type) {
    case 'cross':
      return <CrossSubStep crossPath={path.join(resourcePath, subStep.path)} />;
    case 'blank':
      return <></>;
    case 'image':
      return <ImageSubStep imagePath={getImagePath(dataPath, step, subStep)} />;
    case 'sound':
      return <ImageSubStep imagePath={path.join(resourcePath, subStep.path)} />;
    case 'imageAndSound':
      return <ImageSubStep imagePath={getImagePath(dataPath, step, subStep)} />;
    case 'text':
      return <></>;
    default:
      return <>ohohohoho</>;
  }
};

const CrossSubStep = ({ crossPath }: { crossPath: string }) => (
  <CenterImage imagePath={crossPath} />
);

const ImageSubStep = ({ imagePath }: { imagePath: string }) => (
  <CenterImage imagePath={imagePath} />
);

const ResultSubStep = ({ step }: { step: StepConfig }) => {
  const results = useExperimentResultsState();
  const { t } = useTranslation();

  const lastResult = results.find(result => result.step === step);
  const resultType = lastResult.result;

  if (resultType === ExperimentResult.Correct) {
    return (
      <Center>
        <p>
          <i className="fas fa-check-circle" /> {t('ResultTexts.Correct')}
        </p>
      </Center>
    );
  }
  if (resultType === ExperimentResult.Incorrect) {
    return (
      <Center>
        <p>
          <i className="fas fa-times" />{' '}
          <Trans i18nKey="ResultTexts.Incorrect" />
        </p>
      </Center>
    );
  }
  if (resultType === ExperimentResult.Unanswered) {
    return (
      <Center>
        <p>
          <i className="fas fa-question-circle" /> {t('ResultTexts.Unanswered')}
        </p>
      </Center>
    );
  }
  return (
    <>
      <p>oh oh oh oh</p>
    </>
  );
};

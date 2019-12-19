import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigDispatch } from '../utils/configContext';
import { FieldSet, Form, FormGroup } from './elements/Form';
import ControlBar from './elements/NavigationBar';
import routes from '../constants/routes';
import { useExperimentData } from '../containers/ExperimentDataContext';
import type { KeyBinding } from '../utils/types';
import type { ExperimentConfig } from '../utils/configTypes';
import Description from './elements/Description';

function mapExperimentBindings(
  experiments: ExperimentConfig[]
): { name: string, keyBindings: KeyBinding[] } {
  return experiments
    .filter(
      experiment => experiment.keyBindings && experiment.keyBindings.length > 0
    )
    .map(experiment => ({
      name: experiment.name,
      keyBindings: experiment.keyBindings,
      instructions: experiment.keyBindingInstructions
    }));
}

export default () => {
  const configDispatch = useConfigDispatch();
  const experiments: ExperimentConfig[] = useExperimentData();
  const { t } = useTranslation();

  const [configs, bindingDispatch] = React.useReducer((prevConfig, action) => {
    if (action.type === 'change') {
      const experiment = prevConfig.find(
        ({ name }) => name === action.data.experimentName
      );
      const binding = experiment.keyBindings.find(
        ({ answerId }) => action.data.answerId === answerId
      );
      binding.key = action.data.key;
      return [...prevConfig];
    }
    return prevConfig;
  }, mapExperimentBindings(experiments));

  const handleSave = () => {
    configDispatch({ type: 'save', data: configs });
  };

  const handleChange = (name, answerId, key) => {
    bindingDispatch({
      type: 'change',
      data: { experimentName: name, answerId, key }
    });
  };

  return (
    <>
      <h1>{t('Config.Title')}</h1>
      <Form>
        {configs.map(({ name, keyBindings, instructions }) => (
          <FieldSet key={name} title={name}>
            <Description>{instructions}</Description>
            <ExperimentKeyConfig
              keyBindings={keyBindings}
              handleBindingChange={handleChange.bind(null, name)}
            />
          </FieldSet>
        ))}
      </Form>
      <ControlBar
        backRoute={routes.HOME}
        onNext={handleSave}
        next={routes.HOME}
        title={t('Config.SaveButton')}
      />
    </>
  );
};

const ExperimentKeyConfig = ({
  keyBindings,
  handleBindingChange
}: {
  keyBindings: KeyBinding[],
  handleBindingChange: ({ answerId: number, key: string }) => void
}) => {
  return (
    <>
      {keyBindings.map(({ answerId, key }) => (
        <KeyConfig
          key={answerId}
          answerId={answerId}
          boundKey={key}
          handleBindingChange={handleBindingChange}
        />
      ))}
    </>
  );
};

const KeyConfig = ({
  answerId,
  boundKey,
  handleBindingChange
}: {
  answerId: number,
  boundKey: string,
  handleBindingChange: ({ answerId: number, key: string }) => void
}) => {
  const [key, setKey] = React.useState(boundKey);

  return (
    <FormGroup>
      <label htmlFor={answerId}>{answerId}</label>
      <input
        id={answerId}
        value={key}
        onChange={e => {
          setKey(e.target.value);
          handleBindingChange(answerId, e.target.value);
        }}
      />
    </FormGroup>
  );
};

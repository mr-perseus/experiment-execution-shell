// @flow
import type { ExperimentStepResult } from './configTypes';
import loadFile from './loadFile';

type CsvSchema = {
  [groupName: string]: CsvGroupNameSchema
};

type CsvGroupNameSchema = {
  [name: string]: CsvNameSchema
};

type CsvNameSchema = {
  [partName: string]: CsvPartNameSchema
};

type CsvPartNameSchema = {
  itemName: string,
  timeName: string,
  suffix?: {
    text: string,
    ids: number[]
  }
};

const iterateSchema = (
  stepsForExperimentGroup: ExperimentStepResult[],
  groupNameSchema: CsvGroupNameSchema,
  addToCsv: (
    partNameSchema: CsvPartNameSchema,
    filteredSteps: ExperimentStepResult[]
  ) => void
) => {
  Object.keys(groupNameSchema).forEach(nameKey => {
    const nameSchema: CsvNameSchema = groupNameSchema[nameKey];
    Object.keys(nameSchema).forEach(partNameKey => {
      const partNameSchema: CsvPartNameSchema = nameSchema[partNameKey];

      const filteredSteps = stepsForExperimentGroup.filter(
        (entry: ExperimentStepResult) =>
          entry.step.experimentName === nameKey &&
          entry.step.experimentPartName === partNameKey
      );

      addToCsv(partNameSchema, filteredSteps);
    });
  });
};

const getFirstRow = (
  stepsForExperimentGroup: ExperimentStepResult[],
  groupNameSchema: CsvGroupNameSchema
) => {
  let firstRow = 'Patient ID';

  iterateSchema(
    stepsForExperimentGroup,
    groupNameSchema,
    (
      partNameSchema: CsvPartNameSchema,
      filteredSteps: ExperimentStepResult[]
    ) => {
      filteredSteps.forEach((_entry: ExperimentStepResult, index: number) => {
        let suffix = '';
        if (
          partNameSchema.suffix &&
          partNameSchema.suffix.ids.includes(index + 1)
        ) {
          suffix = partNameSchema.suffix.text;
        }
        firstRow += `;${partNameSchema.itemName.replace(
          '$',
          String(index + 1)
        )}${suffix}`;
        firstRow += `;${partNameSchema.timeName.replace(
          '$',
          String(index + 1)
        )}${suffix}`;
      });
    }
  );

  firstRow += '\n';

  return firstRow;
};

const getSecondRow = (
  stepsForExperimentGroup: ExperimentStepResult[],
  groupNameSchema: CsvGroupNameSchema,
  userId: string
) => {
  let secondRow = userId;

  iterateSchema(
    stepsForExperimentGroup,
    groupNameSchema,
    (
      partNameSchema: CsvPartNameSchema,
      filteredSteps: ExperimentStepResult[]
    ) => {
      filteredSteps.forEach((entry: ExperimentStepResult) => {
        secondRow += `;${entry.result};${entry.time}`;
      });
    }
  );

  return secondRow;
};

const getExperimentGroupNames = (experimentResults: ExperimentStepResult[]) => {
  const experimentNames = [];

  experimentResults.forEach((stepResult: ExperimentStepResult) => {
    const groupName: string = stepResult.step.experimentGroupName;
    if (!experimentNames.includes(groupName)) {
      experimentNames.push(groupName);
    }
  });

  return experimentNames;
};

const csvCreate = (
  steps: ExperimentStepResult[],
  groupName: string,
  userId: string
) => {
  const stepsForExperimentGroup = steps.filter(
    (result: ExperimentStepResult) =>
      result.step.experimentGroupName === groupName
  );

  const schema: CsvSchema = loadFile<CsvSchema>('CSV-Schema.json');

  return (
    getFirstRow(stepsForExperimentGroup, schema[groupName]) +
    getSecondRow(stepsForExperimentGroup, schema[groupName], userId)
  );
};

export default csvCreate;
export { getExperimentGroupNames };

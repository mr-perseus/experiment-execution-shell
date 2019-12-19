// @flow

// eslint-disable-next-line import/prefer-default-export
export const ExperimentResult = Object.freeze({
  Correct: 'Correct',
  Incorrect: 'Incorrect',
  Unanswered: 'Unanswered'
});

export type ExperimentResultType = $Values<typeof ExperimentResult>;

export class User {
  id = '';

  gender = '';

  age = '';

  yearsOfEducation = '';
}

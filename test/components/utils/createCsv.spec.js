import csvCreate from '../../../app/utils/csvCreate';
import type { ExperimentStepResult } from '../../../app/utils/configTypes';

describe('csvExport', () => {
  const steps: ExperimentStepResult[] = [
    {
      step: {
        image: 'Test_5_1_2.bmp',
        solutionImage: 'Test_5_1_2_solution.bmp',
        correctAnswer: 2,
        experimentGroupName: 'Test Experiment 1',
        experimentName: 'Test Experiment 1',
        experimentPartName: 'Practice'
      },
      result: 'Incorrect',
      resultAnswer: 1,
      resultKey: '1',
      time: -1
    },
    {
      step: {
        object: 'vb_bee',
        domain: 'L',
        Congruency: 'M',
        image: 'vb_bee.bmp',
        correctAnswer: 2,
        experimentGroupName: 'Test Experiment Group 0',
        experimentName: 'Test Experiment Group 0 Name 0',
        experimentPartName: 'Practice'
      },
      result: 'Correct',
      resultAnswer: 2,
      resultKey: 'y',
      time: -1
    },
    {
      step: {
        domain: 'NL',
        Congruency: 'U',
        correctAnswer: 1,
        sound1: 'ab_cello_L',
        sound2: 'ab_accordion_R',
        SoundFile1: 'ab_cello_L.wav',
        SoundFile2: 'ab_accordion_R.wav',
        experimentGroupName: 'Test Experiment Group 0',
        experimentName: 'Test Experiment Group 0 Name 1',
        experimentPartName: 'Practice'
      },
      result: 'Correct',
      resultAnswer: 1,
      resultKey: 'n',
      time: -1
    },
    {
      step: {
        domain: 'NL',
        Congruency: 'M',
        image: 'saxophone.bmp',
        correctAnswer: 2,
        sound: 'Ssaxophone',
        pic: 'saxophone',
        SoundFile: 'Ssaxophone.wav',
        experimentGroupName: 'Test Experiment Group 0',
        experimentName: 'Test Experiment Group 0 Name 2',
        experimentPartName: 'Practice'
      },
      result: 'Unanswered',
      resultAnswer: null,
      resultKey: null,
      time: -1
    }
  ];

  it('Test Experiment 1', () => {
    const csv = csvCreate(steps, 'Test Experiment 1', '77');

    expect(csv).toEqual(`Patient ID;Testitem1 (Filler);testtime1 (Filler)
77;Incorrect;-1`);
  });

  it('Test Experiment 0', () => {
    const csv = csvCreate(steps, 'Test Experiment Group 0', '77');

    expect(csv)
      .toEqual(`Patient ID;Testitem1v;testtime1v;Testitem1a;testtime1a;Testitem1x;testtime1x
77;Correct;-1;Correct;-1;Unanswered;-1`);
  });
});

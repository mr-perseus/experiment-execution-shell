import { ClientFunction } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { clickLinkWithTitle, getPageUrl } from './helpers';

const getPageTitle = ClientFunction(() => document.title);

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

fixture`Counter Tests`
  .page('../../app/app.html')
  .beforeEach(clickLinkWithTitle('to Test'))
  .afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Experiment Execution Shell');
});

test('should open window', async t => {
  await t.expect(getPageTitle()).eql('Experiment Execution Shell');
});

test(
  "should haven't any logs in console of main window",
  assertNoConsoleErrors
);

test('should navgiate to /config', async t => {
  await waitForReact();
  await t
    .click(
      ReactSelector('Link').withProps({
        to: '/config'
      })
    )
    .expect(getPageUrl())
    .contains('/config');
});

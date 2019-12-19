import { ClientFunction, Selector } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

const getPageTitle = ClientFunction(() => document.title);
const clickToConfigLink = t =>
  t.click(Selector('a').withExactText('to Config'));

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

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
  await t.click(
    ReactSelector('Link').withProps({
      to: '/config'
    })
  );

  await assertNoConsoleErrors(t);
});

fixture`Counter Tests`
  .page('../../app/app.html')
  .beforeEach(clickToConfigLink)
  .afterEach(assertNoConsoleErrors);

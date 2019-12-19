/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import ControlBar from './elements/NavigationBar';
import routes from '../constants/routes';
import './Help.css';

export default () => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <h1>Operating Manual</h1>
      <section>
        <h4>Content</h4>
        <ul>
          <li>Tests</li>
          <li>Navigation</li>
          <li>Configuration</li>
          <li>Advanced Topics</li>
        </ul>
      </section>

      <section>
        <h3>Running Tests</h3>
        <h4>Overview</h4>
        <p>
          In this program you can execute the necessary tests which allow a
          early Alzheimer's disease diagnosis.
        </p>
        <h4>Running Tests</h4>
        <p>
          Start the program and choose 'Start Tests'. Enter the patient ID and
          click 'Start Test'. You will be redirected to the intro page of the
          first test. Each test consists of two parts, a practice part and the
          real test. After completing the practice part you have the option to
          repeat it or to start the real test.
        </p>
        <h4>Completing a Test</h4>
        <p>
          After the last item of the test, you are automatically redirected to
          the intro page of the next test.
        </p>
        <h4>Completing the last Test</h4>
        <p>
          After the last item of the last test the 'Goodbye' screen is shown.
          This is a simple message for the patient, which now has completed all
          tests.
          <br />
          On this screen is no further visible link. Use the escape key
          combination: <br />
          <strong>ctrl + alt + e</strong>
          <br /> to open the 'Completion Page'
        </p>
        <h4>The Completion Page and Exporting Results</h4>
        <p>
          When you navigated from the 'Goodbye Page' or from the 'Go to Page' to
          the completion page, you will be presented a form to enter some
          additional data regarding the patient and the results from the Picture
          Naming Test. These are necessary to complete the diagnosis.
          <br />
          <br />
          On the bottom right, you find a link to the 'Export Page'. Use this to
          create a CSV file (Comma Separated Values) that can be saved to your
          local file system.
        </p>
        <h4>Escape a Test</h4>
        <p>
          You can always escape the current screen by pressing 'ctrl + alt + e'
          on your keyboard. This will open the 'Go to Page'.
          <br />
          <br />
          <strong>
            ATTENTION: If a real (not practice) test is currently running, it is
            interrupted and, thus, aborted.
          </strong>
        </p>
      </section>

      <section>
        <h3>Navigation</h3>
        <p>
          The main functions are always visible on the page itself. The only
          exception is on the 'Goodbye Page', where you advance to the next page
          with the escape key combination.
        </p>
        <h4>Escape Key Combination</h4>
        <p>
          With <strong>ctrl + alt + e</strong> you open the 'Go to Page' from
          where you can navigate directly to the other pages (e.g., to directly
          start a specific test, to skip a test, or to go back to the 'Home
          Page'.
        </p>
      </section>

      <section>
        <h3>Configuration</h3>
        <p>
          When starting the program you are presented with the 'Home Page' of
          the program. The second entry in the list of links leads to the
          'Configuration Page'. Here it is possible to choose the corresponding
          keyboard input for each test.
          <br />
          <br />
          When adjusting the current settings, make sure you click 'Save' before
          returning to the home screen or your changes will be reverted.
        </p>
      </section>

      <section>
        <h3>Advanced Topics</h3>
        <p>Nothing advanced yet...</p>
      </section>

      <ControlBar backRoute={routes.HOME} />
    </div>
  );
};

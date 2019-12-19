import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationBar from '../../../app/components/elements/NavigationBar';
import routes from '../../../app/constants/routes';

Enzyme.configure({ adapter: new Adapter() });

describe('NavigationBar component', () => {
  describe('with back and next property', () => {
    const navigationBar = shallow(
      <NavigationBar
        backRoute={routes.HOME}
        next={routes.EXPORT}
        title="TEST"
      />
    );
    it('should have the back button', () =>
      expect(navigationBar.find('BackButton')).toHaveLength(1));
    it('should have next link', () =>
      expect(navigationBar.find('Link')).toHaveLength(1));
    it('should have the link with title TEST', () =>
      expect(navigationBar.find('Link').text()).toEqual('TEST'));
  });

  describe('without back button but with next', () => {
    const nav = shallow(<NavigationBar next="TEST" title="TEST" />);
    it('should not have a back button', () =>
      expect(nav.find('BackButton')).toHaveLength(0));
    it('should have a next link', () =>
      expect(nav.find('Link')).toHaveLength(1));
  });

  describe('without back button and without next link', () => {
    const nav = shallow(<NavigationBar />);
    it('should not have a back button', () =>
      expect(nav.find('BackButton')).toHaveLength(0));
    it('should not have a next link', () =>
      expect(nav.find('Link')).toHaveLength(0));
  });

  describe('with back button but without next', () => {
    const nav = shallow(<NavigationBar backRoute={routes.HOME} />);
    it('should have a back button', () =>
      expect(nav.find('BackButton')).toHaveLength(1));
    it('should not have a next link', () =>
      expect(nav.find('Link')).toHaveLength(0));
  });
});

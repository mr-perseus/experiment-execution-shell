import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Config from '../../app/components/Config';
import NavigationBar from '../../app/components/elements/NavigationBar';
import { FieldSet, Form, FormGroup } from '../../app/components/elements/Form';
import routes from '../../app/constants/routes';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const component = shallow(<Config />);
  return {
    component,
    navigation: component.find(NavigationBar),
    form: component.find(Form),
    fieldSet: component.find(FieldSet),
    formGroup: component.find(FormGroup),
    somethingInput: component.find('#something'),
    somethingLabel: component.find('label')
  };
}

describe('Config Component', () => {
  it('should have a form', () => {
    const { form } = setup();
    expect(form).toHaveLength(1);
  });

  it('should have a navigation bar', () => {
    const { navigation } = setup();
    expect(navigation).toHaveLength(1);
  });

  it('should have a back button', () => {
    const { navigation } = setup();
    expect(navigation.prop('backRoute')).toEqual(routes.HOME);
  });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as RouterModule from 'react-router';
import { createBrowserHistory } from 'history';
import { FieldSet, FormGroup } from '../../app/components/elements/Form';
import * as UserModule from '../../app/utils/userContext';
import userReducer from '../../app/utils/userReducer';
import PatientDataFields from '../../app/components/PatientDataFields';

Enzyme.configure({ adapter: new Adapter() });

const history = createBrowserHistory();

function setup() {
  const initialUser = { id: '' };
  const setId = id => {
    initialUser.id = id;
  };
  jest.spyOn(UserModule, 'useUserState').mockImplementation(() => initialUser);
  jest.spyOn(UserModule, 'useUserDispatch').mockImplementation(() => action => {
    setId(userReducer(initialUser, action).id);
  });
  jest.spyOn(RouterModule, 'useHistory').mockImplementation(() => history);

  const component = shallow(<PatientDataFields />);

  return {
    component,
    initialUser,
    fieldSet: component.find(FieldSet),
    formGroup: component.find(FormGroup),
    patientIdInput: component.find('#patient-id'),
    somethingLabel: component.find('label')
  };
}

describe('User Key Input Component', () => {
  const { patientIdInput, initialUser } = setup();

  it('should have the patient id input field', () => {
    expect(patientIdInput).toHaveLength(1);
  });

  it('user key input should be written to the experiment data object', () => {
    patientIdInput.simulate('change', {
      target: { value: 'Test Value', name: 'id' }
    });
    expect(initialUser.id).toEqual('Test Value');
  });
});

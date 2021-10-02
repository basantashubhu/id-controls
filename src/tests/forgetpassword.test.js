import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ForgotPassword from '../pages/ForgotPassword'
import * as UserContext from '../contexts/UserContext'
configure({adapter :  new Adapter()})
describe('Test case for forget password', () => {
    let wrapper, useAuth;
    beforeAll(() => {
        useAuth = jest.spyOn(UserContext, 'useAuth')
    });
    beforeEach(() => {
        useAuth.mockClear();
        useAuth.mockReturnValue(() => ({
            resetPassword : () => 1
        }))
    })
    it('email check', () => {
        wrapper = shallow(<ForgotPassword/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="email"]')).toHaveLength(1);
    })
    it('button check', () => {
        wrapper = shallow(<ForgotPassword/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[type="submit"]')).toHaveLength(1);
    })
})

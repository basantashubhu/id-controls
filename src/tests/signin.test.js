import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Login from '../pages/Login'
import * as UserContext from '../contexts/UserContext'
configure({adapter :  new Adapter()})
describe('Test case for login', () => {
    let wrapper, useAuth;
    beforeAll(() => {
        useAuth = jest.spyOn(UserContext, 'useAuth')
    });
    beforeEach(() => {
        useAuth.mockClear();
        useAuth.mockReturnValue(() => ({
            login : () => 1
        }))
    })
    it('email check', () => {
        wrapper = shallow(<Login/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="email"]')).toHaveLength(1);
    })
    it('password check', () => {
        wrapper = shallow(<Login/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="password"]')).toHaveLength(1);
    })
})

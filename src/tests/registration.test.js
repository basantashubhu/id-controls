import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SignUp from '../pages/SignUp'
import * as UserContext from '../contexts/UserContext'
configure({adapter :  new Adapter()})
describe('Test case for registration', () => {
    let wrapper, useAuth;
    beforeAll(() => {
        useAuth = jest.spyOn(UserContext, 'useAuth')
    });
    beforeEach(() => {
        useAuth.mockClear();
        useAuth.mockReturnValue(() => ({
            signUp : () => 1
        }))
    })
    it('first name check', async () => {
        wrapper = shallow(<SignUp/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="first_name"]')).toHaveLength(1);
    })
    it('last name check', () => {
        wrapper = shallow(<SignUp/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="last_name"]')).toHaveLength(1);
    })
    it('email check', () => {
        wrapper = shallow(<SignUp/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="email"]')).toHaveLength(1);
    })
    it('password check', () => {
        wrapper = shallow(<SignUp/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="password"]')).toHaveLength(1);
    })
    it('password confirmation check', () => {
        wrapper = shallow(<SignUp/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="cpassword"]')).toHaveLength(1);
    })
})

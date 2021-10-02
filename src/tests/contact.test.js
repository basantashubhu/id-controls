import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Contact from '../pages/Contact'
configure({adapter :  new Adapter()})
describe('Test case for contact form', () => {
    let wrapper;
    it('name check', () => {
        wrapper = shallow(<Contact/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="name"]')).toHaveLength(1);
    })
    it('phone check', () => {
        wrapper = shallow(<Contact/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="phone"]')).toHaveLength(1);
    })
    it('subject check', () => {
        wrapper = shallow(<Contact/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="subject"]')).toHaveLength(1);
    })
    it('message check', () => {
        wrapper = shallow(<Contact/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="message"]')).toHaveLength(1);
    })
    it('submit button check', () => {
        wrapper = shallow(<Contact/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[type="submit"]')).toHaveLength(1);
    })
})

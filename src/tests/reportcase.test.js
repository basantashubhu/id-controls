import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Report from '../pages/Report'
configure({adapter :  new Adapter()})
describe('Test case for contact form', () => {
    let wrapper, location = {search : ''};
    it('name check', () => {
        wrapper = shallow(<Report location={location}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="name"]')).toHaveLength(1);
    })
    it('address check', () => {
        wrapper = shallow(<Report location={location}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="address"]')).toHaveLength(1);
    })
    it('disease check', () => {
        wrapper = shallow(<Report location={location}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[name="disease"]')).toHaveLength(1);
    })
    it('submit button check', () => {
        wrapper = shallow(<Report location={location}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('[type="submit"]')).toHaveLength(1);
    })
})

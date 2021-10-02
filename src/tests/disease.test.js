import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Disease from '../pages/Disease'
configure({adapter :  new Adapter()})
describe('Test case for disease detail', () => {
    let wrapper, diseaseCode = 11450;
    it('disease name check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.display-5')).toHaveLength(1);
    })
    it('guideline check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.featurette-heading')).toHaveLength(0);
    })
    it('synonym check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.container.my-5')).toHaveLength(2);
    })
    it('clinical advise check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.container.my-5')).toHaveLength(2);
    })
    it('disease details check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.col-lg-8.mx-auto')).toHaveLength(1);
    })
    it('disease report button check', () => {
        wrapper = shallow(<Disease match={{params: {id: diseaseCode}}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.btn-warning')).toHaveLength(1);
    })
})

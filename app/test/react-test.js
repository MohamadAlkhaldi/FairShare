import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-15';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure } from 'enzyme'


configure({ adapter: new Adapter() })

import Query from '../react-client/src/query.jsx';
import App from '../react-client/src/index.jsx'
import Sign from '../react-client/src/signing.jsx'
import Invoke from '../react-client/src/invoke.jsx'
import ListItem from '../react-client/src/components/ListItem.jsx'
import List from '../react-client/src/components/List.jsx'
import QueryGuest from '../react-client/src/QueryGuest.jsx';


describe('App', function() {
    it('should be class component ',function(){
       expect(React.Component.isPrototypeOf(App)).to.be.true;
   })
})



describe(' Query', function() {
    it('should be class component ',function(){
       expect(React.Component.isPrototypeOf( Query)).to.be.true;
   })

})


describe('<Sign>', function () {
	it('should be class component ',function(){
       expect(React.Component.isPrototypeOf( Sign)).to.be.true;
   })
    it('should have an input for the username and email', function () {
      const wrapper = shallow(<Sign/>);
      expect(wrapper.find('input')).to.have.length(2);
    })
})


describe('<Invoke>', function () {
it('should be class component ',function(){
       expect(React.Component.isPrototypeOf( Query)).to.be.true;
   })

})

describe('<List>', function () {
it('should be class component ',function(){
       expect(React.Component.isPrototypeOf(List)).to.be.true;
   })
    it('should have a div', function () {
        const wrapper = shallow(<List items={[]}/>);
        expect(wrapper.find('div')).to.have.length(1);
      });

})


describe('<QueryGuest>', function () {
it('should be class component ',function(){
       expect(React.Component.isPrototypeOf(QueryGuest)).to.be.true;
   })
    it('should have a button', function () {
        const wrapper = shallow(<QueryGuest/>);
        expect(wrapper.find('button')).to.have.length(1);
      });

})
/* eslint-disable no-undef */

import {shallow} from 'enzyme';
import React from 'react';
import { AppMenu } from '../src/main/AppMenu';
import { Menu } from "semantic-ui-react";

describe('AppMenu', () => {

    it('renders the menu component', () => {
        let wrapper = shallow(<AppMenu />);
        expect(wrapper.find(Menu)).toHaveLength(1);
    });
});

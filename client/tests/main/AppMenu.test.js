/* eslint-disable no-undef */

import {shallow} from 'enzyme';
import React from 'react';
import {AppMenu} from '../../src/main/AppMenu';
import {Menu} from "semantic-ui-react";

describe('AppMenu', () => {

    it('renders the menu component', () => {
        let appMenu = shallow(<AppMenu />);
        expect(appMenu.find(Menu).length).toBe(1);
    });
});

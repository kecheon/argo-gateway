//import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { AppContext } from '../../context';
//import {Tooltip} from '../tooltip/tooltip';

require('./nav-bar.scss');

export interface NavBarProps extends React.Props<any> {
    items: Array<{ path: string; iconClassName: string; title: string; }>;
    version?: () => React.ReactElement;
}

export function isActiveRoute(locationPath: string, path: string) {
    return locationPath === path || locationPath.startsWith(`${path}/`);
}

export const NavBar: React.StatelessComponent<NavBarProps> = (props: NavBarProps, context: AppContext) => {
    //const locationPath = context.router.route.location.pathname;
    return (
        <div className='nav-bar'>
        <div className='nav-bar__logo'>
            <img src='assets/images/logo.png' alt='Argo'/>
            <div className='nav-bar__version'>{props.version && props.version()}</div>
        </div>
    </div>);
};

NavBar.contextTypes = {
    router: PropTypes.object,
};

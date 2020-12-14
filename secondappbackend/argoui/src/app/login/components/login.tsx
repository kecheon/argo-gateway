import { Page } from 'argo-ui';
import * as React from 'react';

require('./login.scss');

export const Login = () => (
    <Page title='Login' toolbar={{ breadcrumbs: [{ title: 'Login' }] }}>
        <div className='argo-container'>
            <div className='row'>
                <div className='columns small-4'>
                    <form action="/account/login" method="post">
                        <input type="text" name="username" placeholder="username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <input type="text" name="domainId" placeholder="domain" required />
                        <button color="accent" type="submit" value="Submit">Login</button>
                    </form>
                </div>
                <div className='columns small-4'>
                    <div>
                        <p>Something wrong? Try logging out and logging back in:</p>
                        <a href='/account/logout'>
                            <i className='fa fa-sign-out-alt' /> Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Page>
);

import * as React from 'react';
import {LinkButton} from '../../shared/components/link-button';

export const CronWorkflowLink = (props: {namespace: string; name: string}) => (
    <LinkButton to={'/cron-workflows/' + props.namespace + '/' + props.name}>
        <i className='fa fa-clock' /> {props.name}
    </LinkButton>
);

import * as React from 'react';
import {LinkButton} from '../../shared/components/link-button';

export const WorkflowLink = (props: {namespace: string; name: string}) => (
    <LinkButton to={'/workflows/' + props.namespace + '/' + props.name}>
        <i className='fa fa-stream' /> {props.name}
    </LinkButton>
);

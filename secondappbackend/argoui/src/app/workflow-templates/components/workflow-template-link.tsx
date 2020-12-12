import * as React from 'react';
import {LinkButton} from '../../shared/components/link-button';

export const WorkflowTemplateLink = (props: {namespace: string; name: string}) => (
    <LinkButton to={'/workflow-templates/' + props.namespace + '/' + props.name}>
        <i className='fa fa-window-maximize' /> {props.name}
    </LinkButton>
);

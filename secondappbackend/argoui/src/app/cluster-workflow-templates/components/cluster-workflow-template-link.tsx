import * as React from 'react';
import {LinkButton} from '../../shared/components/link-button';

export const ClusterWorkflowTemplateLink = (props: {name: string}) => (
    <LinkButton to={'/cluster-workflow-templates/' + props.name}>
        <i className='fa fa-window-restore' /> {props.name}
    </LinkButton>
);

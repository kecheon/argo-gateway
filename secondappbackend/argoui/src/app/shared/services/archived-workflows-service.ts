import * as models from '../../../models';
import {Pagination} from '../pagination';
import requests from './requests';

export class ArchivedWorkflowsService {
    public list(namespace: string, phases: string[], labels: string[], minStartedAt: Date | [Date, Date], maxStartedAt: Date | [Date, Date], pagination: Pagination) {
        return requests
            .get(`/argo/archived-workflows?${this.queryParams({namespace, phases, labels, minStartedAt, maxStartedAt, pagination}).join('&')}`)
            .then(res => res.body as models.WorkflowList);
    }

    public get(uid: string) {
        return requests.get(`/argo/archived-workflows/${uid}`).then(res => res.body as models.Workflow);
    }

    public delete(uid: string) {
        return requests.delete(`/argo/archived-workflows/${uid}`);
    }

    private queryParams(filter: { namespace?: string; phases?: Array<string>; labels?: Array<string>; minStartedAt?: Date | [Date, Date]; maxStartedAt?: Date | [Date, Date]; pagination: Pagination}) {
        const queryParams: string[] = [];
        const fieldSelector = this.fieldSelectorParams(filter.namespace, filter.minStartedAt, filter.maxStartedAt);
        if (fieldSelector.length > 0) {
            queryParams.push(`listOptions.fieldSelector=${fieldSelector}`);
        }
        const labelSelector = this.labelSelectorParams(filter.phases, filter.labels);
        if (labelSelector.length > 0) {
            queryParams.push(`listOptions.labelSelector=${labelSelector}`);
        }
        if (filter.pagination.offset) {
            queryParams.push(`listOptions.continue=${filter.pagination.offset}`);
        }
        if (filter.pagination.limit) {
            queryParams.push(`listOptions.limit=${filter.pagination.limit}`);
        }
        return queryParams;
    }

    private fieldSelectorParams(namespace: string, minStartedAt: Date | [Date, Date], maxStartedAt: Date | [Date, Date]) {
        let fieldSelector = '';
        if (namespace) {
            fieldSelector += 'metadata.namespace=' + namespace + ',';
        }
        if (minStartedAt) {
            const minDate = Array.isArray(minStartedAt) ? minStartedAt[0] : minStartedAt;
            fieldSelector += 'spec.startedAt>' + minDate.toISOString() + ',';
        }
        if (maxStartedAt) {
            const maxDate = Array.isArray(maxStartedAt) ? maxStartedAt[0] : maxStartedAt;
            fieldSelector += 'spec.startedAt<' + maxDate.toISOString() + ',';
        }
        if (fieldSelector.endsWith(',')) {
            fieldSelector = fieldSelector.substr(0, fieldSelector.length - 1);
        }
        return fieldSelector;
    }

    private labelSelectorParams(phases?: Array<string>, labels?: Array<string>) {
        let labelSelector = '';
        if (phases && phases.length > 0) {
            labelSelector = `workflows.argoproj.io/phase in (${phases.join(',')})`;
        }
        if (labels && labels.length > 0) {
            if (labelSelector.length > 0) {
                labelSelector += ',';
            }
            labelSelector += labels.join(',');
        }
        return labelSelector;
    }
}

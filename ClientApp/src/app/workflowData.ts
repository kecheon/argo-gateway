export class WorkflowData {
  metadata: MetaData = new MetaData();
  spec: SpecData = new SpecData();
  status: StatusData = new StatusData();
}

class MetaData {
  name: string = '';
  namespace: string = '';
  uid: string;
  resourceVersion: string = '';
  generation: number = 0;
  creationTimestamp: string = '';
  labels: {} = {};
  managedFields: {}[] = [];
}

class SpecData {
  templates: {}[] = [];
  entrypoint: string = '';
  arguments: {
    parameters: {} | ParametersData[]
  } = {
      parameters: {}
    };
  ttlStrategy: { secondsAfterCompletion: number } = { secondsAfterCompletion: 0 };
  podGC: { strategy: string } = { strategy: '' };
}

class ParametersData {
  name: string = '';
  value: string = '';
}

class StatusData {
  phase: string = '';
  startedAt: string = '';
  finishedAt: string | null = null;
  progress: string = '';
  nodes: {} = {};
  artifactRepositoryRef: { default: boolean } = { default: true };
  resourcesDuration?: { cpu: string, memory: string };
  conditions?: {}[];
}

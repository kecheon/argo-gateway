export class ProjectData {
  description?: string;
  domain_id: string = 'default';
  enabled: boolean = false;
  id: string = '';
  is_domain: boolean = false;
  is_wf: boolean = false;
  wf: workflow = new workflow();
  links: { self: string } = { self: '' };
  options: { parent_id: string } = { parent_id: '' };
  tags: [] = [];
}

class workflow {
  k8s_ns: string = '';
  quota_cpu: number = 0;
  quota_ram: number = 0;
}

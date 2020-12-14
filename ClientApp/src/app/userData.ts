export class UserData {
  id: string;
  name: string;
  domain_id: string;
  email: string;
  enabled: boolean;
  primary_namespace_id: string;
  primary_namespace_name: string;
  descriotion: string;
  sa: string;
  default_project_roles: string[];
}

export class UserCreationData {
  name: string;
  email: string;
  enabled: boolean;
  password: string;
}

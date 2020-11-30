export class UserData {
  id: string;
  name: string;
  domain_id: string;
  email: string;
  enabled: boolean;
  default_project_id: string;
  descriotion: string;
  sa: string;
}

export class UserCreationData {
  name: string;
  email: string;
  enabled: boolean;
  password: string;
}

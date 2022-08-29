export interface elementalData {
  name: string;
  type: string;
  size: number;
  extenstion: string;
  fpath: string;
}

export interface jwtUser {
  name: string;
  isAdmin: boolean;
  iat: number;
}

export interface login {
  status: string;
}

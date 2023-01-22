export interface ICollectionResponse<T> {
  data: T;
}

export interface IUser {
  id?: string;
  Name: string;
  Email: string;
  Status: boolean;
  Role: string;
  LastLogin: string;
  Image: string;
}

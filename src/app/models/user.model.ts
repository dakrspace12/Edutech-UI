export class User {
    id?: number; // Optional user ID
    name?: string; // Optional user name
    email!: string; // Required user email
    mobile_no!:number;//Required user mobile number
    password!: string; // Required user password
  }
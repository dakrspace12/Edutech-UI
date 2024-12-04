export class User {
    id?: number; // Optional user ID
    name?: string; // Optional user name
    email!: string; // Required user email
    password!: string; // Required user password
  }
  
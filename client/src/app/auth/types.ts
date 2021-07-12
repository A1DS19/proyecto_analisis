export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
  admin: boolean;
  createdAt: Date;
}

export interface AuthResponse {
  user: User | null;
  isAuth: boolean;
}

// interface Category {
//   id: string;
//   name: string;
//   image: string;
// }

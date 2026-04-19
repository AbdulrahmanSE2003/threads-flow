export type FormState = {
  errors?: {
    displayName?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
    bio?: string[];
  };
} | null | void;

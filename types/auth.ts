export type BaseFormState = {
  errors?: {
    displayName?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    bio?: string[];
    general?: string[];
  };
  success?: boolean;
};

export type FormState = BaseFormState | null;

import * as Yup from 'yup';

export const passwordSchema = Yup.string()
.required('Password is required')
.min(8, 'Password must be at least 8 characters')
.matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  'Password must contain at least one uppercase letter, one lowercase letter, and one number'
);
export const emailSchema = Yup.string()
.required('Email is required')
.email('Invalid email format');

export const fullNameSchema = Yup.string().required('Full name is required')
.matches(
  /^[a-zA-Z\s]*$/,
  'Full name can only contain alphabetic characters and spaces'
)
.min(2, 'Full name must be at least 2 characters')
.max(50, 'Full name must be at most 50 characters')
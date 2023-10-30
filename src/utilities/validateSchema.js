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

export const emailSubjectSchema = Yup.string()
  .required('Email subject is required')
  .min(10, 'Email subject must be at least 10 character')
  .max(50, 'Email subject can be at most 50 characters');

export const emailBodySchema =  Yup
  .string()
  .trim()
  .required('Email body is required')
  .min(10, 'Email body must be at least 10 characters long')
  .max(1000, 'Email body cannot be longer than 1000 characters')

const supportedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const emailFileValidation =  Yup
.mixed()
.test('fileType', 'Invalid file type', (value) => {
  if (!value) return false; // Make sure a file is present
  return supportedMimeTypes.includes(value.type);
})
.test('fileSize', 'File size is too large', (value) => {
  if (!value) return false; // Make sure a file is present
  return value.size <= 2 * 1024 * 1024; // 2MB in bytes
})
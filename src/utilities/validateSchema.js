import * as Yup from 'yup';

export const passwordSchema = Yup.string()
.required('Password is required')
.test('no-spaces', 'Password must not contain spaces', (value) => !/\s/.test(value))
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
  .required('Please enter the mandatory details.')

export const emailBodySchema =  Yup
  .string()
  .trim()
  .required('Please enter the mandatory details.')

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
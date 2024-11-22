import { useState } from 'react';

interface SignUp {
  email: string;
  password: string;
  nickName: string;
  passwordConfirmation: string;
}

interface Errors {
  email?: string;
  password?: string;
  nickName?: string;
  passwordConfirmation?: string;
}

export default function useSignUpValidate(initialValues: SignUp) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    let isValid = true;
    let newError: Errors = {};

    if (!values.email || !emailPattern.test(values.email)) {
      isValid = false;
      newError.email = 'Invalid email.';
    }

    if (!values.password?.trim() || values.password.length < 8) {
      isValid = false;
      newError.password = 'Password must be at least 8 characters.';
    }

    if (!values.nickName?.trim() || values.nickName.length) {
      isValid = false;
      newError.nickName = 'Nickname must be at least 1 characters';
    }

    if (values.password?.trim() !== values.passwordConfirmation?.trim()) {
      isValid = false;
      newError.passwordConfirmation = 'Passwords do not match.';
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    errors,
    validate,
    handleChange
  };
}

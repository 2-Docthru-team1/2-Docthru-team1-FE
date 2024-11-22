import useSignUpValidate from '../../../hooks/useSignUPValidate';

export default function SignUpClient() {
  const { values, errors, validate, handleChange } = useSignUpValidate({
    email: '',
    nickName: '',
    password: '',
    passwordConfirmation: ''
  });

  return <div></div>;
}

import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MessageConfig, ValidationConfig } from "../../configurations";
import { Input } from "../../atoms";

interface IProps {
  onSubmit: ({ userName, password }: { userName: string, password: string }) => void;
}

export const LoginForm: React.FC<IProps> = ({ onSubmit }) => {

  const loginForm = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(yup.object().shape({
      password: yup.string()
        .required(MessageConfig.REQUIRED_FIELD),
      userName: yup.string()
        .required(MessageConfig.REQUIRED_FIELD)
        .max(40, MessageConfig.MAX_LENGTH(40))
        .matches(new RegExp(ValidationConfig.emailValidatorRegEx),
          MessageConfig.INVALID_EMAIL)
    })),
    defaultValues: {
      userName: '', password: ''
    } // always provide default value as it help in resetting form.
  });

  const { register, handleSubmit, formState: { errors } } = loginForm;


  return (
    <form className='Login_form'
      onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('userName')} error={errors?.userName} />
      <Input {...register('password')} error={errors?.password} />
      <input type="submit" />
    </form >
  );
}

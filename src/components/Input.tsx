import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string;
};

const Input = (props: InputProps) => {
  const { type, name } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input type={type} id={name} {...register(name)} />
      {errors[name] && <p role="alert">{errors[name]?.message?.toString()}</p>}
    </>
  );
};

export { Input };

import React from "react";
import type { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";

import { Input } from "./Input";

type BasicTestProps = {
  testId?: string;
};

type Children = {
  children?: ReactNode;
};

type ExternalFormProps<TFieldValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFieldValues>;
};

type CustomFormProps<TFieldValues extends FieldValues> =
  UseFormProps<TFieldValues> &
    ExternalFormProps<TFieldValues> &
    BasicTestProps &
    Children;

const FormBase = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  ...props
}: CustomFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>(props);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        data-testid={props.testId}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const Form = Object.assign(FormBase, { Input });

export { Form };

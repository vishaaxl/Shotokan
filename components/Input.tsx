import { Field, useField } from "formik";
import styled from "styled-components";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  component?: string;
  rows?: string;
  value?: string;
  children?: React.ReactNode;
  defaultValue?: string;
}

const Input: React.FC<Props> = ({
  name,
  placeholder,
  type,
  disabled,
  component,
  rows,
  children,
  value,
}) => {
  const [field, meta] = useField(name);
  return (
    <InputBlock className="input-block custom-input">
      <label htmlFor={name}>{placeholder}</label>
      <Field
        id={name}
        type={type || "text"}
        disabled={disabled}
        {...field}
        component={component}
        rows={rows}
        value={value}
        onChange={(e: any) => field.onChange(e)}
      >
        {children}
      </Field>
      {meta.touched && meta.error ? (
        <Error className="error">{meta.error}</Error>
      ) : null}
    </InputBlock>
  );
};

export const Error = styled.div`
  margin-top: 0.5rem;
  color: red;
  font-size: 0.75rem;
`;

export const InputBlock = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.75rem;
    opacity: 0.8;
    font-size: 0.95rem;
  }

  input,
  textArea,
  select {
    font-size: 1rem;
    width: 100%;
    padding: 0.7rem 0.5rem;
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    outline: none;

    background-color: transparent;
  }

  textArea,
  select {
    text-transform: capitalize;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 2px;
  }
`;

export default Input;

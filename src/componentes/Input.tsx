import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  children: ReactNode;
  type?: string;
};

const Input = ({ name, children, type }: Props) => {
  const { register, formState, getFieldState } = useFormContext();
  const { error } = getFieldState(name, formState);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        className="form-control"
      />
      {error?.message && <div className="text-danger">{error?.message}</div>}
    </div>
  );
};

export default Input;

import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: any,
  error?: { message?: string, [key: string]: any },
  [key: string]: any
}

export const Input: React.FC<IProps> = React.forwardRef<any, IProps>(({ className, label, error, ...rest }, ref) => {

  return (
    <div className="Input_container">
      <label className="Input_label">{label}</label> <br />

      <input className={`Input_input ${className || ''}`}
        {...rest} ref={ref}/>
      {error?.message && <span className="Input_error">{error.message}</span>}
    </div>
  );
});

export default Input;
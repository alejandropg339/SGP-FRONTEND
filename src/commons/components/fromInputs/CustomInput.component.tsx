interface InputProps {
  label: string;
  name: string;
  type: InputType,
  useField: any
  max?: number,
  min?: number,
  [x: string]: any;
}

type InputType = 'text' | 'password' | 'email' | 'tel' | 'number';

export const CustomInput = ({label, useField, ...props}: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-floating">
        <input className={`form-control ${meta.error && 'is-invalid'}`} {...props} {...field}/>
        <label htmlFor="floatingInputInvalid" className="sgp-text-gray-medium">{label}</label>
      </div>
    </>
  )
}

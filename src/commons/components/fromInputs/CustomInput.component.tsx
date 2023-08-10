interface InputProps {
  label: string;
  name: string;
  type: InputType,
  useField: any
  max?: number | Date,
  min?: number | Date | string,
  [x: string]: any;
}

type InputType = 'text' | 'password' | 'email' | 'tel' | 'number' | 'file' | 'date';

export const CustomInput = ({label, useField, ...props}: InputProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-floating">
        <input className={`form-control ${(meta.error && meta.touched) && 'is-invalid'}`} {...props} {...field}/>
        <label htmlFor="floatingInputInvalid" className="sgp-text-gray-50-medium">{label}</label>
      </div>
    </>
  )
}

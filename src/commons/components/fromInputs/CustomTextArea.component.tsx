interface InputProps {
    label: string;
    name: string;
    type: InputType,
    useField: any
    [x: string]: any;
  }
  
  type InputType = 'text' | 'password' | 'email' | 'tel' | 'number';
  
  export const CustomTextArea = ({label, useField, ...props}: InputProps) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <div className="form-floating">
          <textarea className={`form-control ${(meta.error && meta.touched) && 'is-invalid'}`} style={{height: '100px'}} {...props} {...field}/>
          <label htmlFor="floatingInputInvalid" className="sgp-text-gray-50-medium">{label}</label>
        </div>
      </>
    )
  }
interface SelectProps {
    name: string;
    useField: any;
    id  : string;
    label: string;
    [x: string]: any;
}

export const CustomSelect = ({ useField, label, id, ...props }: SelectProps) => {
    const [field, meta] = useField(props);

    return (
        <div className="form-floating">
            <select className={`form-select ${(meta.error && meta.touched) && 'is-invalid'}`} {...field} {...props} id={id}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

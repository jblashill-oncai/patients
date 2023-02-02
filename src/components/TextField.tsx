import React, { useCallback, useState } from "react";

type TTextFieldProps = {
  name: string;
  onChange?: (v: string) => void;
  type?: 'string' | 'date' | 'number';
}

export const TextField = (props: TTextFieldProps) => {
  const { name, onChange: propsOnChange, type = 'text' } = props;
  const [value, setValue] = useState<string>('');

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.value;
    setValue(v);

    if (propsOnChange) propsOnChange(v);
  }, []);

  return (
    <div>
      <label htmlFor={name}>{`${name}:`}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} />
    </div>
  )
}
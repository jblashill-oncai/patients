import React, { useCallback, useMemo, useState } from "react";

type TTextFieldProps = {
  name: string;
  onChange?: (v: string) => void;
  type?: 'string' | 'date';
  value?: string;
}

export const TextField = (props: TTextFieldProps) => {
  const { name, onChange: propsOnChange, type = 'text', value: propsValue } = props;
  const [value, setValue] = useState<string>('');

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.value;
    setValue(v);

    if (propsOnChange) propsOnChange(v);
  }, [propsOnChange]);

  const refValue = useMemo(() => {
    // CONTROLLED
    if (propsValue != null) return propsValue;

    // UNCONTROLLED
    return value;
  }, [propsValue, value]);

  return (
    <div>
      <label htmlFor={name}>{`${name}:`}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={refValue} />
    </div>
  )
}
import React, { useCallback, useMemo, useState } from "react";

type TNumberFieldProps = {
  name: string;
  onChange?: (v: number) => void;
  value?: number;
}

export const NumberField = (props: TNumberFieldProps) => {
  const { name, onChange: propsOnChange, value: propsValue } = props;
  const [value, setValue] = useState<string>('');

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.value;
    setValue(v);

    if (propsOnChange) propsOnChange(parseInt(v));
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
      <input id={name} name={name} onChange={onChange} type='number' value={refValue} />
    </div>
  )
}
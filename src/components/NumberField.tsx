import React, { useCallback, useState } from "react";

type TNumberFieldProps = {
  name: string;
  onChange?: (v: number) => void;
}

export const NumberField = (props: TNumberFieldProps) => {
  const { name, onChange: propsOnChange } = props;
  const [value, setValue] = useState<string>('');

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.value;
    setValue(v);

    if (propsOnChange) propsOnChange(parseInt(v));
  }, []);

  return (
    <div>
      <label htmlFor={name}>{`${name}:`}</label>
      <input id={name} name={name} onChange={onChange} type='number' value={value} />
    </div>
  )
}
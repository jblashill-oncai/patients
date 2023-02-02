import React, { useCallback, useState } from "react";

type TSelectProps<T extends String> = {
  name: string;
  onChange?: (v?: T) => void;
  options: {
    label: string;
    value: T;
  }[];
}

export const Select = <T extends string>(props: TSelectProps<T>) => {
  const { name, onChange: propsOnChange, options } = props;
  const [value, setValue] = useState<T>();

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    let v: string | undefined = e.target.value;
    if (v === '') v = undefined;
    setValue(v as T);

    if (propsOnChange) propsOnChange(v as T);
  }, []);

  return (
    <div>
      <label htmlFor='histology'>{name}:</label>
      <select id='histology' name='histology' onChange={onChange}>
        <option value={undefined}></option>
        {
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))
        }
      </select>
    </div>
  )
}
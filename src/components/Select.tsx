import React, { useCallback, useMemo, useState } from "react";

type TSelectProps<T extends String> = {
  name: string;
  onChange?: (v?: T) => void;
  options: {
    label: string;
    value: T;
  }[];
  value?: T;
}

export const Select = <T extends string>(props: TSelectProps<T>) => {
  const { name, onChange: propsOnChange, options, value: propsValue } = props;
  const [value, setValue] = useState<T>();

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    let v: string | undefined = e.target.value;
    if (v === '') v = undefined;
    setValue(v as T);

    if (propsOnChange) propsOnChange(v as T);
  }, [propsOnChange]);

  const refValue = useMemo(() => {
    // CONTROLLED
    if (propsValue != null) return propsValue;

    // UNCONTROLLED
    return value;
  }, [propsValue, value]);

  return (
    <div>
      <label htmlFor='histology'>{name}:</label>
      <select id='histology' name='histology' onChange={onChange} value={refValue}>
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
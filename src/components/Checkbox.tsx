import React, { useCallback, useMemo, useState } from "react";

type TCheckboxProps = {
  name: string;
  onChange?: (v: boolean) => void;
  value?: boolean;
}

export const Checkbox = (props: TCheckboxProps) => {
  const { name, onChange: propsOnChange, value: propsValue } = props;
  const [value, setValue] = useState<boolean>(false);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.checked;
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
      <input id={name} name={name} onChange={onChange} type='checkbox' checked={refValue} />
    </div>
  )
}
import React, { useCallback, useState } from "react";

type TCheckboxProps = {
  name: string;
  onChange?: (v: boolean) => void;
}

export const Checkbox = (props: TCheckboxProps) => {
  const { name, onChange: propsOnChange } = props;
  const [value, setValue] = useState<boolean>(false);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const v = e.target.checked;
    setValue(v);

    if (propsOnChange) propsOnChange(v);
  }, []);

  return (
    <div>
      <label htmlFor={name}>{`${name}:`}</label>
      <input id={name} name={name} onChange={onChange} type='checkbox' checked={value} />
    </div>
  )
}
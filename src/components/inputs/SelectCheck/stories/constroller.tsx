import { useState } from "react";
import { SelectCheck, ISelectProps } from "..";

export const ControllerSelectCheck = (props: ISelectProps) => {
  const { options } = props;

  const [data, setData] = useState(options);

  const handleToggleEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newData = data.map((entry) => {
      if (entry.id === name) {
        return { ...entry, checked };
      }
      return entry;
    });
    setData(newData);
  };

  return (
    <SelectCheck onChangeCheck={handleToggleEntry} {...props} options={data} />
  );
};

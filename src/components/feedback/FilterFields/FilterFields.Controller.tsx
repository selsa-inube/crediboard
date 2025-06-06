import { useState } from "react";
import { FilterFields } from ".";

interface IOptionItemChecked {
  id: string;
  label: string;
  checked?: boolean;
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { IOptionItemChecked };

interface IFilterFieldController {
  options: IOptionItemChecked[];
  onSelectChange: (options: IOptionItemChecked[]) => void;
}
const FilterFieldController = (props: IFilterFieldController) => {
  const { options, onSelectChange } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<IOptionItemChecked[]>(
    []
  );
  const [tempSelectedOptions, setTempSelectedOptions] = useState<
    IOptionItemChecked[]
  >([]);

  // const handleToggleModal = () => {
  //   setShowModal(!showModal);
  //   if (!showModal) {
  //     setTempSelectedOptions(selectedOptions);
  //   }
  // };

  const handleSelectChange = (options: IOptionItemChecked[]) => {
    setTempSelectedOptions((prev) => {
      const newOptions = options.filter((option) => option.checked);
      const mergedOptions = [...prev, ...newOptions].reduce<
        IOptionItemChecked[]
      >((acc, option) => {
        if (!acc.some((item) => item.id === option.id)) {
          acc.push(option);
        }
        return acc;
      }, []);
      return mergedOptions;
    });
  };

  const handleApplyFilters = () => {
    setShowModal(false);
    setSelectedOptions((prev) => {
      const mergedOptions = [...prev, ...tempSelectedOptions].reduce<
        IOptionItemChecked[]
      >((acc, option) => {
        if (!acc.some((item) => item.id === option.id)) {
          acc.push(option);
        }
        return acc;
      }, []);
      return mergedOptions;
    });
    onSelectChange(tempSelectedOptions);
  };

  const handleClearFilters = () => {
    setSelectedOptions([]);
    setTempSelectedOptions([]);
    onSelectChange(options.map((option) => ({ ...option, checked: false })));
  };

  return (
    <FilterFields
      options={options}
      actionText="Filtrar"
      title="Filtrar"
      onClick={handleApplyFilters}
      onSelectChange={handleSelectChange}
      showModal={showModal}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      handleClearFilters={handleClearFilters}
      handleClearModal={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export { FilterFieldController };
export type { IFilterFieldController };

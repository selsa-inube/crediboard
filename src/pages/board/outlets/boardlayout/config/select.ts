type FilterOption = {
  id: string;
  label: string;
  disabled: boolean;
};

const filterOptions: FilterOption[] = [
  { id: "1", label: "Opcion 1", disabled: false },
  { id: "2", label: "Opcion 2", disabled: false },
  { id: "3", label: "Opcion 3", disabled: false },
];

export { filterOptions };
export type { FilterOption };

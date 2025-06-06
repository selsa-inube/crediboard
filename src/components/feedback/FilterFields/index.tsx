import {
  MdOutlineFilterAltOff,
  MdOutlineFilterAlt,
  MdApps,
} from "react-icons/md";
import { Button, inube, Stack, useMediaQuery, Text } from "@inubekit/inubekit";
import {
  StyledButtonFilter,
  StyledFilterdUserCard,
  StyledSearchUserCard,
} from "./styles";
import { TagsFilter } from "@components/modals/TagsFilter";
import { IOptionItemChecked } from "./FilterFields.Controller";
import { FilterModal } from "@components/modals/FilterModal";
import { useState } from "react";

interface IFilterFields {
  options: IOptionItemChecked[];
  name?: string;
  actionText: string;
  title: string;
  showModal: boolean;
  selectedOptions: IOptionItemChecked[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<IOptionItemChecked[]>
  >;
  handleClearModal: () => void;
  handleClearFilters: () => void;
  onClick: () => void;
  onSelectChange: (options: IOptionItemChecked[]) => void;
  userData?: { [key: string]: string | number }[];
  id?: string;
}
const FilterFields = (props: IFilterFields) => {
  const {
    options,
    actionText,
    title,
    handleClearModal,
    selectedOptions,
    handleClearFilters,
    setSelectedOptions,
    onClick,
    onSelectChange,
  } = props;
  const isSmallScreen = useMediaQuery("(max-width: 1001px)");
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <StyledSearchUserCard $smallScreen={isSmallScreen} $isActive={showModal}>
        <Stack gap="20px">
          <StyledFilterdUserCard
            $smallScreen={isSmallScreen}
            $isActive={showModal}
          >
            {selectedOptions.length === 0 ? (
              <Text
                appearance="gray"
                size="large"
                weight="normal"
                textAlign="center"
              >
                Sin filtros aún.
              </Text>
            ) : (
              selectedOptions.map((option) => (
                <TagsFilter
                  key={option.id}
                  appearance="light"
                  label={option.label}
                  weight="normal"
                  removable
                  onClose={() =>
                    setSelectedOptions(
                      selectedOptions.filter((item) => item.id !== option.id)
                    )
                  }
                  background={inube.palette.blue.B400}
                  icon={<MdApps />}
                />
              ))
            )}
          </StyledFilterdUserCard>

          <StyledButtonFilter>
            <Stack gap="10px">
              <Button
                appearance="gray"
                iconBefore={<MdOutlineFilterAltOff />}
                onClick={handleClearFilters}
                variant="outlined"
                spacing="compact"
              >
                Quitar
              </Button>

              <Button
                onClick={handleToggleModal}
                iconBefore={<MdOutlineFilterAlt />}
                variant="outlined"
                spacing="compact"
              >
                Filtrar
              </Button>
            </Stack>
          </StyledButtonFilter>
        </Stack>
      </StyledSearchUserCard>

      {showModal && (
        <FilterModal
          actionText={actionText}
          selectedOptions={selectedOptions}
          appearance={"primary"}
          isLoading={false}
          portalId="portal"
          title={title}
          options={options}
          onCloseModal={handleClearModal}
          onClick={onClick}
          onSelectChange={onSelectChange}
          setSelectedOptions={setSelectedOptions}
        />
      )}
    </>
  );
};

export { FilterFields };

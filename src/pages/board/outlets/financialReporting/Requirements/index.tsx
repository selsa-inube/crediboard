import { Stack, Icon } from "@inube/design-system";
import { useState, isValidElement } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";

import { dataButton } from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";

interface IData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
}

export interface IRequirementsProps {
  data: IData[];
}

export const Requirements = (props: IRequirementsProps) => {
  const { data } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{
    date?: string;
    details?: string;
  }>({});

  const handleToggleSeeDetailsModal = (date?: string, details?: string) => {
    setModalData({ date, details });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const renderAddIcon = (entry: IEntries) => {
    const date = typeof entry.date === "string" ? entry.date : undefined;
    const details =
      typeof entry.details === "string" ? entry.details : undefined;

    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => handleToggleSeeDetailsModal(date, details)}
          spacing="compact"
          size="24px"
          cursorHover
        />
      </Stack>
    );
  };

  const renderCheckIcon = (entry: IEntries) => (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
        onClick={() => {}}
        disabled={
          isValidElement(entry?.tag) && entry?.tag?.props?.label === "No Cumple"
        }
      />
    </Stack>
  );

  const actionsRequirements: IAction[] = [
    { id: "agregar", content: renderAddIcon },
    { id: "aprobar", content: renderCheckIcon },
  ];

  return (
    <>
      <Stack>
        <Fieldset
          title="Requisitos"
          activeButton={dataButton}
          heightFieldset="340px"
        >
          <div style={{ height: "340px" }}>
            {data.map((item) => (
              <TableBoard
                key={item.id}
                id={item.id}
                titles={item.titlesRequirements}
                entries={item.entriesRequirements}
                actions={actionsRequirements}
                appearanceTable={{
                  widthTd: "310px",
                  efectzebra: true,
                  title: "primary",
                }}
              />
            ))}
          </div>
        </Fieldset>
      </Stack>
      {showSeeDetailsModal && (
        <SeeDetailsModal
          date={String(modalData.date)}
          details={String(modalData.details)}
          onCloseModal={handleToggleSeeDetailsModal}
        />
      )}
    </>
  );
};

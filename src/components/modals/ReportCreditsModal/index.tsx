import { createPortal } from "react-dom";
import { useState } from "react";
import { MdAdd, MdClear } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import {
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@inubekit/table";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";

import { headers, data, usePagination } from "./interface";
import { ActionModal } from "./Actions";
import { Details } from "./Detail";
import { StyledContainerClose, StyledContainer } from "./styles";

interface ReportCreditsModalProps {
  handleClose: () => void;
  portalId?: string;
  totalBalance?: number;
  totalFee?: number;
}

export function ReportCreditsModal(props: ReportCreditsModalProps) {
  const { portalId, handleClose, totalBalance, totalFee } = props;

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
  } = usePagination();

  const [ModalOpen, setModalOpen] = useState(false);

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width:880px)");
  const visibleHeaders = isMobile
    ? headers.filter((header) =>
        ["tipo", "saldo", "acciones"].includes(header.key)
      )
    : headers;

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          height={!isMobile ? "640px" : "auto"}
          width={!isMobile ? "1050px" : "auto"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              Obligaciones financieras
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>Cerrar</Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </Stack>
          <Divider />
          <Stack justifyContent="end">
            <Button children="Agregar obligaciones" iconBefore={<MdAdd />} />
          </Stack>
          <Table tableLayout="auto">
            <Thead>
              <Tr>
                {visibleHeaders.map((header, index) => (
                  <Th key={index} action={header.action} align="left">
                    {header.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {visibleHeaders.map((header, colIndex) => {
                    const cellData = row[header.key];
                    return (
                      <Td
                        key={colIndex}
                        appearance={rowIndex % 2 === 0 ? "dark" : "light"}
                        type={header.action ? "custom" : "text"}
                        align={header.action ? "center" : "left"}
                      >
                        {header.action ? <Details /> : cellData}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr border="bottom">
                <Td
                  colSpan={visibleHeaders.length}
                  type="custom"
                  align="center"
                >
                  <Pagination
                    firstEntryInPage={firstEntryInPage}
                    lastEntryInPage={lastEntryInPage}
                    totalRecords={totalRecords}
                    handleStartPage={handleStartPage}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    handleEndPage={handleEndPage}
                  />
                </Td>
              </Tr>
            </Tfoot>
          </Table>
          <Stack gap="15px" direction={!isMobile ? "row" : "column"}>
            <Textfield
              id="field1"
              label="Cuota Total"
              placeholder="$0"
              size="compact"
              type="number"
              value={totalFee}
              fullwidth
            />
            <Textfield
              id="field2"
              label="Saldo Total"
              placeholder="$0"
              size="compact"
              type="number"
              value={totalBalance}
              fullwidth
            />
          </Stack>
          {ModalOpen && <ActionModal onClose={() => setModalOpen(false)} />}
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

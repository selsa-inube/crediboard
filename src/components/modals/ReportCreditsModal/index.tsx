import { useState } from "react";
import { MdAdd, MdClear, MdLinearScale } from "react-icons/md";

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
import { useMediaQuery } from "@inubekit/hooks";  

import { headers, data, usePagination } from "./interface";
import { ActionModal } from "./actions";

export function ReportCreditsModal() {
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

  const isMobile = useMediaQuery("(max-width:880px)");
  const visibleHeaders = isMobile
    ? headers.filter(header => ["tipo", "saldo", "acciones"].includes(header.key))
    : headers;

  return (
    <Stack direction="column">
      <Stack justifyContent="space-between" alignItems="center">
        <Stack>
          <Text size="small" margin="10px 0px" type="headline">
            Obligaciones financieras
          </Text>
        </Stack>
        <Stack alignItems="center">
          <Text>Cerrar</Text>
          <Icon icon={<MdClear />} size="24px" cursorHover appearance="dark" />
        </Stack>
      </Stack>
      <Divider />
      <Stack justifyContent="end" margin="20px 0px">
        <Button children="Agregar obligaciones" iconBefore={<MdAdd />} />
      </Stack>
      <Table tableLayout="auto">
        <Thead>
          <Tr>
            {visibleHeaders.map((header, index) => (
              <Th key={index} action={header.action} align="center">
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
                  >
                    {header.action ? (
                      <Icon
                        icon={<MdLinearScale />}
                        size="12px"
                        cursorHover
                        appearance="primary"
                        onClick={() => setModalOpen(true)}
                        shape="circle"
                        variant="filled"
                      />
                    ) : (
                      cellData
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr border="bottom">
            <Td colSpan={visibleHeaders.length} type="custom" align="center">
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
      <Stack gap="15px" margin="20px 0px" direction={!isMobile ? "row" : "column"}>
        <Textfield
          id="field1"
          label="Cuota Total"
          placeholder="$0"
          size="compact"
          fullwidth
        />
        <Textfield
          id="field2"
          label="Saldo Total"
          placeholder="$0"
          size="compact"
          fullwidth
        />
      </Stack>
      {ModalOpen && <ActionModal onClose={() => setModalOpen(false)} />}
    </Stack>
  );
}

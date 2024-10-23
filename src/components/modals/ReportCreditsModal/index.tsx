import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
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
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";
import { SkeletonLine, SkeletonIcon } from "@inubekit/skeleton";
import { Select } from "@inubekit/select";
import { Detail } from "@components/data/TableExtraordinaryInstallment/Detail";

import { usePagination } from "./utils";
import { headers, data, dataReport } from "./config";
import { StyledContainerClose, StyledContainer } from "./styles";
import { NewPrice } from "./components/newPrice";

export interface ReportCreditsModalProps {
  handleClose: () => void;
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  totalBalance: number;
  totalFee: number;
  debtor: string;
  portalId?: string;
}

export function ReportCreditsModal(props: ReportCreditsModalProps) {
  const {
    portalId,
    handleClose,
    onChange,
    options,
    totalBalance,
    totalFee,
    debtor,
  } = props;

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
  } = usePagination();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

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
          height="auto"
          width={!isMobile ? "1050px" : "auto"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              {dataReport.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>{dataReport.close}</Text>
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
          {loading ? (
            <></>
          ) : (
            <Stack justifyContent="space-between">
              <Select
                id="income"
                name="deudor"
                label="Deudor"
                placeholder="Seleccione una opción"
                options={options}
                value={debtor}
                onChange={(name, value) => onChange(name, value)}
                size="compact"
              />
              <Stack alignItems="end">
              <Button
                children={dataReport.addObligations}
                iconBefore={<MdAdd />}
                fullwidth={isMobile}
              />
              </Stack>
            </Stack>
          )}
          <Table tableLayout="auto">
            <Thead>
              <Tr>
                {loading
                  ? visibleHeaders.map((_, index) => (
                      <Td key={index} type="custom">
                        <SkeletonIcon />
                      </Td>
                    ))
                  : visibleHeaders.map((header, index) => (
                      <Th
                        key={index}
                        action={header.action}
                        align={header.action ? "center" : "left"}
                      >
                        {header.label}
                      </Th>
                    ))}
              </Tr>
            </Thead>
            <Tbody>
              {(() => {
                if (loading) {
                  return (
                    <Tr>
                      {visibleHeaders.map((_, index) => (
                        <Td key={index} type="custom">
                          <SkeletonLine />
                        </Td>
                      ))}
                    </Tr>
                  );
                } else if (data.length === 0) {
                  return (
                    <Tr>
                      <Td
                        colSpan={visibleHeaders.length}
                        align="center"
                        type="custom"
                      >
                        <Text
                          size="large"
                          type="label"
                          appearance="gray"
                          textAlign="center"
                        >
                          {dataReport.noData}
                        </Text>
                      </Td>
                    </Tr>
                  );
                } else {
                  return data.map((row, rowIndex) => (
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
                            {header.action ? <Detail /> : cellData}
                          </Td>
                        );
                      })}
                    </Tr>
                  ));
                }
              })()}
            </Tbody>
            {!loading && data.length > 0 && (
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
            )}
          </Table>
          <Stack
            gap="48px"
            direction={!isMobile ? "row" : "column"}
            justifyContent="end"
          >
            {loading ? (
              <SkeletonLine />
            ) : (
              <NewPrice value={totalFee} label={dataReport.totalFee} />
            )}
            {loading ? (
              <SkeletonLine />
            ) : (
              <NewPrice value={totalBalance} label={dataReport.totalBalance} />
            )}
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

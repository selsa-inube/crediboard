import { MdAdd } from "react-icons/md";
import { useState, useEffect } from "react";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";
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
import { SkeletonLine } from "@inubekit/skeleton";
import { Fieldset } from "@components/data/Fieldset";
import { usePagination } from "@components/modals/ReportCreditsModal/utils";

import { dataReport, titles, data } from "./config/types";
import { Details } from "./config/details";

export function ObligationsFinancial() {
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
  const isMobile = useMediaQuery("(max-width:880px)");

  const visibleHeaders = isMobile
    ? titles.filter((header) =>
        ["type", "balance", "actions"].includes(header.key)
      )
    : titles;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fieldset>
      <Stack direction="column" height="auto" gap="15px">
        <Stack direction="column">
          <Stack alignItems="center">
            <Text size="small" type="label" appearance="gray" weight="bold">
              {dataReport.title}
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text size="medium" type="title" appearance="dark">
              {dataReport.description}
            </Text>
            <Stack justifyContent="end">
              <Button
                children={dataReport.buttonText}
                iconBefore={<MdAdd />}
                fullwidth={isMobile}
              />
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack width="auto" justifyContent="center" margin="16px">
          <Table>
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
                            appearance={rowIndex % 2 === 0 ? "light" : "dark"}
                            type={header.action ? "custom" : "text"}
                            align={
                              typeof cellData === "number" ||
                              (typeof cellData === "string" &&
                                cellData.includes("$"))
                                ? "right"
                                : "center"
                            }
                          >
                            {header.action ? <Details /> : cellData}
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
        </Stack>
      </Stack>
      <Stack
        gap="15px"
        direction={!isMobile ? "row" : "column"}
        justifyContent="center"
      >
        <Stack direction="column" alignItems="center">
          <Text size="small" type="headline" appearance="gray">
            {dataReport.totalBalance}
          </Text>
          <Text size="small" type="body" appearance="gray">
            {dataReport.descriptionTotalBalance}
          </Text>
        </Stack>
        <Stack direction="column" alignItems="center">
          <Text size="small" type="headline" appearance="gray">
            {dataReport.totalFee}
          </Text>
          <Text size="small" type="body" appearance="gray">
            {dataReport.descriptionTotalFee}
          </Text>
        </Stack>
      </Stack>
    </Fieldset>
  );
}

import { useState, useEffect } from "react";

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
import { useMediaQuery } from "@inubekit/hooks";
import { SkeletonLine, SkeletonIcon } from "@inubekit/skeleton";

import { Detail } from "@components/data/TableExtraordinaryInstallment/Detail";

import { headers, data, dataReport } from "./config";
import { usePagination } from "./utils";

export function TableFinancialObligations() {
  const [loading, setLoading] = useState(true);

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
  } = usePagination();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const isMobile = useMediaQuery("(max-width:880px)");
  const visibleHeaders = isMobile
    ? headers.filter((header) =>
        ["type", "balance", "actions"].includes(header.key)
      )
    : headers;

  return (
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
                        (typeof cellData === "string" && cellData.includes("$"))
                          ? "right"
                          : "center"
                      }
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
      )}
    </Table>
  );
}

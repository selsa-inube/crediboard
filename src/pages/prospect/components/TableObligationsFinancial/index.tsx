import { useState, useEffect } from "react";
import localforage from "localforage";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
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
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { SkeletonLine, SkeletonIcon } from "@inubekit/skeleton";
import { FinancialObligationModal } from "@components/modals/financialObligationModal";

import { headers, dataReport } from "./config";
import { usePagination } from "./utils";

export interface ITableFinancialObligationsProps {
  [key: string]: React.ReactNode;
  refreshKey?: number;
}

export function TableFinancialObligations(
  props: ITableFinancialObligationsProps
) {
  const { refreshKey } = props;
  const [loading, setLoading] = useState(true);
  const [extraDebtors, setExtraDebtors] = useState<
    ITableFinancialObligationsProps[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDebtor, setSelectedDebtor] =
    useState<ITableFinancialObligationsProps | null>(null);

  const handleEdit = (debtor: ITableFinancialObligationsProps) => {
    setSelectedDebtor(debtor);
    setIsModalOpen(true);
  };

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
    ? headers.filter((header) => ["type", "actions"].includes(header.key))
    : headers;

  useEffect(() => {
    const loadExtraDebtors = async () => {
      const storedData =
        (await localforage.getItem<ITableFinancialObligationsProps[]>(
          "financial_obligation"
        )) || [];
      setExtraDebtors(storedData);
    };

    loadExtraDebtors();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    try {
      const updatedDebtors = extraDebtors.filter((debtor) => debtor.id !== id);
      setExtraDebtors(updatedDebtors);

      await localforage.setItem("financial_obligation", updatedDebtors);

      console.log(`Debtor with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete debtor:", error);
    }
  };

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
          } else if (extraDebtors.length === 0) {
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
            return extraDebtors.map((row, rowIndex) => (
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
                          ? "center"
                          : "center"
                      }
                    >
                      {header.action ? (
                        <Stack justifyContent="space-around">
                          <Icon
                            icon={<MdOutlineEdit />}
                            appearance="dark"
                            size="16px"
                            onClick={() => handleEdit(row)}
                            cursorHover
                          />
                          <Icon
                            icon={<MdDeleteOutline />}
                            appearance="danger"
                            size="16px"
                            onClick={() => handleDelete(row.id as string)}
                            cursorHover
                          />
                        </Stack>
                      ) : (
                        cellData
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ));
          }
        })()}
      </Tbody>
      {!loading && extraDebtors.length > 0 && (
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
      {isModalOpen && selectedDebtor && (
        <FinancialObligationModal
          title="Agregar Obligacion"
          onCloseModal={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          initialValues={selectedDebtor}
          confirmButtonText="Agregar"
        />
      )}
    </Table>
  );
}

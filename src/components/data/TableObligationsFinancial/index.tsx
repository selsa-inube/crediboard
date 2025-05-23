import { useState, useEffect } from "react";
import { FormikValues } from "formik";
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
  Stack,
  Icon,
  Text,
  SkeletonLine,
  SkeletonIcon,
  useMediaQuery,
} from "@inubekit/inubekit";

import { EditFinancialObligationModal } from "@components/modals/editFinancialObligationModal";
import { NewPrice } from "@components/modals/ReportCreditsModal/components/newPrice";
import { BaseModal } from "@components/modals/baseModal";
import { currencyFormat } from "@utils/formatData/currency";

import { headers, dataReport } from "./config";
import { usePagination } from "./utils";
import { IDataInformationItem } from "./types";

export interface ITableFinancialObligationsProps {
  type?: string;
  id?: string;
  propertyValue?: string;
  fee?: string;
  balance?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any;
  refreshKey?: number;
  showActions?: boolean;
  showOnlyEdit?: boolean;
  showButtons?: boolean;
}

export function TableFinancialObligations(
  props: ITableFinancialObligationsProps
) {
  const { refreshKey, showActions, showOnlyEdit, initialValues } = props;
  const [loading, setLoading] = useState(true);
  const [extraDebtors, setExtraDebtors] = useState<
    ITableFinancialObligationsProps[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedDebtor, setSelectedDebtor] =
    useState<ITableFinancialObligationsProps | null>(null);

  const handleEdit = (debtor: ITableFinancialObligationsProps) => {
    let balance = "";
    let fee = "";
    if (typeof debtor.propertyValue === "string") {
      const values = debtor.propertyValue.split(",");
      balance = currencyFormat(Number(values[1]?.trim() || 0));
      fee = currencyFormat(Number(values[2]?.trim() || 0));
    }

    setSelectedDebtor({
      ...debtor,
      balance,
      fee,
    });
    setIsModalOpen(true);
  };

  const {
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
  } = usePagination();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const isMobile = useMediaQuery("(max-width:880px)");
  const visibleHeaders = isMobile
    ? headers.filter(
        (header) =>
          ["type", "balance", "actions"].includes(header.key) &&
          (showActions || header.key !== "actions")
      )
    : headers.filter((header) => showActions || header.key !== "actions");
  useEffect(() => {
    const data = Array.isArray(initialValues) ? initialValues : [initialValues];

    if (data && data.length > 0) {
      const borrowerList = Array.isArray(data[0]?.borrowers)
        ? data[0]?.borrowers
        : data;

      const dataFromInitialValues =
        borrowerList?.[0]?.borrowerProperties?.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (prop: any) => prop.propertyName === "FinancialObligation"
        ) || [];

      setExtraDebtors(dataFromInitialValues);
    } else {
      setExtraDebtors([]);
    }
  }, [refreshKey, initialValues]);

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

  const handleUpdate = async (
    updatedDebtor: ITableFinancialObligationsProps
  ) => {
    try {
      const updatedDebtors = extraDebtors.map((debtor) =>
        debtor.id === updatedDebtor.id ? updatedDebtor : debtor
      );
      setExtraDebtors(updatedDebtors);
      await localforage.setItem("financial_obligation", updatedDebtors);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating debtor:", error);
    }
  };

  const dataInformation =
    (initialValues?.[0]?.borrowers?.[0]?.borrowerProperties?.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prop: any) => prop.propertyName === "FinancialObligation"
    ) ??
      extraDebtors) ||
    [];

  const totalBalance = dataInformation.reduce(
    (sum: number, item: IDataInformationItem) => {
      let balance = 0;
      if (typeof item.balance === "number") {
        balance = item.balance;
      } else if (typeof item.propertyValue === "string") {
        const parts = item.propertyValue.split(",");
        balance = parseFloat(parts[1]) || 0;
      }
      return sum + balance;
    },
    0
  );

  const totalFee = dataInformation.reduce(
    (sum: number, item: IDataInformationItem) => {
      let fee = 0;
      if (typeof item.fee === "number") {
        fee = item.fee;
      } else if (typeof item.propertyValue === "string") {
        const parts = item.propertyValue.split(",");
        fee = parseFloat(parts[2]) || 0;
      }
      return sum + fee;
    },
    0
  );

  return (
    <>
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
                    align="center"
                    style={{ whiteSpace: "nowrap" }}
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return dataInformation.map((prop: any, rowIndex: number) => {
                let values: string[] = [];
                if (typeof prop.propertyValue === "string") {
                  values = prop.propertyValue
                    .split(",")
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((val: any) => val.trim());
                } else if (Array.isArray(prop.propertyValue)) {
                  values = prop.propertyValue.map(String);
                } else {
                  values = Object.entries(prop)
                    .filter(([key]) => key !== "id")
                    .map(([, value]) => String(value).trim());
                }

                return (
                  <Tr key={rowIndex}>
                    {visibleHeaders.map((header, colIndex) => {
                      let cellData = values[colIndex] || "";
                      const isCurrency = ["balance", "fee"].includes(
                        header.key
                      );
                      if (isCurrency) {
                        cellData = isNaN(Number(cellData))
                          ? cellData
                          : currencyFormat(Number(cellData), false);
                      }

                      const isFromInitialValues = Boolean(prop.property_name);
                      if (
                        isFromInitialValues &&
                        colIndex === values.length - 2
                      ) {
                        cellData =
                          `${values[colIndex]}/${values[colIndex + 1]}`.trim();
                      }

                      return (
                        <Td
                          key={colIndex}
                          appearance={rowIndex % 2 === 0 ? "light" : "dark"}
                          type={header.action ? "custom" : "text"}
                          align={isCurrency ? "right" : "center"}
                        >
                          {header.action ? (
                            <Stack justifyContent="space-around">
                              <Icon
                                icon={<MdOutlineEdit />}
                                appearance="dark"
                                size="16px"
                                onClick={() => handleEdit(prop)}
                                cursorHover
                              />
                              {!showOnlyEdit && (
                                <Icon
                                  icon={<MdDeleteOutline />}
                                  appearance="danger"
                                  size="16px"
                                  onClick={() => {
                                    setSelectedDebtor(prop);
                                    setIsDeleteModal(true);
                                  }}
                                  cursorHover
                                />
                              )}
                            </Stack>
                          ) : (
                            cellData
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              });
            }
          })()}
        </Tbody>
        {!loading && dataInformation.length > 0 && (
          <Tfoot>
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} type="custom" align="center">
                <Pagination
                  firstEntryInPage={firstEntryInPage}
                  lastEntryInPage={dataInformation.length}
                  totalRecords={dataInformation.length}
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
          <EditFinancialObligationModal
            title={`${dataReport.edit} ${selectedDebtor.type || ""}`}
            onCloseModal={() => setIsModalOpen(false)}
            onConfirm={async (updatedDebtor: FormikValues) => {
              const updatedDebtorWithFee: ITableFinancialObligationsProps = {
                ...updatedDebtor,
                fee: updatedDebtor.fee,
                balance: updatedDebtor.balance,
              };
              await handleUpdate(updatedDebtorWithFee);
            }}
            initialValues={selectedDebtor}
            confirmButtonText={dataReport.save}
          />
        )}
        {isDeleteModal && (
          <BaseModal
            title={dataReport.deletion}
            nextButton={dataReport.delete}
            backButton={dataReport.cancel}
            handleNext={() => {
              if (selectedDebtor) {
                handleDelete(selectedDebtor.id as string);
                setIsDeleteModal(false);
              }
            }}
            handleClose={() => setIsDeleteModal(false)}
          >
            <Stack width="400px">
              <Text>{dataReport.content}</Text>
            </Stack>
          </BaseModal>
        )}
      </Table>
      <Stack
        gap="48px"
        direction={!isMobile ? "row" : "column"}
        justifyContent="center"
      >
        {loading ? (
          <SkeletonLine />
        ) : (
          <NewPrice
            value={totalBalance}
            label={dataReport.descriptionTotalBalance}
          />
        )}
        {loading ? (
          <SkeletonLine />
        ) : (
          <NewPrice value={totalFee} label={dataReport.descriptionTotalFee} />
        )}
      </Stack>
    </>
  );
}

import { useState } from "react";
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
import { useMediaQuery } from "@inubekit/hooks";
import { IRowExtraordinaryPayment } from "../../modals/ExtraordinaryPaymentModal/types";
import {
  headersTableExtraordinaryPayment,
  rowsVisbleMobile,
  rowsActions,
} from "./config";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

export interface TableExtraordinaryPaymentProps {
  data: IRowExtraordinaryPayment[];
  onClickDetails: (id: string) => void;
  onClickEdit: (id: string) => void;
  onClickEliminate: (id: string) => void;
}

const usePagination = (data: IRowExtraordinaryPayment[]) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageLength = 5;
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageLength);

  const handleStartPage = () => setCurrentPage(0);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleEndPage = () => setCurrentPage(totalPages - 1);

  const firstEntryInPage = currentPage * pageLength;
  const lastEntryInPage = Math.min(firstEntryInPage + pageLength, totalRecords);

  const currentData = data.slice(firstEntryInPage, lastEntryInPage);

  return {
    currentPage,
    totalRecords,
    totalPages,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
  };
};

export const TableExtraordinaryPayment = (
  props: TableExtraordinaryPaymentProps
) => {
  const { data, onClickDetails, onClickEdit, onClickEliminate } = props;
  const headers = headersTableExtraordinaryPayment;

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const isMobile = useMediaQuery("(max-width:880px)");

  const visbleHeaders = isMobile
    ? headers.filter((header) => rowsVisbleMobile.includes(header.key))
    : headers;
  const visbleActions = isMobile
    ? rowsActions.filter((action) => rowsVisbleMobile.includes(action.key))
    : rowsActions;

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
  } = usePagination(data);
  return (
    <Table>
      <Thead>
        <Tr>
          {!loading && visbleHeaders.map((header) => (
            <Th key={header.key} align="left">
              {header.label}
            </Th>
          ))}
          { !loading &&
            visbleActions &&
            visbleActions.length > 0 &&
            visbleActions.map((action) => (
              <Th key={action.key} action>
                {action.label}
              </Th>
            ))
          }
          {
            loading && visbleHeaders.map(
              (header) => (
                <Td key={header.key} align="left" type="custom">
                  <SkeletonLine />
                </Td>)

            )
          }
          {
            loading && visbleActions.map(
              (action) => (
                <Td key={action.key} type="custom">
                  <SkeletonLine />
                </Td>
              )
            )
          }
        </Tr>
      </Thead>
      <Tbody>
        {
          loading && (
            <Tr>
              <Td
                colSpan={visbleHeaders.length + visbleActions.length}
                align="center"
                type="custom"
              >
                <SkeletonLine />
              </Td>
            </Tr>
          )
        }
        {!loading && currentData &&
          currentData.length > 0 &&
          currentData.map((row, indx) => (
            <Tr key={row.id} zebra={indx % 2 !== 0}>
              {visbleHeaders.map((header) => (
                <Td key={header.key} align="left">
                  {header.mask ? header.mask(row[header.key]) : row[header.key]}
                </Td>
              ))}
              {visbleActions &&
                visbleActions.length > 0 &&
                visbleActions.map((action) => (
                  <Td key={action.key} type="custom">
                    {action.container(
                      () => onClickDetails(row.id),
                      () => onClickEdit(row.id),
                      () => onClickEliminate(row.id)
                    )}
                  </Td>
                ))}
            </Tr>
          ))}
        {!loading && currentData.length === 0  && (
          <Tr>
            <Td
              colSpan={visbleHeaders.length + visbleActions.length}
              align="center"
              type="custom"
            >
              <Text
                size="large"
                type="label"
                appearance="gray"
                textAlign="center"
              >
                ¡Ups! No se encontraron registros.
              </Text>
            </Td>
          </Tr>
        )}
      </Tbody>
      {data.length > 0 && !loading  && (
        <Tfoot>
          <Tr border="bottom">
            <Td
              colSpan={visbleHeaders.length + visbleActions.length}
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
  );
};

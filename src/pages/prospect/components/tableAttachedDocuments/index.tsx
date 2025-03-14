import { useState, useEffect } from "react";
import {
  MdAttachFile,
  MdOutlineFileDownload,
  MdOutlineHighlightOff,
} from "react-icons/md";
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
import { Icon, Text, SkeletonLine, SkeletonIcon} from "@inubekit/inubekit";

import { get } from "@mocks/utils/dataMock.service";
import { mockAttachedDocuments } from "@mocks/filing-application/attached-documents/attacheddocuments.mock";

import { headers, dataReport } from "./config";
import { usePagination } from "./utils";

interface ITableAttachedDocumentsProps {
  isMobile: boolean;
}

export function TableAttachedDocuments(props: ITableAttachedDocumentsProps) {
  const { isMobile } = props;

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

  const [attachedDocuements, setAttachedDocuements] = useState(
    mockAttachedDocuments
  );

  useEffect(() => {
    get("attached_documents")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setAttachedDocuements(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching money destinations data:", error.message);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const visibleHeaders = isMobile
    ? headers.filter((header) =>
        ["borrower", "attach", "download", "remove"].includes(header.key)
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
            <Tr>
              {visibleHeaders.map((_, index) => (
                <Td key={index} type="custom">
                  <SkeletonLine />
                </Td>
              ))}
            </Tr>;
          } else if (attachedDocuements.length === 0) {
            <Tr>
              <Td colSpan={visibleHeaders.length} align="center" type="custom">
                <Text
                  size="large"
                  type="label"
                  appearance="gray"
                  textAlign="center"
                >
                  {dataReport.noData}
                </Text>
              </Td>
            </Tr>;
          } else {
            return attachedDocuements.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {visibleHeaders.map((header, colIndex) => {
                  const cellData = row[header.key];
                  const customColumn = [
                    "attach",
                    "download",
                    "remove",
                    "attached",
                  ].includes(header.key);
                  return (
                    <Td
                      key={colIndex}
                      width={customColumn ? "70px" : "auto"}
                      appearance={rowIndex % 2 === 0 ? "light" : "dark"}
                      type={customColumn ? "custom" : "text"}
                      align={
                        typeof header.action ||
                        (typeof cellData === "string" && cellData.includes("$"))
                          ? "center"
                          : "left"
                      }
                    >
                      {header.key === "attach" ? (
                        <Icon
                          icon={<MdAttachFile />}
                          appearance="dark"
                          size="16px"
                          cursorHover
                        />
                      ) : (
                        cellData
                      )}
                      {header.key === "download" && (
                        <Icon
                          icon={<MdOutlineFileDownload />}
                          appearance="dark"
                          size="16px"
                          cursorHover
                        />
                      )}
                      {header.key === "remove" && (
                        <Icon
                          icon={<MdOutlineHighlightOff />}
                          appearance="danger"
                          size="16px"
                          cursorHover
                        />
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ));
          }
        })()}
      </Tbody>
      {!loading && attachedDocuements.length > 0 && (
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

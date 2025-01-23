import { useState, useMemo } from "react";
import { IPosition } from "@pages/addProspect/types";

const usePagination = (data: IPosition[], pagerecord: number) => {
  const pageLength = pagerecord;
  const [currentPage, setCurrentPage] = useState(0);
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageLength);

  const handleStartPage = () => setCurrentPage(0);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleEndPage = () => setCurrentPage(totalPages - 1);

  const firstEntryInPage = currentPage * pageLength;
  const lastEntryInPage = Math.min(firstEntryInPage + pageLength, totalRecords);

  const paginatedData = useMemo(() => {
    return data.slice(firstEntryInPage, lastEntryInPage);
  }, [data, firstEntryInPage, lastEntryInPage]);

  return {
    currentPage,
    totalPages,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    paginatedData,
  };
};

export { usePagination };

import { useState } from "react";

interface RowData {
  tipo: string;
  saldo: string;
  cuota: string;
  entidad: string;
  medioPago: string;
  altura: string;
  acciones: string;
  id: string;
}

export const headers: {
  label: string;
  key: keyof RowData;
  action?: boolean;
}[] = [
  { label: "Tipo", key: "tipo" },
  { label: "Saldo", key: "saldo" },
  { label: "Cuota", key: "cuota" },
  { label: "Entidad", key: "entidad" },
  { label: "Medio-pago", key: "medioPago" },
  { label: "Id", key: "id" },
  { label: "Altura", key: "altura" },
  { label: "Acciones", key: "acciones", action: true },
];

export const data: RowData[] = [
  {
    tipo: "Consumo",
    saldo: "10.000.000",
    cuota: "600.000",
    entidad: "Bancolombia",
    medioPago: "Caja",
    id: "12546",
    altura: "5/60",
    acciones: "",
  },
  {
    tipo: "Tarjeta",
    saldo: "2.000.000",
    cuota: "300.000",
    entidad: "Falabella",
    medioPago: "Caja",
    id: "3524",
    altura: "10/40",
    acciones: "",
  },
  {
    tipo: "Vivienda",
    saldo: "50.000.000",
    cuota: "1.000.000",
    entidad: "Davivienda",
    medioPago: "Caja",
    id: "4721",
    altura: "12/60",
    acciones: "",
  },
  {
    tipo: "Vehículo",
    saldo: "20.000.000",
    cuota: "900.000",
    entidad: "Finandina",
    medioPago: "Caja",
    id: "-",
    altura: "-",
    acciones: "",
  },
  {
    tipo: "Otros",
    saldo: "5.000.000",
    cuota: "500.000",
    entidad: "Propio",
    medioPago: "Nómina conv.",
    id: "-",
    altura: "-",
    acciones: "",
  },
];


export const usePagination = () => {
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

import { IStaff } from "@services/types";

export const mockAnalyst: IStaff[] = [
  {
    userId: "12345678",
    userName: "Juan Carlos Pérez Gómez",
    identificationType: "C",
    identificationNumber: "3001234567",
    position: "Analyst",
  },
  {
    userId: "34567890",
    userName: "Carlos Andrés Martínez Torres",
    identificationType: "C",
    identificationNumber: "3003456789",
    position: "Analyst",
  },
];

export const mockAccountManager: IStaff[] = [
  {
    userId: "78901234",
    userName: "Jorge Enrique Díaz Vargas",
    identificationType: "C",
    identificationNumber: "3007890123",
    position: "Account_manager",
  },
];

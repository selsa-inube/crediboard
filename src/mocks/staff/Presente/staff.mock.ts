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
    userId: "23456789",
    userName: "María Fernanda López Rodríguez",
    identificationType: "C",
    identificationNumber: "3002345678",
    position: "Analyst",
  },
];

export const mockAccountManager: IStaff[] = [
  {
    userId: "90123456",
    userName: "Ricardo José Fernández Muñoz",
    identificationType: "C",
    identificationNumber: "3009012345",
    position: "Account_manager",
  },
];

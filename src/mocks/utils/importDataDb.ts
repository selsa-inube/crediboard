import { Requests } from "@services/types";
import { mockRequests as mockRequestsDefault } from "@mocks/requests/requests.mock";
import { mockRequests as mockRequestsPresente } from "@mocks/requests/Presente/requests.mock";
import { mockRequests as mockRequestsCooservunal } from "@mocks/requests/Cooservunal/requests.mock";
import { mockRequests as mockRequestsCorbanca } from "@mocks/requests/Corbanca/requests.mock";
import { mockRequests as mockRequestsFondecom } from "@mocks/requests/Fondecom/requests.mock";

import { mockStaff as mockStaffDefault } from "@mocks/staff/staff.mock";
import { mockStaff as mockStaffPresente } from "@mocks/staff/Presente/staff.mock";
import { mockStaff as mockStaffCooservunal } from "@mocks/staff/Cooservunal/staff.mock";
import { mockStaff as mockStaffCorbanca } from "@mocks/staff/Corbanca/staff.mock";
import { mockStaff as mockStaffFondecom } from "@mocks/staff/Fondecom/staff.mock";

import { approval_by_credit_request_Mock as approval_by_credit_request_MockDefault } from "@mocks/financialReporting/Approvals.mock";
import { approval_by_credit_request_Mock as approval_by_credit_request_MockPresente } from "@mocks/financialReporting/Presente/Approvals.mock";
import { approval_by_credit_request_Mock as approval_by_credit_request_MockCooservunal } from "@mocks/financialReporting/Cooservunal/Approvals.mock";
import { approval_by_credit_request_Mock as approval_by_credit_request_MockCorbanca } from "@mocks/financialReporting/Corbanca/Approvals.mock";
import { approval_by_credit_request_Mock as approval_by_credit_request_MockFondecom } from "@mocks/financialReporting/Fondecom/Approvals.mock";

import { documents as documentsDefault } from "@mocks/financialReporting/documents.mock";
import { documents as documentsPresente } from "@mocks/financialReporting/Presente/documents.mock";
import { documents as documentsCooservunal } from "@mocks/financialReporting/Cooservunal/documents.mock";
import { documents as documentsCorbanca } from "@mocks/financialReporting/Corbanca/documents.mock";
import { documents as documentsFondecom } from "@mocks/financialReporting/Fondecom/documents.mock";

import { error_issued as error_issuedDefault } from "@mocks/financialReporting/error.mock";
import { error_issued as error_issuedPresente } from "@mocks/financialReporting/Presente/error.mock";
import { error_issued as error_issuedCooservunal } from "@mocks/financialReporting/Cooservunal/error.mock";
import { error_issued as error_issuedCorbanca } from "@mocks/financialReporting/Corbanca/error.mock";
import { error_issued as error_issuedFondecom } from "@mocks/financialReporting/Fondecom/error.mock";

import { traceMock as traceMockDefault } from "@mocks/financialReporting/trace.mock";
import { traceMock as traceMockPresente } from "@mocks/financialReporting/Presente/trace.mock";
import { traceMock as traceMockCooservunal } from "@mocks/financialReporting/Cooservunal/trace.mock";
import { traceMock as traceMockCorbanca } from "@mocks/financialReporting/Corbanca/trace.mock";
import { traceMock as traceMockFondecom } from "@mocks/financialReporting/Fondecom/trace.mock";

import { requirementsMock as requirementsMockPresente } from "@mocks/financialReporting/Presente/requirements.mock";
import { requirementsMock as requirementsMockCooservunal } from "@mocks/financialReporting/Cooservunal/requirements.mock";
import { requirementsMock as requirementsMockCorbanca } from "@mocks/financialReporting/Corbanca/requirements.mock";
import { requirementsMock as requirementsMockFondecom } from "@mocks/financialReporting/Presente/requirements.mock";



const mockRequestsMap: { [key: string]: Requests[] } = {
    Presente: mockRequestsPresente,
    Cooservunal: mockRequestsCooservunal,
    Corbanca: mockRequestsCorbanca,
    Fondecom: mockRequestsFondecom,
    default: mockRequestsDefault
};

export const mockRequests = (company: string): Requests[] => mockRequestsMap[company] || mockRequestsMap.default;

const mockStaffMap: { [key: string]: typeof mockStaffDefault } = {
    Presente: mockStaffPresente,
    Cooservunal: mockStaffCooservunal,
    Corbanca: mockStaffCorbanca,
    Fondecom: mockStaffFondecom,
    default: mockStaffDefault
};

export const mockStaff = (company: string) => mockStaffMap[company] || mockStaffMap.default;

const approvalByCreditRequestMockMap: { [key: string]: typeof approval_by_credit_request_MockDefault } = {
    Presente: approval_by_credit_request_MockPresente,
    Cooservunal: approval_by_credit_request_MockCooservunal,
    Corbanca: approval_by_credit_request_MockCorbanca,
    Fondecom: approval_by_credit_request_MockFondecom,
    default: approval_by_credit_request_MockDefault
};

export const approvalByCreditRequestMock = (company: string) => approvalByCreditRequestMockMap[company] || approvalByCreditRequestMockMap.default;

const documentsMap: { [key: string]: typeof documentsDefault } = {
    Presente: documentsPresente,
    Cooservunal: documentsCooservunal,
    Corbanca: documentsCorbanca,
    Fondecom: documentsFondecom,
    default: documentsDefault
};

export const documents = (company: string) => documentsMap[company] || documentsMap.default;

const errorIssuedMap: { [key: string]: typeof error_issuedDefault } = {
    Presente: error_issuedPresente,
    Cooservunal: error_issuedCooservunal,
    Corbanca: error_issuedCorbanca,
    Fondecom: error_issuedFondecom,
    default: error_issuedDefault
};

export const errorIssued = (company: string) => errorIssuedMap[company] || errorIssuedMap.default;

const traceMocks: { [key: string]: typeof traceMockDefault } = {
    Presente: traceMockPresente,
    Cooservunal: traceMockCooservunal,
    Corbanca: traceMockCorbanca,
    Fondecom: traceMockFondecom,
    default: traceMockDefault
};

export const traceMock = (company: string) => traceMocks[company] || traceMocks.default;

const businessUnit = {
  Presente: requirementsMockPresente,
  Cooservunal: requirementsMockCooservunal,
  Corbanca: requirementsMockCorbanca,
  Fondecom: requirementsMockFondecom,
};
export const requirementsMock = (company: string) =>
  businessUnit[company as keyof typeof businessUnit];
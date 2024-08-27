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




export const mockRequests = (company: string): Requests[] => {
    switch (company) {
        case "Presente":
            return mockRequestsPresente;
        case "Cooservunal":
            return mockRequestsCooservunal;
        case "Corbanca":
            return mockRequestsCorbanca;
        case "Fondecom":
            return mockRequestsFondecom;
        default:
            return mockRequestsDefault;
    }
}

export const mockStaff = (company: string) => {
    switch (company) {
        case "Presente":
            return mockStaffPresente;
        case "Cooservunal":
            return mockStaffCooservunal;
        case "Corbanca":
            return mockStaffCorbanca;
        case "Fondecom":
            return mockStaffFondecom;
        default:
            return mockStaffDefault;
    }
}

export const approvalByCreditRequestMock = (company: string) => {
    switch (company) {
        case "Presente":
            return approval_by_credit_request_MockPresente;
        case "Cooservunal":
            return approval_by_credit_request_MockCooservunal;
        case "Corbanca":
            return approval_by_credit_request_MockCorbanca;
        case "Fondecom":
            return approval_by_credit_request_MockFondecom;
        default:
            return approval_by_credit_request_MockDefault;
    }
}

export const documents = (company: string) => {
    switch (company) {
        case "Presente":
            return documentsPresente;
        case "Cooservunal":
            return documentsCooservunal;
        case "Corbanca":
            return documentsCorbanca;
        case "Fondecom":
            return documentsFondecom;
        default:
            return documentsDefault;
    }
}


export const errorIssued = (company: string) => {
    switch (company) {
        case "Presente":
            return error_issuedPresente;
        case "Cooservunal":
            return error_issuedCooservunal;
        case "Corbanca":
            return error_issuedCorbanca;
        case "Fondecom":
            return error_issuedFondecom;
        default:
            return error_issuedDefault;
    }
}

export const traceMock = (company: string) => {
    switch (company) {
        case "Presente":
            return traceMockPresente;
        case "Cooservunal":
            return traceMockCooservunal;
        case "Corbanca":
            return traceMockCorbanca;
        case "Fondecom":
            return traceMockFondecom;
        default:
            return traceMockDefault;
    }
}
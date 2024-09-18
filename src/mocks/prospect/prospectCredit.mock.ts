import { IProspect } from "@services/types";
import {
  Schedule,
  GracePeriodType,
  BorrowerProperties,
} from "@src/services/enums";

export const mockProspectCredit: IProspect[] = [
  {
    prospect_id: "1",
    public_code: "999990",
    state: "New",
    loan_amount: 25000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Weekly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Juan Perez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "123456789",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "55000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 2000,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999990",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1010",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prubea",
        credit_product_code: "999991",
        loan_amount: 25000000,
        line_of_credit_code: "100",
        line_of_credit_abbreviated_name: "Compra Primera Vivienda",
        interest_rate: 1.1,
        fixed_points: 5,
        loan_term: 12,
        schedule: Schedule.Weekly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 8,
          installment_amount: 3,
          gradient_rate: 8,
          gradient_value: 1000000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Weekly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 2000,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "2000",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 10,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 150,
        abreviated_name: "prueba",
      },
    ],
  },

  {
    prospect_id: "2",
    public_code: "999991",
    state: "New",
    loan_amount: 20000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Weekly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Alfonso Gomez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "123456789",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "55000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 2000,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999991",
        line_of_credit_description: "descipcion",
        borrower_id: "1010",
        consolidated_credit_schema: "Libre Inversion",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Libre Inversion",
        credit_product_code: "999991",
        loan_amount: 20000000,
        line_of_credit_code: "100",
        line_of_credit_abbreviated_name: "Libre Inversion",
        interest_rate: 1.1,
        fixed_points: 5,
        loan_term: 12,
        schedule: Schedule.Semiannually,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 8,
          installment_amount: 3,
          gradient_rate: 8,
          gradient_value: 1000000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Weekly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 2000,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "2000",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 10,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 20000000,
        abreviated_name: "Libre Inversion",
      },
    ],
  },
  {
    prospect_id: "3",
    public_code: "999992",
    state: "New",
    loan_amount: 30000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Monthly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Maria Lopez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "987654321",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "60000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 3000,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999992",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1011",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999992",
        loan_amount: 30000000,
        line_of_credit_code: "101",
        line_of_credit_abbreviated_name: "Construccion de vivienda",
        interest_rate: 1.2,
        fixed_points: 6,
        loan_term: 12,
        schedule: Schedule.Monthly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 9,
          installment_amount: 4,
          gradient_rate: 9,
          gradient_value: 2000000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Monthly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 3000,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "3000",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 11,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 30000000,
        abreviated_name: "Construccion de vivienda",
      },
    ],
  },
  {
    prospect_id: "4",
    public_code: "999993",
    state: "New",
    loan_amount: 15000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Monthly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Carlos Martinez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "1122334455",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "45000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 1500,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999993",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1012",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999993",
        loan_amount: 15000000,
        line_of_credit_code: "102",
        line_of_credit_abbreviated_name: "Credito sin intereses",
        interest_rate: 1.3,
        fixed_points: 7,
        loan_term: 12,
        schedule: Schedule.Monthly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 7,
          installment_amount: 2,
          gradient_rate: 7,
          gradient_value: 1500000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Monthly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 1500,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "1500",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 12,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 15000000,
        abreviated_name: "Credito sin intereses",
      },
    ],
  },
  {
    prospect_id: "5",
    public_code: "999994",
    state: "New",
    loan_amount: 18000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Weekly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Ana Torres",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "2233445566",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "50000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 1800,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999994",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1013",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999994",
        loan_amount: 18000000,
        line_of_credit_code: "103",
        line_of_credit_abbreviated_name: "Construccion de vivienda",
        interest_rate: 1.4,
        fixed_points: 8,
        loan_term: 12,
        schedule: Schedule.Weekly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 8,
          installment_amount: 3,
          gradient_rate: 8,
          gradient_value: 1800000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Weekly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 1800,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "1800",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 13,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 18000000,
        abreviated_name: "Construccion de vivienda",
      },
    ],
  },
  {
    prospect_id: "6",
    public_code: "999995",
    state: "New",
    loan_amount: 22000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Monthly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Luis Ramirez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "3344556677",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "55000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 2200,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999995",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1014",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999995",
        loan_amount: 22000000,
        line_of_credit_code: "104",
        line_of_credit_abbreviated_name: "Credito sin intereses",
        interest_rate: 1.5,
        fixed_points: 9,
        loan_term: 12,
        schedule: Schedule.Monthly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 9,
          installment_amount: 4,
          gradient_rate: 9,
          gradient_value: 2200000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Monthly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 2200,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "2200",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 14,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 22000000,
        abreviated_name: "Credito sin intereses",
      },
    ],
  },
  {
    prospect_id: "7",
    public_code: "999996",
    state: "New",
    loan_amount: 27000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Weekly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Laura Sanchez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "4455667788",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "60000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 2700,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999996",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1015",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999996",
        loan_amount: 27000000,
        line_of_credit_code: "105",
        line_of_credit_abbreviated_name: "Credi aportes",
        interest_rate: 1.6,
        fixed_points: 10,
        loan_term: 12,
        schedule: Schedule.Weekly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 10,
          installment_amount: 5,
          gradient_rate: 10,
          gradient_value: 2700000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Weekly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 2700,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "2700",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 15,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 27000000,
        abreviated_name: "Credi aportes",
      },
    ],
  },
  {
    prospect_id: "8",
    public_code: "999997",
    state: "New",
    loan_amount: 32000000,
    installment_limit: 24,
    term_limit: 12,
    timestamp: "2024-01-31T23:59:59Z",
    selected_payment_schedule: Schedule.Monthly,
    selected_rate_type: "Fixed",
    payment_method: "Transferencia bancaria",
    grace_period: 3,
    grace_period_type: GracePeriodType.InterestForgiveness,
    borrower: [
      {
        borrower_name: "Pedro Gomez",
        borrower_type: "Principal",
        borrower_identification_type: "CC",
        borrower_identification_number: "5566778899",
        borrower_property: [
          {
            property_name:
              BorrowerProperties.maximumIndebtednessAccordingToPaymentCapacity,
            property_value: "65000000",
          },
        ],
      },
    ],
    consolidated_credit: [
      {
        consolidated_amount: 3200,
        consolidated_amount_type: "Principal",
        estimated_date_of_consolidation: "2024-01-15T23:59:59Z",
        credit_id: "999997",
        line_of_credit_description: "Principal descripcion",
        borrower_id: "1016",
        consolidated_credit_schema: "Credit schema",
      },
    ],
    credit_product: [
      {
        abbreviated_name: "Prueba",
        credit_product_code: "999997",
        loan_amount: 32000000,
        line_of_credit_code: "106",
        line_of_credit_abbreviated_name: "Libre Inversion",
        interest_rate: 1.7,
        fixed_points: 11,
        loan_term: 12,
        schedule: Schedule.Monthly,
        ordinary_installment_for_principal: {
          term: 10,
          number_of_installments: 10,
          schedule: Schedule.Quarterly,
          installment_amount_for_capital: 11,
          installment_amount: 6,
          gradient_rate: 11,
          gradient_value: 3200000,
          gradient_schedule: "monthly",
          first_gradient_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "TRANSFER",
        },
        ordinary_installment_for_interest: {
          schedule: Schedule.Monthly,
          payment_channel_code: "TRANSFER",
        },
        extraordinary_installment: {
          installment_amount: 3200,
          installment_date: "2024-01-15T23:59:59Z",
          payment_channel_code: "CAJA",
        },
        acquired_cash_flow: {
          amount: "3200",
          date: "2024-01-15T23:59:59Z",
          payment_channel_unique_code: "Principal",
          flow_number: 16,
        },
      },
    ],
    outlay: [
      {
        date: "2024-01-15T23:59:59Z",
        amount: 32000000,
        abreviated_name: "Libre Inversion",
      },
    ],
  },
];

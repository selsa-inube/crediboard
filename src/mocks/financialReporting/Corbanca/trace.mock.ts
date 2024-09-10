/*  
trace_type:
novelty, executed_task,
novelty_document, document, message
*/

export const traceMock = [
  {
    trace_id: "3c6e2f9b-3456-4e7d-9878-3e8e8a8b8a8b",
    trace_value: "Verification",
    credit_request_id: "999996",
    use_case: "verification",
    user_id: "user_003",
    execution_date: "18/sep/2023",
    justification: "Documents verified",
    decision_taken_by_user: "verified",
    trace_type: "novelty_document",
    read_novelty: "N",
  },
  {
    trace_id: "4d7f3f0c-4567-4f8e-9879-3e8e8a8b8a8b",
    trace_value: "Final approval",
    credit_request_id: "999997",
    use_case: "approval",
    user_id: "user_004",
    execution_date: "23/dic/2023",
    justification: "Final approval given",
    decision_taken_by_user: "approved",
    trace_type: "document",
    read_novelty: "N",
  },
];
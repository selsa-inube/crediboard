/*  
trace_type:
novelty, executed_task,
novelty_document, document, message
*/

export const traceMock = [
  {
    trace_id: "1f4b0f8a-1234-4f5c-9876-3e8e8a8b8a8b",
    trace_value: "Initial submission",
    credit_request_id: "999990",
    use_case: "submission",
    user_id: "user_001",
    execution_date: "01/jun/2023",
    justification: "Initial request submitted",
    decision_taken_by_user: "submitted",
    trace_type: "executed_task",
    read_novelty: "Y",
  },
  {
    trace_id: "2a5b1c9d-5678-4e7d-8765-4f9f9b9c9d9d",
    trace_value: "Document uploaded",
    credit_request_id: "999990",
    use_case: "document_upload",
    user_id: "user_002",
    execution_date: "02/jun/2023",
    justification: "Uploaded required documents",
    decision_taken_by_user: "uploaded",
    trace_type: "novelty_document",
    read_novelty: "Y",
  },
  {
    trace_id: "3c6d2e0f-6789-4f8e-9877-5eafafb0b0b0",
    trace_value: "Credit review started",
    credit_request_id: "999990",
    use_case: "credit_review",
    user_id: "user_003",
    execution_date: "03/jun/2023",
    justification: "Started reviewing credit request",
    decision_taken_by_user: "review_started",
    trace_type: "executed_task",
    read_novelty: "N",
  },
  {
    trace_id: "4d7e3f1g-7890-4f9f-0988-6fbfc0c1d1d1",
    trace_value: "Additional info requested",
    credit_request_id: "999990",
    use_case: "info_request",
    user_id: "user_004",
    execution_date: "04/jun/2023",
    justification: "Requested additional information",
    decision_taken_by_user: "info_requested",
    trace_type: "message",
    read_novelty: "Y",
  },
  {
    trace_id: "5e8f4g2h-8901-4g0g-1099-7g0g0d2e2e2e",
    trace_value: "Additional info submitted",
    credit_request_id: "999990",
    use_case: "info_submission",
    user_id: "user_005",
    execution_date: "05/jun/2023",
    justification: "Submitted additional information",
    decision_taken_by_user: "info_submitted",
    trace_type: "novelty",
    read_novelty: "N",
  },
  {
    trace_id: "2b5d1f8a-2345-4d6c-9877-3e8e8a8b8a8b",
    trace_value: "Review",
    credit_request_id: "999991",
    use_case: "review",
    user_id: "user_002",
    execution_date: "06/ene/2023",
    justification: "Reviewed by manager",
    decision_taken_by_user: "approved",
    trace_type: "novelty",
    read_novelty: "Y",
  },
  {
    trace_id: "3c6e2f9b-3456-4e7d-9878-3e8e8a8b8a8b",
    trace_value: "Verification",
    credit_request_id: "999993",
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
    credit_request_id: "999994",
    use_case: "approval",
    user_id: "user_004",
    execution_date: "23/dic/2023",
    justification: "Final approval given",
    decision_taken_by_user: "approved",
    trace_type: "document",
    read_novelty: "N",
  },
];

interface IlistsOfRequirementsByPackage {
  descriptionEvaluationRequirement: string;
  descriptionUse: string;
  packageId: string;
  requirementCatalogName: string;
  requirementDate: string;
  requirementPackageId: string;
  requirementStatus: string;
  typeOfRequirementToEvaluated: string;
}

export interface ITracesInRequirementsManagement {
  assignedStatus: string;
  justificationForChangeOfStatus: string;
  packageId: string;
  requirementPackageId: string;
  traceDate: string;
  traceId: string;
}

export interface IObligationsById {
  listsOfRequirementsByPackage: IlistsOfRequirementsByPackage[];
  packageDate: string;
  packageDescription: string;
  packageId: string;
  tracesInRequirementsManagement: ITracesInRequirementsManagement[];
  uniqueReferenceNumber: string;
}

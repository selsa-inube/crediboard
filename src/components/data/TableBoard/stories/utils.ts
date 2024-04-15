import { AppearenceTagObject, IEntries, IEntriesTranform } from "../types";

export const appearenceTag = (
  requirementTag: keyof typeof AppearenceTagObject
) => AppearenceTagObject[requirementTag];

export const transformData = (data: IEntries[]) => {
  const transformed: IEntriesTranform[] = [];

  data.forEach((item) => {
    const sectionTitle = item.section.title;
    const requirements = item.section.requirements;

    requirements.forEach((requirement, index) => {
      if (transformed.length <= index) {
        transformed.push({ id: requirement.id });
      }
      transformed[index][sectionTitle] = requirement.description;
      transformed[index][requirement.description] = requirement.tag as string;
    });
  });

  return transformed;
};

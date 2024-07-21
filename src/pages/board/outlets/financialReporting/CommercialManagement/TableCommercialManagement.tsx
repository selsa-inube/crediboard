import { TableBoard } from "@components/data/TableBoard";
import {
  Accordion,
  type IAccordionProps,
} from "@src/components/data/Accordion";
import {
  entriesCommercialManagement,
  titlesCommercialManagement,
} from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";

interface IDataCommercialManagement {
  dataAccordeon: IAccordionProps[];
  dataRef: React.RefObject<HTMLDivElement>;
}

export const DataCommercialManagement = (props: IDataCommercialManagement) => {
  const { dataAccordeon, dataRef } = props;
  return (
    <div ref={dataRef}>
      <TableBoard
        id="commercialManagement"
        titles={titlesCommercialManagement}
        entries={entriesCommercialManagement}
        appearanceTable={{ title: "dark", borderTable: true, widthTd: "180px" }}
      />
      {dataAccordeon.map((accordeon) => (
        <Accordion
          key={accordeon.name}
          name={accordeon.name}
          title={accordeon.title}
          content={accordeon.content}
        />
      ))}
    </div>
  );
};

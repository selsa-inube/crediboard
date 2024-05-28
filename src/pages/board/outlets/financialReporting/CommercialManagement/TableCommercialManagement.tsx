import { TableBoard } from "@components/data/TableBoard";
import { Accordeon, type IAccordionProps } from "@components/data/Accordeon";
import {
  entriesCommercialManagement,
  titlesCommercialManagement,
} from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";

interface IDataCommercialManagement {
  dataAccordeon: IAccordionProps[];
}

export const DataCommercialManagement = (props: IDataCommercialManagement) => {
  const { dataAccordeon } = props;
  return (
    <>
      <TableBoard
        id="commercialManagement"
        titles={titlesCommercialManagement}
        entries={entriesCommercialManagement}
        efectzebra={false}
        appearanceTitles="dark"
      />
      {dataAccordeon.map((accordeon) => (
        <Accordeon
          key={accordeon.name}
          name={accordeon.name}
          title={accordeon.title}
          component={accordeon.component}
        />
      ))}
    </>
  );
};

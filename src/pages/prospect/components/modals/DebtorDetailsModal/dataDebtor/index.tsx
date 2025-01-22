import { Stack } from "@inubekit/stack";

import { CardGray } from "@components/cards/CardGray";
import { MockDataDebtor } from "@mocks/filing-application/add-borrower/addborrower.mock";

import { dataDebtor } from "./config";

export function DataDebtor() {
  const data = MockDataDebtor[0];

  return (
    <Stack direction="column" gap="12px">
      <CardGray label={dataDebtor.labelTypeDocument} data={data.TypeDocument} />
      <CardGray
        label={dataDebtor.labelNumberDocument}
        data={data.NumberDocument}
      />
      <CardGray label={dataDebtor.labelName} data={data.Name} />
      <CardGray label={dataDebtor.labelLastName} data={data.LastName} />
      <CardGray
        label={dataDebtor.labelEmail}
        placeHolder={data.Email}
        apparencePlaceHolder="gray"
      />
      <CardGray label={dataDebtor.labelNumber} data={data.Number} />
      <CardGray label={dataDebtor.labelSex} data={data.Sex} />
      <CardGray label={dataDebtor.labelAge} data={data.Age} />
      <CardGray label={dataDebtor.labelRelation} data={data.TypeDocument} />
    </Stack>
  );
}

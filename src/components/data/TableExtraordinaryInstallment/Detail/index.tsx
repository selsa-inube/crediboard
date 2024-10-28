import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import { icons } from "./config";

export function Detail() {
  return (
    <Stack justifyContent="space-around" >
      {icons.map((item, index) => (
        <Icon
          key={index}
          icon={item.icon}
          size="16px"
          cursorHover
          appearance={item.appearance}
        />
      ))}
    </Stack>
  );
}

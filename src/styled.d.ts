import "styled-components";
import { inube } from "@inubekit/inubekit";

type Theme = typeof inube;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

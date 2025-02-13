import { User } from "@inubekit/user";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { IHeaderLink } from "./props";
import { StyledHeader, StyledLink } from "./styles";

interface IHeader {
  logoURL: JSX.Element;
  userName?: string;
  client?: string;
  links?: IHeaderLink[];
  showLinks?: boolean;
  showUser?: boolean;
}

const Header = (props: IHeader) => {
  const {
    logoURL,
    userName,
    client,
    links,
    showLinks = false,
    showUser = true,
  } = props;

  const mobile = useMediaQuery("(max-width: 420px)");

  return (
    <StyledHeader>
      <Stack alignItems="center" justifyContent="space-between">
        <Stack height={showUser ? "auto" : "53px"} alignItems="center">
          {logoURL}
        </Stack>
        <Stack justifyContent="space-between" gap="23px">
          {showLinks &&
            links &&
            links.map((link, index) => (
              <StyledLink key={index} to={link.path}>
                <Text type="label" size="medium" appearance="dark">
                  {link.label}
                </Text>
              </StyledLink>
            ))}
          {showUser && userName && (
            <User
              username={userName}
              client={client!}
              size={mobile ? "small" : "large"}
              menu={[]}
            />
          )}
        </Stack>
      </Stack>
    </StyledHeader>
  );
};

export { Header };
export type { IHeader };

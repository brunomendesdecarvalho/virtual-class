import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import { Link, LinkProps } from '@chakra-ui/react';
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  let isActive = false;
  const { asPath } = useRouter();

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }
  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }
    return (
      <Link {...rest}>
        {cloneElement(children, {
          color: isActive ? "green.500" : "blue.500",
          borderBottom: isActive ? "2px" : "0",
          borderColor: isActive ? "green.500" : undefined,
        })}
      </Link>
    );
}
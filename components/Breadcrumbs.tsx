import React from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbProps } from "antd";
import styled from "styled-components";

interface IBreadcrumbsProps extends Omit<BreadcrumbProps, "routes"> {
  routes: {
    path: string;
    name: string;
  }[];
}

const StyledBreadcrumbs = styled(Breadcrumb)`
  width: 100%;
  text-align: center;

  > span:last-child a {
    color: rgba(255, 255, 255, 0.75);
  }

  .ant-breadcrumb-link {
    color: white;
  }
  .ant-breadcrumb-separator {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Breadcrumbs = ({ routes, ...rest }: IBreadcrumbsProps): JSX.Element => (
  <StyledBreadcrumbs {...rest}>
    {routes.map(
      (route): JSX.Element => (
        <Link href={route.path} key={route.name}>
          <Breadcrumb.Item href={route.path}>{route.name}</Breadcrumb.Item>
        </Link>
      )
    )}
  </StyledBreadcrumbs>
);

export default Breadcrumbs;

import { Card, Image, Input, Row, Typography } from "antd";
import styled from "styled-components";
import Content from "./Content";

const StyledWrapper = styled.div`
  background: white;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IStyledContentProps {
  color?: "red" | "blue" | "purple";
  link?: boolean;
  fullRounded?: boolean;
}

const StyledContent = styled(Content)<IStyledContentProps>`
  height: unset;
  min-height: unset;
  background-position: top;
  background-attachment: fixed;
  background: hsla(247, 79%, 22%, 1);
  background: linear-gradient(
    180deg,
    hsla(247, 79%, 22%, 1) 0%,
    hsla(298, 84%, 17%, 1) 100%
  );
  background-image: ${({ color }) =>
    `url("/background-${color || "blue"}.svg")`};
  background-size: cover;
  margin: 0 2rem;
  padding: 3rem;
  border-radius: ${({ fullRounded }) =>
    fullRounded ? "2rem" : "2rem 2rem 0 0"};
  box-shadow: 0 1rem 2rem 1rem rgb(11 6 47 / 30%),
    0 0 6rem -6rem rgb(11 6 47 / 50%);
  z-index: 2;
  position: relative;

  ${({ link }) =>
    link &&
    `
    transition: transform 0.3s ease;
    cursor: pointer;

    .ant-card-body > * {
      transition: color 0.3s ease;
    }
    &:hover {
      transform: scale(1.025);

  `}
`;

const StyledLinkCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease;
  cursor: pointer;

  .ant-card-body > * {
    transition: color 0.3s ease;
  }

  &:hover {
    transform: scale(1.025);

    .ant-card-body > * {
      color: ${({ theme }) => theme.default.primaryColor};
    }
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 1rem;

      h4.ant-typography {
        font-size: 1rem;
      }
    }
  }
`;

const StyledWrappedTitle = styled.div<{ noMargin?: boolean }>`
  position: relative;
  text-align: center;
  ${({ noMargin }) => (noMargin ? "" : "margin-bottom: 2rem;")}
  z-index: -1;

  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 50%;
    transform: scale(3) translate(-16.6%, 2.5%);
    font-weight: 600;
    font-size: 38px;
    line-height: 1.23;
    color: rgba(255, 255, 255, 0.1);
    filter: blur(2px);

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  > .ant-typography {
    color: white;
    font-size: 3rem;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;

const StyledTitle = ({ children, noMargin = false }) => (
  <StyledWrappedTitle data-text={children} noMargin={noMargin}>
    <Typography.Title level={1}>{children}</Typography.Title>
  </StyledWrappedTitle>
);

const StyledFooterLink = styled(Row)`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.neutrals[2]};
  > * {
    text-align: center;
  }
  .ant-btn.ant-btn-link {
    color: ${({ theme }) => theme.colors.blue[6]};
  }
`;

const StyledTitle1 = styled(Typography.Title)`
  &&.ant-typography {
    margin: 0;
    color: white;
    font-size: 3rem;

    @media (max-width: 768px) {
      font-size: 1.3rem;
      line-height: 1.5;
    }
  }
`;

const StyledTitle2 = styled(Typography.Title)`
  &&.ant-typography {
    margin: 0;
    color: white;
    font-size: 8rem;

    @media (max-width: 768px) {
      font-size: 5rem;
    }
  }
`;

const StyledTitle3 = styled(Typography.Title)`
  &&.ant-typography {
    font-size: 2.375rem;
    margin: 0;
    color: white;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const StyledLogo = styled(Image)`
  width: auto;
  height: 14rem;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const StyledSearchInput = styled(Input)`
  background-color: transparent;

  input {
    background-color: transparent;
    border-radius: 0;
    color: white;

    &:placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .ant-input-suffix svg {
    fill: white;
  }
`;

export {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledFooterLink,
  StyledTitle1,
  StyledTitle2,
  StyledTitle3,
  StyledLogo,
  StyledSearchInput,
};

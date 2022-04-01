import { Card } from "antd";
import ScrollContainer from "react-indiana-drag-scroll";
import { IScrollContainerProps } from "react-indiana-drag-scroll/types/index";
import styled from "styled-components";

export const StyledWrapper = styled(Card)`
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2), 0 3rem 20rem -2rem rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border: unset;
  min-width: 100%;
  height: ${({ height }) => `${height}px` || "100%"};
  position: relative;

  @media (max-width: 768px) {
    margin: 0 -2.5rem;
  }

  .ant-card-body {
    padding: 0;
  }
  .react-pdf {
    &__Document,
    &__message--loading {
      height: 100%;
    }
    &__Page {
      display: flex;
      justify-content: center;
      width: max-content;
      height: max-content;
    }
  }
`;

export const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IStyledScrollContainerProps extends IScrollContainerProps {
  height: number;
}

export const StyledScrollContainer = styled(
  ScrollContainer
)<IStyledScrollContainerProps>`
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  display: grid;
  justify-items: center;
`;

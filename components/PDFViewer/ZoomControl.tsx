import styled from "styled-components";
import { Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const StyledZoomControl = styled(Space)`
  position: sticky;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledZoomButton = styled(Button)`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3),
    0 0.15rem 0.25rem rgba(0, 0, 0, 0.3);
`;

interface IZoomControlProps {
  onZoomOut: () => void;
  onZoomIn: () => void;
}

const ZoomControl = ({
  onZoomOut,
  onZoomIn,
}: IZoomControlProps): JSX.Element => (
  <StyledZoomControl>
    <StyledZoomButton
      type="primary"
      shape="circle"
      icon={<MinusOutlined />}
      size="large"
      onClick={onZoomOut}
    />
    <StyledZoomButton
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={onZoomIn}
    />
  </StyledZoomControl>
);

export default ZoomControl;

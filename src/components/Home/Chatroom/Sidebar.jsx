import React from "react";
import { Row, Col, Button } from "antd";
import UserInfo from "./UserInfo";
import styled from "styled-components";
import { AppContext } from "../../../Context/AppProvider";

const SidebarStyled = styled.div`
  background: #6223b5;
  color: white;
  height: 104vh;
`;

export default function Sidebar() {
  const { rooms, setSelectedRoomId } = React.useContext(AppContext);
  const handleChatClick = () => setSelectedRoomId(rooms[0].id);
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <Button type="link" onClick={handleChatClick}>
            Chat
          </Button>
        </Col>
      </Row>
    </SidebarStyled>
  );
}

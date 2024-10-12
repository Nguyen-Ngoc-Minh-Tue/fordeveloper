import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import styled from "styled-components";
import ChatList from "./Chatlist";

const SidebarStyled = styled.div`
  background: #6223b5;
  color: white;
  height: 104vh;
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <ChatList />
        </Col>
      </Row>
    </SidebarStyled>
  );
}

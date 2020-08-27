import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const Channel = ({ id, name, teamId }) => <Link to={`/view-team/${teamId}/${id}`}><SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem></Link>;

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({
  teamName, uname, channels, users, teamId, addChannelHandler, openInviteModal
}) => (
    <ChannelWrapper>
      <PushLeft>
        <br></br>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {uname}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>Channels <Icon name="add circle" onClick={addChannelHandler}></Icon></SideBarListHeader>
          {channels.map(c => (
            <Channel id={c.id} name={c.name} teamId={teamId} key={`channel=${c.id}`} />
          ))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(user)}
          <br></br>
          <a onClick={openInviteModal} style={{ padding: "10px" }}><Icon name="user circle" />Invite People</a>
        </SideBarList>
      </div>
    </ChannelWrapper>
  );

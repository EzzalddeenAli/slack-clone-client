import React from 'react';
import styled from 'styled-components';
import { Header, Icon } from 'semantic-ui-react'
import InviteToChannelModal from './containers/InviteToChannelModal';

var HeaderWrapper = styled.div`
    grid-column: 3;
    grid-row: 1;
    color: #333;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px
`

export default ({channelName, channelid}) => (
    <HeaderWrapper>
        <Header>#{channelName}</Header>
        <InviteToChannelModal channelid={channelid} />
    </HeaderWrapper>
)
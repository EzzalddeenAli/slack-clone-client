import React, { Component } from 'react'
import Teams from '../Teams';
import Channels from '../Channels';
import "./sidebar.css";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { findIndex } from "lodash";
import { decode } from "jsonwebtoken";
import AddChannelModal from '../AddChannelModal';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import InviteToTeamModal from './InviteToTeamModal'

export class SidebarComponent extends Component {
    state={
        openAddChannelModal:false,
        openInviteModal:false
    }
    addChannelHandler = () => {
        this.setState({ openAddChannelModal:true })
    }
    openInviteModal = () => {
        this.setState({ openInviteModal:true })
    }
    closeAddChannelModal = () => {
        this.setState({ openAddChannelModal:false })
    }
    closeInviteModal = () => {
        this.setState({ openInviteModal:false })
    }
    render() {
        if(this.props.data.loading){
            this.props.setLoading(true)
            console.log("Loading")
            return null;
        }
        console.log("Done Loading")
        this.props.setLoading(false)
        var team = {};
        var channel = {};
        try{
            const teamIdx = this.props.currentTeamId ? findIndex(this.props.data.getTeams, ["id", this.props.currentTeamId]) : 0
            team = this.props.data.getTeams[teamIdx]
            console.log(this.props.data.getTeams)

            const channelIdx = this.props.currentChannelId ? findIndex(team.channels, ["id", this.props.currentChannelId]) : 0
            channel = team.channels[channelIdx]
        }

        catch(r){
            return <Redirect to={`/view-team-error`} />
        }

        if(!this.props.currentTeamId || !this.props.currentChannelId){
            return <Redirect to={`/view-team/${team.id}/${channel.id}`} />
        }

        this.props.channelIdHandler(channel)

        let username = "";
        try{
            const token = localStorage.getItem("auth")
            const { uname }  = decode(token)
            username = uname
        }catch(e){}

        return (
            <React.Fragment>
                <Teams
                    teams={
                        this.props.data.getTeams.map(t => ({
                            id: t.id,
                            letter: t.name.charAt(0).toUpperCase()
                        }))
                    }
                ></Teams>
                <Channels
                    uname={
                        username
                    }
                    channels={
                        team.channels
                    }
                    users={
                        [
                            { id:1, name:"slackbot" },
                            { id:2, name:"Joe" }
                        ]
                    }
                    teamName={team.name}
                    teamId={team.id}
                    addChannelHandler={this.addChannelHandler}
                    openInviteModal={this.openInviteModal}
                ></Channels>
                <AddChannelModal open={this.state.openAddChannelModal} onClose={this.closeAddChannelModal} key="sidebar-add-channel-modal" teamid={team.id}/>
                <InviteToTeamModal open={this.state.openInviteModal} onClose={this.closeInviteModal} teamid={team.id}/>
            </React.Fragment>
        )
    }
}

var teamQuery = gql`
{
    getTeams{
        name
        id
        owner
        channels{
            name
            id
            users
            teamid
        }
    }
}
`

export default graphql(teamQuery)(SidebarComponent)
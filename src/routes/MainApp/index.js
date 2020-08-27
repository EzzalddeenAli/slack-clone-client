import React, { Component } from 'react'
import Teams from './Teams';
import Header from './Header';
import Messages from './Messages';
import Channels from './Channels';
import { Input, Button } from "semantic-ui-react";
import "./main.css";
import Sidebar from './containers/Sidebar';
import { findIndex } from "lodash";
import SendMessage from './containers/SendMessage';



export class AppLayout extends Component {
    state = {
        channel: {
            name: "general",
            id: this.props.match.params.channelid
        },
        loading: true
    }

    channelIdHandler = (channel) => {
        this.setState({ channel: channel })
    }

    setLoading = (state) => {
        this.setState({ loading: state })
    }

    render() {
        if (!localStorage.getItem("auth")) {
            this.props.history.push("/login")
        }

        var channelid = this.props.match.params.channelid;


        return (
            <div>
                <div className='app-layout'>
                    <Sidebar setLoading={this.setLoading} currentTeamId={this.props.match.params.teamid} currentChannelId={channelid} channelIdHandler={this.channelIdHandler}></Sidebar>
                    {
                        !this.state.loading ? (
                            <>
                                <Header channelName={this.state.channel.name} channelid={this.state.channel.id}></Header>
                                <Messages channelid={this.state.channel.id}></Messages>
                                <SendMessage channel={this.state.channel} />
                            </>
                        ) : <p>Loading</p>
                    }
                </div>
            </div>
        )
    }
}

import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from "semantic-ui-react";

import "./main.css";

var MessagesWrapper = styled.div`
    grid-column: 3;
    grid-row: 2;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto
`


const newChannelMessageSubscription = gql`
  subscription($channelid: String) {
    newMessage(channelid: $channelid) {
      text
      uname
      id
    }
  }
`;

class MessagesComponent extends React.Component {
    componentDidMount() {
        this.unsub = this.subscribe(this.props.channelid)
    }
    componentWillReceiveProps({ channelid }){
        if(this.props.channelid !== channelid){
            if(this.unsub){
                this.unsub()
            }

            this.unsub = this.subscribe(channelid)
        }
    }
    subscribe = channelid => 
        this.props.data.subscribeToMore({
            document: newChannelMessageSubscription,
            variables: {
                channelid,
            },
            updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)

                if (!subscriptionData) {
                    return prev;
                }
                var newMessage = subscriptionData.data.newMessage

                this.props.data.getMessages.push(newMessage)

                this.forceUpdate()
            },
        });
    

    render() {
        if(this.props.data.loading){
            return null
        }
        return (
            <React.Fragment>
                <MessagesWrapper>
                <ul className='message-list'>
                    {this.props.data.getMessages.map(m => (
                        <div key={`m-${m.id}`}>
                        <li>
                            <Comment.Group key={m.id}>
                                <Comment>
                                    <Comment.Avatar src={'/slack-img.jpg'} />
                                    <Comment.Content>
                                        <Comment.Author as="a">{m.uname}</Comment.Author>
                                        <Comment.Text>{m.text}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </li>
                        </div>
                    ))}
                </ul>
                </MessagesWrapper>
            </React.Fragment>
        )
    }
}

var messgesQuery = gql`
    query ($channelid: String){
        getMessages(channelid:$channelid){
            id
            text
            uname
            channelid
        }
    }
`

var Messages = graphql(messgesQuery, {
    options:({ channelid }) => ({
        variables: { channelid }
    })
})(MessagesComponent)


export default Messages;
import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input, Checkbox, Container } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class InviteToChannelModalComponent extends Component {
    render() {
        return (
            <Modal trigger={<Icon name="user plus" size="large"></Icon>}>
                <Header content='Invite People To Channel' />
                <Modal.Content>
                    <Container text>
                        <Input placeholder="Users" id='users'></Input><br></br><br></br>
                        <Button onClick={this.onSubmit}>Submit</Button>
                    </Container>
                </Modal.Content>
            </Modal>
        )
    }
    onSubmit = async () => {
        var users = document.getElementById("users").value.split(", ");
        var channelid = this.props.channelid;

        console.log(await this.props.mutate({
            variables:{
                users,
                channelid
            }
        }))
        

    }
    
}

const inviteToChannelMutation = gql`
    mutation ($channelid:String, $users:[String]) {
        inviteToChannel(users:$users, channelid:$channelid)
    }
`

const InviteToChannelModal = graphql(inviteToChannelMutation)(InviteToChannelModalComponent)

export default InviteToChannelModal

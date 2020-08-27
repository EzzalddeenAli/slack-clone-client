import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input, Checkbox, Container } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class InviteToTeamModalComponent extends Component {
    render() {
        return (
            <Modal open={this.props.open} size='small' onClose={this.props.onClose}>
                <Header content='Invite People To Team' />
                <Modal.Content>
                    <Container text>
                        <Input placeholder="Users" id='users'></Input>
                        <Button onClick={this.onSubmit} style={{marginLeft:"10px"}}>Submit</Button>
                    </Container>
                </Modal.Content>
            </Modal>
        )
    }
    onSubmit = () => {
        var users = document.getElementById("users").value.split(", ");
        var teamid = this.props.teamid;

        this.props.mutate({variables:{users, teamid}})

    }
    
}

const inviteToTeamMutation = gql`
    mutation ($teamid:String, $users:[String]) {
        inviteToTeam(unames:$users, teamid:$teamid)
    }
`

const InviteToTeamModal = graphql(inviteToTeamMutation)(InviteToTeamModalComponent)

export default InviteToTeamModal

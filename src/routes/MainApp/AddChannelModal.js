import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react'
import AddChannelForm from './containers/AddChannelForm';

export default class AddChannelModal extends Component {
    state={
        private:true
    }
    onPrivateChange=async (e) => {
        this.setState({ private:e.target.checked })
    }
    render() {
        return (
            <Modal open={this.props.open} size='small' onClose={this.props.onClose}>
                <Header content='Create A Channel' />
                <Modal.Content>
                    <Checkbox label="Private" id="private" onChange={this.onPrivateChange} checked={this.state.private}/><hr></hr>
                    <AddChannelForm private={this.state.private} teamid={this.props.teamid}/>
                </Modal.Content>
            </Modal>
        )
    }
}

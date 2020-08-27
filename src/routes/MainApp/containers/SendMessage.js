import React, { Component } from 'react';
import { Input, Button } from "semantic-ui-react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SendMessage extends Component {
    state={
        text:""
    }
    onChange=(e) => {
        const { name, value } = e.target;

        this.setState({
            text:value
        })

    }
    onSubmit=async (e) => {
        e.preventDefault()

        var response = await this.props.mutate({
            variables:{
                text:this.state.text,
                channelid:this.props.channel.id
            }
        })

        document.getElementById("text").value=""
    }
    render() {
        let styles = {
            width: '80%',
            bottom: '2%',
        };
        
        return (
            <form className="box" onSubmit={this.onSubmit}>
                <Input 
                    type='text'
                    style={styles}
                    placeholder={`Message #${this.props.channel.name}`}
                    name="text"
                    onChange={this.onChange}
                    id="text"
                />
                <Button secondary>
                    Send
                </Button>
            </form>
        )
    }
}

var sendMessageMutation = gql`
    mutation($text:String, $channelid:String){
        createMessage(text:$text, channelid:$channelid)
    }
`

export default graphql(sendMessageMutation)(SendMessage)
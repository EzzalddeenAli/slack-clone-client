import React, { Component } from 'react'
import { Input, Header, Button } from "semantic-ui-react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddPublicChannelComponent extends Component {
    onSubmit=async () => {
        var data = {name:document.getElementById("name").value, teamid:this.props.teamid}
        var res = this.props.mutate({
            variables:data
        })
        console.log(res)
    }
    
    render() {
        return (
            <div>
                <Header>Public Channel</Header>
                <Input placeholder="Channel Name" id="name"/><br></br><br></br>
                <Button onClick={this.onSubmit} primary>Create</Button>
            </div>
        )
    }
}

var createPublicChannelMutation = gql`
    mutation($teamid:String, $name:String){
        createPublicChannel(teamid:$teamid, name:$name)
    }
`

var AddPublicChannel = graphql(createPublicChannelMutation)(AddPublicChannelComponent)

class AddPrivateChannelComponent extends Component {
    onSubmit=async () => {
        var usersUnsplit = document.getElementById("users").value;
        var users;
        if(usersUnsplit === ""){
            users = []
        }else{
            users = usersUnsplit.split(", ")
        }
        var data = {name:document.getElementById("name").value, teamid:this.props.teamid, users}
        var res = this.props.mutate({
            variables:data
        })
        console.log(res)
    }
    
    render() {
        return (
            <div>
                <Header>Private Channel</Header>
                <Input placeholder="Channel Name" id="name"/><br></br><br></br>
                <Input placeholder="Users" id="users"/><br></br><br></br>
                <Button onClick={this.onSubmit} primary>Create</Button>
            </div>
        )
    }
}

var createPrivateChannelMutation = gql`
    mutation($teamid:String, $name:String, $users:[String]){
        createPrivateChannel(teamid:$teamid, name:$name, users:$users)
    }
`

var AddPrivateChannel = graphql(createPrivateChannelMutation)(AddPrivateChannelComponent)

export default function AddChannelForm(args) {
    if(args.private){
        return (
            <AddPrivateChannel teamid={args.teamid} />
        )
    }
    
    if(!args.private){
        return (
            <AddPublicChannel teamid={args.teamid}/>
        )
    }
}

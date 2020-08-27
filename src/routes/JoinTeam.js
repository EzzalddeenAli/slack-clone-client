import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class JoinTeamComponent extends React.Component {
  state = {
    teamid:""
  };

  onSubmit = async () => {
      this.props.mutate({
          variables:this.state
      })
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    if(!localStorage.getItem("auth")){
        this.props.history.push("/login")
    }
    

    const { teamid } = this.state;

    return (
      <Container text><br></br>
        <Header as="h2">Join A Team</Header>
        <Input
          name="teamid"
          onChange={this.onChange}
          value={teamid}
          placeholder="Team Code"
          fluid
        /><br></br>
        <Button onClick={this.onSubmit} primary>Join</Button>
      </Container>
    );
  }
}

const joinTeamMutation = gql`
  mutation($teamid: String) {
    joinTeam(teamid: $teamid)
  }
`;


export const JoinTeam = graphql(joinTeamMutation)(JoinTeamComponent)
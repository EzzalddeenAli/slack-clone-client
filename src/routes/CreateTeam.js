import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class CreateTeamComponent extends React.Component {
  state = {
    name:""
  };

  onSubmit = async () => {
    let response;
    try{
      response = await this.props.mutate({
        variables: this.state,
      });
    }catch(e){
      this.props.history.push("/login")
    }

    console.log(response)
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    if(!localStorage.getItem("auth")){
        this.props.history.push("/login")
    }
    
    const { name } = this.state;

    return (
      <Container text><br></br>
        <Header as="h2">Create Team</Header>
        <Input
          name="name"
          onChange={this.onChange}
          value={name}
          placeholder="Name"
          fluid
        /><br></br>
        <Button onClick={this.onSubmit} primary>Submit</Button>
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String) {
    createTeam(name: $name){
      owner
      name
      id
    }
  }
`;


export const CreateTeam = graphql(createTeamMutation)(CreateTeamComponent)
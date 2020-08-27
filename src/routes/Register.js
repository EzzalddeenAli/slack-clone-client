import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class RegisterComponent extends React.Component {
  state = {
    uname: '',
    email: '',
    passw: '',
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    window.location.pathname = "/login"
    console.log(response)
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { uname, email, passw } = this.state;

    return (
      <Container text><br></br>
        <Header as="h2">Register</Header>
        <Input
          name="uname"
          onChange={this.onChange}
          value={uname}
          placeholder="Username"
          fluid
        /><br></br>
        <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid /><br></br>
        <Input
          name="passw"
          onChange={this.onChange}
          value={passw}
          type="password"
          placeholder="Password"
          fluid
        /><br></br>
        <Button onClick={this.onSubmit} primary>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($uname: String!, $email: String!, $passw: String!) {
    createUser(uname: $uname, email: $email, passw: $passw)
  }
`;


export const Register = graphql(registerMutation)(RegisterComponent)
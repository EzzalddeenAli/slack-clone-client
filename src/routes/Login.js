import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export class LoginComponent extends React.Component {
  state = {
    uname: '',
    passw: '',
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });

    if(response.data.login){
      window.location.pathname = "/view-team"
      localStorage.setItem("auth", response.data.login.token)
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { uname, passw } = this.state;

    return (
      <Container text><br></br>
        <Header as="h2">Login</Header>
        <Input
          name="uname"
          onChange={this.onChange}
          value={uname}
          placeholder="Username"
          fluid
        /><br></br>
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

const loginMutation = gql`
  mutation($uname: String!, $passw: String!) {
    login(uname: $uname, passw: $passw){
        token
    }
  }
`;


export const Login = graphql(loginMutation)(LoginComponent)

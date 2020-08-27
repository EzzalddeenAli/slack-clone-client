import React, { Component } from 'react';
import gql from "graphql-tag"
import { graphql } from "react-apollo";

const HomeComponent = ({ data: {loading, hello} }) => loading ? null : (
    <center><br></br><h1>Slack, where work happens</h1></center>
)


const helloQuery = gql`
    {
        hello
    }
`

export const Home =  graphql(helloQuery)(HomeComponent)


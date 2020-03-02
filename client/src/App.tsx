import React from "react";
import { Button } from "antd";
import "./App.css";
import { Query } from "react-apollo";
import pokemonsQuery from "./queries/pokemonsQuery";
import { GetCost } from "./queries/types/GetCost";

export default class App extends React.Component {
  render() {
    return (
      <Query<GetCost>
        query={pokemonsQuery}
        // variables={{ first: 10 }} // Throws an error!
      >
        {({ loading, error, data }) => (
          <React.Fragment>
            <h1>AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1</h1>
            <Button type="primary">Button</Button>
            <code>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </code>
          </React.Fragment>
        )}
      </Query>
    );
  }
}

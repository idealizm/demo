
import {Typography } from "antd";
import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GetCostByDirectRoute,GetCostByDirectRouteVariables} from './types/GetCostByDirectRoute'
const { Text } = Typography;

const GetCostByDirectRouteQuery = gql`
  query GetCostByDirectRoute($routes: [String!]) {
    getCostByDirectRoute(routes:$routes)
}
`;

const Case1: React.FC <{routes:string[]}>= (props:{routes:string[]}) => {
    const { 
      data, 
      loading, 
      error, 
    } = useQuery<GetCostByDirectRoute,GetCostByDirectRouteVariables>(GetCostByDirectRouteQuery,
        {variables: {
        routes: props.routes
    }},);
    
    if (loading) return <p>loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    
    const name = props.routes.map(name=>{
        return name;
    }) 

    return (
        <div>
            <Text code> {`the delivery cost for route ${name} : ${data.getCostByDirectRoute>0?data.getCostByDirectRoute:'No Such Route'}`}</Text>
        </div>
    )
}

export default Case1 

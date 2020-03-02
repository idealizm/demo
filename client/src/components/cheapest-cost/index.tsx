
import {Typography } from "antd";
import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GetCheapestCostByRoute,GetCheapestCostByRouteVariables} from './types/GetCheapestCostByRoute'
const { Text } = Typography;

const GetCheapestCostByRouteQuery = gql`
  query GetCheapestCostByRoute($start:String!,$end:String!) {
    getCheapestCostByRoute(start:$start,end:$end)
}
`;

const CheapestCost: React.FC <{start:string,end:string}>= (props:{start:string,end:string}) => {
    const { 
      data, 
      loading, 
      error, 
    } = useQuery<GetCheapestCostByRoute,GetCheapestCostByRouteVariables>(GetCheapestCostByRouteQuery,
        {variables: {
        start: props.start,
        end: props.end
    }},);
    
    if (loading) return <p>loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    
    return (
        <div>
            <Text code> {`The cost of cheapest delivery route between ${props.start} to ${props.end} : ${data.getCheapestCostByRoute}`}</Text>
        </div>
    )
}

export default CheapestCost 

// import React from "react";
import { Layout ,Card} from "antd";
import React from 'react';
import Case1  from './components/case1'
import CheapestCost from './components/cheapest-cost'
const { Content } = Layout;

export default class App extends React.Component<{}, {}>  {
  
  render() {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
        <Card style={{ margin: '10px 0' }}>
        <h1>ROUTE</h1>
        <h3>AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1</h3>
        </Card>
        <Card style={{ margin: '10px 0' }}>
        <h1>CASE 1</h1>
        <Case1 routes={['A','B','E']}/>
        <Case1 routes={['A','D']}/>
        <Case1 routes={['E','A','C','F']}/>
        <Case1 routes={['A','D','F']}/>
        </Card>
    
        <Card style={{ margin: '10px 0' }}>
        <h1>CASE 2</h1>
        not implement
        </Card>
        
        <Card style={{ margin: '10px 0' }}>
        <h1>CASE 3</h1>
        <CheapestCost start={'E'} end={'D'}/>
        <CheapestCost start={'E'} end={'E'}/>
        </Card>
        </Content>
      </Layout>
    );
  }
}

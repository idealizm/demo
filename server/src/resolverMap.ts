import { GraphQLResolveInfo } from 'graphql';
import { Context } from './models';
import { IResolvers } from 'graphql-tools';

import shortest from './components/algorithm/shortest';
import Graph from './components/graph/Graph';
import GraphEdge from './components/graph/GraphEdge';
import GraphVertex from './components/graph/GraphVertex';



const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const vertexC = new GraphVertex('C');
const vertexD = new GraphVertex('D');
const vertexE = new GraphVertex('E');
const vertexF = new GraphVertex('F');

const edgeAB = new GraphEdge(vertexA, vertexB, 1);
const edgeAC = new GraphEdge(vertexA, vertexC, 4);
const edgeAD = new GraphEdge(vertexA, vertexD, 10);
const edgeBE = new GraphEdge(vertexB, vertexE, 3);
const edgeCD = new GraphEdge(vertexC, vertexD, 4);
const edgeCF = new GraphEdge(vertexC, vertexF, 2);
const edgeDE = new GraphEdge(vertexD, vertexE, 1);
const edgeEB = new GraphEdge(vertexE, vertexB, 3);
const edgeEA = new GraphEdge(vertexE, vertexA, 2);
const edgeFD = new GraphEdge(vertexF, vertexD, 1);

  const graph = new Graph(true);

  graph
    .addVertex(vertexA)
    .addVertex(vertexB)
    .addVertex(vertexC)
    .addVertex(vertexD)
    .addVertex(vertexE)
    .addVertex(vertexF);

  graph
    .addEdge(edgeAB)
    .addEdge(edgeAC)
    .addEdge(edgeAD)
    .addEdge(edgeBE)
    .addEdge(edgeCD)
    .addEdge(edgeCF)
    .addEdge(edgeDE)
    .addEdge(edgeEB)
    .addEdge(edgeEA)
    .addEdge(edgeFD);

 function getCheapestCostByRoute(start:string,end:string) {
  // in case no start route and end route
  if(!start || !end){
    return null;
  }

  // get vertex by string
  const startVertex = graph.getVertexByKey(start);
  const endVertex = graph.getVertexByKey(end); 
 
  // get all vertex for  get index
  const vertices = graph.getAllVertices();

  // get all index
  const startIndex = vertices.indexOf(startVertex);
  const endBIndex = vertices.indexOf(endVertex);

   // calculate shortest path 
  let { distances } = shortest(graph)

  const cost=distances[startIndex][endBIndex];

  return cost;
}

function getCostByDirectRoute(routes:string[]) {

  let list = <any>[];
  let cost = 0;
  let count = 0;
  routes.map((name:string)=>{
    list.push(graph.getVertexByKey(name))
  })

  for (let i = 0; i < list.length - 1; i++) {
    const edge = graph.findEdge(list[i], list[i + 1]);
    if (edge) {
      cost += edge.weight;
      count +=1
    }
  }

  return count < list.length-1 ? 0:cost;
}

const resolverMap: IResolvers = {
  Query: {
    getCostByDirectRoute(_: void, args:any, ctx: Context, info: GraphQLResolveInfo):number{
      return getCostByDirectRoute(args.routes); //`👋 Hello world! 👋`; 
    },
    getCheapestCostByRoute(_: void, args:any, ctx: Context, info: GraphQLResolveInfo):number{
      return getCheapestCostByRoute(args.start,args.end); //`👋 Hello world! 👋`; 
    }
  },
};

export default resolverMap;

import { GraphQLResolveInfo } from 'graphql';
import { Context } from './models';
import { IResolvers } from 'graphql-tools';

import shortest from './components/algorithm/shortest';
import Graph from './components/graph/Graph';
import GraphEdge from './components/graph/GraphEdge';
import GraphVertex from './components/graph/GraphVertex';

interface Cost {
  total: Number;
}

function cost() {
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

  let cal = 0;
  let list = [vertexA, vertexD];

  for (let i = 0; i < list.length - 1; i++) {
    const edge = graph.findEdge(list[i], list[i + 1]);

    if (edge) {
      cal += edge.weight;
    }
  }
  console.log('A-D : ', cal);

  let { distances, count } = shortest(graph);

  const vertices = graph.getAllVertices();

  const vertexAIndex = vertices.indexOf(vertexA);
  const vertexBIndex = vertices.indexOf(vertexB);
  const vertexCIndex = vertices.indexOf(vertexC);
  const vertexDIndex = vertices.indexOf(vertexD);
  const vertexEIndex = vertices.indexOf(vertexE);
  const vertexFIndex = vertices.indexOf(vertexF);

  console.log('E-D', distances[vertexEIndex][vertexDIndex]);
  console.log('E-E', distances[vertexEIndex][vertexEIndex]);
  const result = <Cost>{
    total: cal,
  };
  return result;
}

const resolverMap: IResolvers = {
  Query: {
    cost(_: void, args: void, ctx: Context, info: GraphQLResolveInfo): Cost {
      return cost(); //`👋 Hello world! 👋`;
    },
  },
};

export default resolverMap;

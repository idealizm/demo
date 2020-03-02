import GraphVertex from '../../graph/GraphVertex';
import GraphEdge from '../../graph/GraphEdge';
import Graph from '../../graph/Graph';
import shortest from '../shortest';

describe('shortest', () => {
  it('should find minimum paths to all vertices for undirected graph', () => {
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

    const { distances } = shortest(graph);

    const vertices = graph.getAllVertices();
    const vertexDIndex = vertices.indexOf(vertexD);
    const vertexEIndex = vertices.indexOf(vertexE);
  

    expect(distances).toEqual([
      [ 6, 1, 4, 7, 4, 6 ],
      [ 5, 6, 9, 12, 3, 11 ],
      [ 6, 7, 10, 3, 4, 2 ],
      [ 3, 4, 7, 10, 1, 9 ],
      [ 2, 3, 6, 9, 6, 8 ],
      [ 4, 5, 8, 1, 2, 10 ]
    ]);
    
    expect(distances[vertexEIndex][vertexEIndex]).toBe(6);
    expect(distances[vertexEIndex][vertexDIndex]).toBe(9);
  });

});

/**
 * @param {Graph} graph
 * @return {{distances: number[][], nextVertices: GraphVertex[][]}}
 */

export default function shortest(graph: any) {
  const vertices = graph.getAllVertices();

  const nextVertices = Array(vertices.length)
    .fill(null)
    .map(() => {
      return Array(vertices.length).fill(null);
    });

  const distances = Array(vertices.length)
    .fill(null)
    .map(() => {
      return Array(vertices.length).fill(Infinity);
    });

  const count = Array(vertices.length)
    .fill(null)
    .map(() => {
      return Array(vertices.length).fill(Infinity);
    });

  vertices.forEach((startVertex: any, startIndex: number) => {
    vertices.forEach((endVertex: any, endIndex: number) => {
      if (startVertex === endVertex) {
        // Distance to the vertex itself is 0.
        distances[startIndex][endIndex] = Infinity;
        count[startIndex][endIndex] = 0;
      } else {
        // Find edge between the start and end vertices.
        const edge = graph.findEdge(startVertex, endVertex);

        if (edge) {
          // There is an edge from vertex with startIndex to vertex with endIndex.
          // Save distance and previous vertex.
          distances[startIndex][endIndex] = edge.weight;
          nextVertices[startIndex][endIndex] = startVertex;
          count[startIndex][endIndex] = 1;
        } else {
          distances[startIndex][endIndex] = Infinity;
          count[startIndex][endIndex] = 0;
        }
      }
    });
  });

  vertices.forEach((middleVertex: any, middleIndex: number) => {
    // Path starts from startVertex with startIndex.
    vertices.forEach((startVertex: any, startIndex: number) => {
      // Path ends to endVertex with endIndex.
      vertices.forEach((endVertex: any, endIndex: number) => {
        const distViaMiddle = distances[startIndex][middleIndex] + distances[middleIndex][endIndex];

        if (distances[startIndex][endIndex] > distViaMiddle) {
          // We've found a shortest pass via middle vertex.
          count[startIndex][endIndex] = Math.max(
            count[startIndex][middleIndex] + count[middleIndex][endIndex]
          );
          distances[startIndex][endIndex] = distViaMiddle;
          nextVertices[startIndex][endIndex] = middleVertex;
        }
      });
    });
  });

  // Shortest distance from x to y: distance[x][y].
  // Next vertex after x one in path from x to y: nextVertices[x][y].
  return { distances, nextVertices, count };
}

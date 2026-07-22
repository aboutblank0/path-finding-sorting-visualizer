import { GridUtils } from "../../utils/gridUtils";
import { GridNodeType, PathfindingGrid } from "../../types/pathfindingGrid";
import {
  PathfindingIterationStep,
  PathfindingIterationStepAction,
} from "../../types/pathfindingIterationStep";
import aStar from "./aStar";
import { bfs } from "./bfs";
import { dfs } from "./dfs";
import { dijkstra } from "./dijkstra";

type PathfindingFunction = (grid: PathfindingGrid) => PathfindingIterationStep[];

const algorithms: [string, PathfindingFunction][] = [
  ["aStar", aStar],
  ["bfs", bfs],
  ["dfs", dfs],
  ["dijkstra", dijkstra],
];

// Algorithms guaranteed to find a *shortest* path on an unweighted grid.
const shortestPathAlgorithms = new Set(["aStar", "bfs", "dijkstra"]);

function pathCoordinates(steps: PathfindingIterationStep[]) {
  return steps
    .filter((step) => step.action === PathfindingIterationStepAction.PATH)
    .map((step) => ({ x: step.coordinates[0].x, y: step.coordinates[0].y }));
}

function addWallRow(grid: PathfindingGrid, row: number) {
  for (let y = 0; y < grid.width; y++) {
    grid = GridUtils.addWall({ x: row, y }, grid);
  }
  return grid;
}

describe.each(algorithms)("%s", (name, run) => {
  test("finds a path from start to end in an open grid", () => {
    const grid = GridUtils.createEmptyGrid(5, 5);
    const path = pathCoordinates(run(grid));

    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual(grid.startNode);
    expect(path[path.length - 1]).toEqual(grid.endNode);
  });

  test("path is a contiguous sequence of orthogonal moves", () => {
    const grid = GridUtils.createEmptyGrid(6, 6);
    const path = pathCoordinates(run(grid));

    for (let i = 1; i < path.length; i++) {
      const dx = Math.abs(path[i].x - path[i - 1].x);
      const dy = Math.abs(path[i].y - path[i - 1].y);
      expect(dx + dy).toBe(1);
    }
  });

  test("never visits or paths through a wall", () => {
    const grid = GridUtils.createEmptyGrid(6, 6);
    const walled = GridUtils.addWall({ x: 2, y: 3 }, grid);
    const steps = run(walled);

    for (const step of steps) {
      for (const { x, y } of step.coordinates) {
        expect(walled.grid[x][y].nodeType).not.toBe(GridNodeType.WALL);
      }
    }
  });

  test("returns no path when start and end are fully separated by walls", () => {
    const grid = GridUtils.createEmptyGrid(5, 5);
    const blocked = addWallRow(grid, 2);

    const path = pathCoordinates(run(blocked));
    expect(path).toEqual([]);
  });

  test("returns an immediate path when start equals end", () => {
    const grid = GridUtils.createEmptyGrid(1, 1);
    const path = pathCoordinates(run(grid));

    expect(path).toEqual([grid.startNode]);
  });

  if (shortestPathAlgorithms.has(name)) {
    test("finds the shortest possible path length on an open grid", () => {
      const grid = GridUtils.createEmptyGrid(8, 8);
      const path = pathCoordinates(run(grid));
      const manhattanDistance =
        Math.abs(grid.endNode.x - grid.startNode.x) +
        Math.abs(grid.endNode.y - grid.startNode.y);

      expect(path.length - 1).toBe(manhattanDistance);
    });
  }
});

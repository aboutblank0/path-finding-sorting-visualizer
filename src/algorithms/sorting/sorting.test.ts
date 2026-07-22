import {
  SortFunction,
  getSortingDataIteration,
} from "../../types/sortingIterationStep";
import bubbleSort from "./bubble";
import gnomeSort from "./gnome";
import heapSort from "./heap";
import insertionSort from "./insertion";
import mergeSort from "./merge";
import quickSort from "./quick";

const algorithms: [string, SortFunction][] = [
  ["bubbleSort", bubbleSort],
  ["gnomeSort", gnomeSort],
  ["heapSort", heapSort],
  ["insertionSort", insertionSort],
  ["mergeSort", mergeSort],
  ["quickSort", quickSort],
];

function randomArray(size: number, max = 1000): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

describe.each(algorithms)("%s", (_name, sort) => {
  test("sorts a random array in place", () => {
    const input = randomArray(50);
    const expected = [...input].sort((a, b) => a - b);

    const original = input;
    sort(input);

    expect(input).toBe(original); // same array reference, mutated in place
    expect(input).toEqual(expected);
  });

  test("handles an already-sorted array", () => {
    const input = Array.from({ length: 20 }, (_, i) => i);
    sort(input);
    expect(input).toEqual(Array.from({ length: 20 }, (_, i) => i));
  });

  test("handles a reverse-sorted array", () => {
    const input = Array.from({ length: 20 }, (_, i) => 20 - i);
    sort(input);
    expect(input).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  test("handles an empty array", () => {
    const input: number[] = [];
    sort(input);
    expect(input).toEqual([]);
  });

  test("handles a single-element array", () => {
    const input = [42];
    sort(input);
    expect(input).toEqual([42]);
  });

  test("handles duplicate values", () => {
    const input = [5, 3, 5, 1, 3, 1, 5, 2];
    const expected = [...input].sort((a, b) => a - b);
    sort(input);
    expect(input).toEqual(expected);
  });

  test("iteration steps replay to the same final sorted state", () => {
    const input = randomArray(30);
    const originalSnapshot = [...input];
    const iterationSteps = sort(input);

    const replayed = getSortingDataIteration(iterationSteps.length - 1, {
      input: originalSnapshot,
      iterationSteps,
    } as unknown as Parameters<typeof getSortingDataIteration>[1]);

    expect(replayed).toEqual(input);
  });
});

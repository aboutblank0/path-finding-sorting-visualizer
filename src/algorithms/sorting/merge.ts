import SortingIterationStep, {
  SortFunction,
  SortingIterationStepAction,
} from "../../types/sortingIterationStep";

const mergeSort: SortFunction = (input) => {
  const iterationSteps: SortingIterationStep[] = [];

  const mergeSort = (input: number[], offset = 0): number[] => {
    if (input.length < 2) {
      return input;
    }
    const half = input.length / 2;
    const left = input.splice(0, half);

    const sortedLeft = mergeSort(left, offset);
    const sortedRight = mergeSort(input, offset + sortedLeft.length);

    for (let i = 0; i < sortedLeft.length; i++) {
      iterationSteps.push({
        action: SortingIterationStepAction.INSERT,
        indexes: [offset + i],
        insert: sortedLeft[i],
      });
    }

    for (let i = 0; i < sortedRight.length; i++) {
      iterationSteps.push({
        action: SortingIterationStepAction.INSERT,
        indexes: [offset + i + sortedLeft.length],
        insert: sortedRight[i],
      });
    }

    return merge(sortedLeft, sortedRight);
  };

  function merge(left: number[], right: number[]): number[] {
    const arr: number[] = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arr.push(left.shift()!);
      } else {
        arr.push(right.shift()!);
      }
    }

    return [...arr, ...left, ...right];
  }

  const sorted = mergeSort(input);

  for (let i = 0; i < sorted.length; i++) {
    input[i] = sorted[i];
    iterationSteps.push({
      action: SortingIterationStepAction.INSERT,
      indexes: [i],
      insert: sorted[i],
    });
  }

  return iterationSteps;
};

export default mergeSort;

export const findMean = (arr:number[]):number => {
  const sum: number = arr.reduce((a: number, b: number) => a + b);
  const n = arr.length;
   let mean: number = sum / n;
    mean = Number(mean.toPrecision(3));
    return mean;
} 

export const findMedian = (arr: number[]): number => {
    const sortedData = arr.sort((a: number, b: number) => a - b);
    const n = arr.length;
    const median =
    n % 2 === 0
      ? Number(((sortedData[n / 2 - 1] + sortedData[n / 2]) / 2).toPrecision(3))
            : Number(sortedData[(n + 1) / 2 - 1].toPrecision(3));
    return median;
}

export const findMode = (arr: number[]): number => {
     let object: any = {};

  for (let i = 0; i < arr.length; i++) {
    if (object[arr[i]]) {
      // increment existing key's value
      object[arr[i]] += 1;
    } else {
      // make a new key and set its value to 1
      object[arr[i]] = 1;
    }
  }

  // assign a value guaranteed to be smaller than any number in the array
  let biggestValue = -1;
  let biggestValuesKey = -1;

  // finding the biggest value and its corresponding key
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value > biggestValue) {
      biggestValue = value;
      biggestValuesKey = Number(key);
    }
  });

  return biggestValuesKey;
}
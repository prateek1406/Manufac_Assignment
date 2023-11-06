import { useEffect, useState } from "react";
import WineData from "./../data/Wine-Data.json";
import Table from "./Table";
import "./styles.css";

// Interface for storing the mean, median and mode of the Wine Data
export interface Result {
  class: number;
  mean: number;
  median: number;
  mode: number;
}

// Utility function to calculate the mode of the Wine Data By Class
const findMode = (array: number[]): number => {
  // This function starts by creating an object where the keys are each unique number of the array and the values are the amount of times that number appears in the array.

  let object: any = {};

  for (let i = 0; i < array.length; i++) {
    if (object[array[i]]) {
      // increment existing key's value
      object[array[i]] += 1;
    } else {
      // make a new key and set its value to 1
      object[array[i]] = 1;
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
};

// Handler function to calculate the mean, median and mode for Flavanoids
const getCalculations = (Class: number): [number, number, number] => {
  const classDataExtract: any = WineData.filter(
    (item: any) => item.Alcohol === Class
  );
  const flavanoidData: number[] = classDataExtract.map((item: any) =>
    Number(item.Flavanoids)
  );
  const sum: number = flavanoidData.reduce((a: number, b: number) => a + b);
  const n = flavanoidData.length;
  let mean: number = sum / n;
  mean = Number(mean.toPrecision(3));
  const sortedData = flavanoidData.sort((a: number, b: number) => a - b);
  const median =
    n % 2 === 0
      ? Number(((sortedData[n / 2 - 1] + sortedData[n / 2]) / 2).toPrecision(3))
      : Number(sortedData[(n + 1) / 2 - 1].toPrecision(3));
  const mode = findMode(sortedData);
  return [mean, median, mode];
};

//Rendering Component
const Analysis = () => {
  // Using useState Hook to store the Alcohol Classes and Results for mean, median and mode for Flavanoids and Gamma
  const [alcoholClasses, setAlcoholClasses] = useState<number[]>([]);
  const [result, setResult] = useState<Result[]>([]);

  // UseEffect for getting the type of Classes from the Wine Data
  useEffect(() => {
    let alcoholTypes: number[] = [];
    WineData.forEach((item: any) => {
      alcoholTypes.push(item.Alcohol);
    });
    let alcoholSet = new Set(alcoholTypes);
    setAlcoholClasses(Array.from(alcoholSet));
  }, []);

  // UseEffect to call the handler function to compute the mean, median and mode for the Flavanoids and Gamma
  useEffect(() => {
    if (alcoholClasses.length !== 0) {
      alcoholClasses.forEach((Class: number) => {
        const [mean, median, mode] = getCalculations(Class);
        setResult((prevState: Result[]) => [
          ...prevState,
          { class: Class, median, mean, mode },
        ]);
      });
    }
  }, [alcoholClasses]);

  return (
    <>
      <div className="container">
        <Table data={result} type="Flavanoid" />
      </div>
    </>
  );
};

export default Analysis;

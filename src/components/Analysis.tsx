import { useEffect, useState } from "react";
import WineData from "./../data/Wine-Data.json";
import { findMean, findMedian, findMode } from "../utils/statistics";
import Table from "./Table";
import "./styles.css";

// Interface for storing the mean, median and mode of the Wine Data
export interface Result {
  class: number;
  mean: number;
  median: number;
  mode: number;
}

// Handler function to calculate the mean, median and mode for Flavanoids
const getCalculations = (Class: number): [number, number, number] => {
  const classDataExtract: any = WineData.filter(
    (item: any) => item.Alcohol === Class
  );
  const flavanoidData: number[] = classDataExtract.map((item: any) =>
    Number(item.Flavanoids)
  );

  const mean = findMean(flavanoidData);
  const median = findMedian(flavanoidData);
  const mode = findMode(flavanoidData);
  return [mean, median, mode];
};

// Handler function to calculate the mean, median and mode for Gamma Value Calculated for the Wine Data
const getGammaCalculations = (Class: number): [number, number, number] => {
  const classDataExtract: any = WineData.filter(
    (item: any) => item.Alcohol === Class
  );
  const GammaData: number[] = classDataExtract.map((item: any) =>
    Number(((item.Ash * item.Hue) / item.Magnesium).toPrecision(3))
  );
  const mean = findMean(GammaData);
  const median = findMedian(GammaData);
  const mode = findMode(GammaData);
  return [mean, median, mode];
};

//Rendering Component
const Analysis = () => {
  // Using useState Hook to store the Alcohol Classes and Results for mean, median and mode for Flavanoids and Gamma
  const [alcoholClasses, setAlcoholClasses] = useState<number[]>([]);
  const [result, setResult] = useState<Result[]>([]);
  const [gammaResult, setGammaResult] = useState<Result[]>([]);

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
        const [gammaMean, gammaMedian, gammaMode] = getGammaCalculations(Class);

        setResult((prevState: Result[]) => [
          ...prevState,
          { class: Class, median, mean, mode },
        ]);
        setGammaResult((prevState: Result[]) => [
          ...prevState,
          {
            class: Class,
            mean: gammaMean,
            median: gammaMedian,
            mode: gammaMode,
          },
        ]);
      });
    }
  }, [alcoholClasses]);

  return (
    <>
      <div className="container">
        <Table data={result} type="Flavanoid" />
        <Table data={gammaResult} type="Gamma" />
      </div>
    </>
  );
};

export default Analysis;

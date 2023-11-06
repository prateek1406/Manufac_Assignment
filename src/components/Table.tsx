import React from "react";
import "./styles.css";

const Table = (props: any) => {
  const { data, type } = props;
  return (
    <>
      <table id="wine">
        <tr>
          <th>Measure</th>
          {data.map((item: any, index: number) => {
            return <th key={index}> Class {item.class}</th>;
          })}
        </tr>
        <tr>
          <th>{type} Mean</th>
          {data.map((item: any, index: number) => {
            return <td key={index}> {item.mean}</td>;
          })}
        </tr>
        <tr>
          <th>{type} Median</th>
          {data.map((item: any, index: number) => {
            return <td key={index}> {item.median}</td>;
          })}
        </tr>
        <tr>
          <th>{type} Mode</th>
          {data.map((item: any, index: number) => {
            return <td key={index}> {item.mode}</td>;
          })}
        </tr>
      </table>
    </>
  );
};

export default Table;

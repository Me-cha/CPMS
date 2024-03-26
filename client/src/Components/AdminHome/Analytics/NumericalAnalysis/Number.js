import React from "react";
import { faker } from "@faker-js/faker";
import { Panel, Row, Col } from "rsuite";
import "./Number.css";

const NumberAnalysis = () => {
  // Generate fake datasets
  const generateFakeDataset = (size) => {
    const dataset = [];
    for (let i = 0; i < size; i++) {
      dataset.push(faker.number.int());
    }
    return dataset;
  };

  // Define four different fake datasets
  const studentsRegistered = generateFakeDataset(150);
  const trainingPrograms = generateFakeDataset(10);
  const companyDrives = generateFakeDataset(15);
  const studentsPlaced = generateFakeDataset(40);

  // Calculate analysis for each dataset
  const calculateAnalysis = (dataset) => {
    // const sum = dataset.reduce((acc, curr) => acc + curr, 0);
    // const average = sum / dataset.length;
    // const min = Math.min(...dataset);
    // const max = Math.max(...dataset);
    const totalEntries = dataset.length;

    return {
      // sum,
      // average,
      // min,
      // max,
      totalEntries,
    };
  };
  // Display analysis for each dataset
  return (
    <div className="NumAnalysis lg:w-[85vw] ">
      <Row>
        <Col md={6} sm={12}>
          <Panel
            bordered
            header="Students Registered"
            style={{ backgroundColor: "white" }}
          >
            {calculateAnalysis(studentsRegistered).totalEntries}
          </Panel>
        </Col>
        <Col md={6} sm={12}>
          <Panel
            bordered
            header="Training Programs"
            style={{ backgroundColor: "white" }}
          >
            {calculateAnalysis(trainingPrograms).totalEntries}
          </Panel>
        </Col>
        <Col md={6} sm={12}>
          <Panel
            bordered
            header="Company Drives"
            style={{ backgroundColor: "white" }}
          >
            {calculateAnalysis(companyDrives).totalEntries}
          </Panel>
        </Col>
        <Col md={6} sm={12}>
          <Panel
            bordered
            header="Students Placed"
            style={{ backgroundColor: "white" }}
          >
            {calculateAnalysis(studentsPlaced).totalEntries}
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default NumberAnalysis;

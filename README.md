<!-- PROJECT Title -->
<br />
<p align="center">
  <h2 align="center">
   <a href="https://github.com/mehedi609/job-assessment">
      Job Assessment
   </a>
  </h2>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Requirements](#Requirements)
- [How to run](#how-to-run)

## Requirements
- Node version >= 16.13.0

<!-- HOW TO RUN -->

## How to run

Please follow the below instructions to run this project in your computer:

1. Clone this repository
   ```sh
   git clone https://github.com/mehedi609/job-assessment.git
   ```
   
2. Use below command in your terminal to install node_modules
   ```sh
   npm install
   ```
   
3. Build the project by running the below command in your terminal
   ```sh
   npm run build
   ```
   
4. Copy and paste a `*.json` file in dist folder containing input data
5. To run the project, run the below command in your terminal from root dir
   ```sh
   node dist/index.js input.json
   ```
   or
   ```sh
   cd dist
   node index.js input.json
   ```
   
7. To test, run the below command in your terminal
   ```sh
   npm run test
   ```

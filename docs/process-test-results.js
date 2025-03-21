



let testResultsElement = document.getElementById('test-results');
let summary = document.getElementById('test-results-summary');

function refreshBindings() {
  testResultsElement = document.getElementById('test-results');
  summary = document.getElementById('test-results-summary');
}

const results  = fetch('./test-results.json')
.then(response => response.json())
.then(parsedResults => {
  refreshBindings();

  parsedResults.testResults.forEach(file => makeTestResultBlock(file));

  summary.innerHTML = `
    <span class="passed">${parsedResults.numPassedTests}</span> passed, 
    <span class="failed">${parsedResults.numFailedTests}</span> failed, 
    <span class="pending">${parsedResults.numPendingTests}</span> pending
  `;
});

function makeDescribeBlock(describe) {
  const describeBlock = document.createElement('div');
  describeBlock.innerHTML = `<div>${ describe.title }</div>`;
  return describeBlock;
}

function makeTestResultBlock(testResult) {
  refreshBindings();
  let path = ''
  if(testResult.ancestorTitles.length > 0) {
    path = testResult.ancestorTitles.join(' ▶ ');
  }
  const testResultFileHeader = document.createElement('div');
  testResultFileHeader.innerHTML = `<div>${path} ▶ ${ testResult.name.split('/').pop().split('.').shift() }</div>`;
  
  testResult.assertionResults
  .map(assertion => makeDescribeBlock(assertion))
  .forEach(result => testResultsElement.appendChild(result));

  return testResultFileHeader;
}
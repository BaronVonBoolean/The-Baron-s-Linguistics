const results  = fetch('./test-results.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });


document.getElementById('test-results-summary').innerHTML = `
  <span>${results.numPassedTests}</span> tests passed, 
  <span>${results.numFailedTests}</span> tests failed, 
  <span>${results.numPendingTests}</span> tests pending
`;

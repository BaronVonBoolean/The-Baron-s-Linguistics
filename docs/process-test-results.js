const results  = fetch('./test-results.json')
  .then(response => response.json())
  .then(parsedResults => {
    const summary = document.getElementById('test-results-summary');
    console.log(summary);

    summary.innerHTML = `
      <span>${parsedResults.numPassedTests}</span> tests passed, 
      <span>${parsedResults.numFailedTests}</span> tests failed, 
      <span>${parsedResults.numPendingTests}</span> tests pending
    `;
  });


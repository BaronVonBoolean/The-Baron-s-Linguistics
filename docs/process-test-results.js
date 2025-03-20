const results  = fetch('./test-results.json')
  .then(response => response.json())
  .then(parsedResults => {
    const summary = document.getElementById('test-results-summary');
    const testResultsElement = document.getElementById('test-results');

    parsedResults.testResults.forEach(file => {
      const fileBlock = document.createElement('div');
      fileBlock.innerHTML = `<h3>${ file.name.split('/').pop() }</h3>`;
      testResultsElement.append(fileBlock);
    })

    summary.innerHTML = `
      <span class="passed">${parsedResults.numPassedTests}</span> passed, 
      <span class="failed">${parsedResults.numFailedTests}</span> failed, 
      <span class="pending">${parsedResults.numPendingTests}</span> pending
    `;
  });


const results  = fetch('./test-results.json')
  .then(response => response.json())
  .then(parsedResults => {
    const summary = document.getElementById('test-results-summary');
    const testResultsElement = document.getElementById('test-results');

    parsedResults.testResults.forEach(file => {
      console.log('>>>', file);
      const fileBlock = document.createElement('div');
      fileBlock.innerHTML = `<div>${ file.name.split('/').pop() }</div>`;
      testResultsElement.append(fileBlock);
    })

    summary.innerHTML = `
      <span class="passed">${parsedResults.numPassedTests}</span> passed, 
      <span class="failed">${parsedResults.numFailedTests}</span> failed, 
      <span class="pending">${parsedResults.numPendingTests}</span> pending
    `;
  });


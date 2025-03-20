const results  = fetch('./test-results.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });


//The user will search for domains given a string. The domains get returned to the user in the DOM

document.querySelector('button').addEventListener('click', searchDomain);

function searchDomain() {
  let domainName = document.querySelector('#domain').innerText;

  //Get domains from the domains.db api and place the domains in the DOM
fetch(`https://api.domainsdb.info/v1/domains/search?domain=${domainName}&limit=100`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      const domains = data.domains;
      const total = data.total;

      document.querySelector('h4').innerText = `Displaying the first ${domains.length} out of ${total} results`;

      const results = document.querySelector('ul');

      domains.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.domain;
        results.appendChild(li);
      })
      
    })
    .catch(err => {
        console.log(`error ${err}`);
        const results = document.querySelector('ul');
        const li = document.createElement('li');
        li.textContent = `Error! ${err}`;
        results.appendChild(li);
    });
}
window.addEventListener('load', getAllCountries());

async function getAllCountries(){
  //set empty array for the country names
  let countryNames = [];
  let endPoint = 'https://restcountries.com/v3.1/all';
  const response = await fetch(endPoint);
  const data = await response.json();
  data.forEach((item) => {
    countryNames.push(item.name.common);
    });

  //sort the country names by name so they are easy to search
  countryNames.sort();

  // Select the dropdown menu
  const dropdown = document.getElementById('dropdown-menu');

  //Fill in the dropdown with the country names returned from the initial api request 
  countryNames.forEach(item => {
    const option = document.createElement('option');
    option.text = item;
    dropdown.add(option);
    })
  };


async function getCountryInfo(name){
  let endPoint = 'https://restcountries.com/v3.1/name/'+name;
  const response = await fetch(endPoint);
  //console.log(response);
  const data = await response.json();
  const processedData = {
    capitalCity: data[0].capital[0],
    commonName: data[0].name.common,
    officialName: data[0].name.official,
    area: data[0].area,
    drivesOn: data[0].car.side,
    region: data[0].region,
    subRegion: data[0].subregion,
    flag: data[0].flags.png,
    continent: data[0].continents[0],
    independent: data[0].independent,
    population: data[0].population,
    unMember: data[0].unMember,
    languages: data[0].languages,
    currencies: data[0].currencies,
  };

  document.getElementById('countryname').innerText = processedData.officialName + " (" + processedData.commonName+")";
  document.getElementById('capital').innerText = processedData.capitalCity;
  document.getElementById('region').innerText = processedData.region + " (" + processedData.subRegion +")";
  document.getElementById('population').innerText = processedData.population.toLocaleString();
  document.getElementById('area').innerText = processedData.area.toLocaleString();
  document.getElementById('currency').innerText = Object.values(processedData.currencies)[0].name;
  document.getElementById('language').innerText = Object.values(processedData.languages).join(', ');
  if (processedData.independent === true){
    processedData.independent = "Yes";
    }
    else if (processedData.independent === false){
      processedData.independent = "No";
      }
  else {
    "No"
    }
  document.getElementById('independent').innerText = processedData.independent;
  
  if (processedData.unMember === true){
    processedData.unMember = "Yes";
    }
  else if (processedData.unMember === false){
    processedData.unMember = "No";
    }
  else {
    "No"
    }
  document.getElementById('un').innerText = processedData.unMember;
}

  // Select all the dropdown items
  const dropdownItems = document.getElementById('dropdown-menu');

  // Event listener for when an option is clicked
  dropdownItems.addEventListener('click', function() {
    //need to understand this further 
    const selectedOption = dropdownItems.options[dropdownItems.selectedIndex].text;
    //call the get country info function to prepare to display the information on the screen
    //only do this if its an actual country though, not the initial value in the list of search for a country 
    if (selectedOption !== 'Search for a country') {
      getCountryInfo(selectedOption);
    }
  });

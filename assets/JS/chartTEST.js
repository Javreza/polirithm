// deactive modal for login
modal.classList.remove('is-active');

// Quickchart API
const qcURL = "https://quickchart.io/chart?c=";
let artistsName = [];
let aPopularity = [];
let tracksName = [];
let tPopularity = [];

// current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

////////// START testing without Spotify data //////////
artistsName.push("A");
artistsName.push("B");
artistsName.push("C");

aPopularity.push("0");
aPopularity.push("50");
aPopularity.push("99");

tracksName.push("1");
tracksName.push("2");
tracksName.push("3");

tPopularity.push("25");
tPopularity.push("55");
tPopularity.push("75");
////////// END testing without Spotify data //////////

const aChartJSON = "{type:'bar',data:{labels:['A','B','C'],datasets:[{label:'Artists " + today + "',data:[1,50,99]}]}}";
const tChartJSON = "{type:'bar',data:{labels:[1,2,3],datasets:[{label:'Tracks " + today + "',data: [25,59,75]}]}}";

const aChart = qcURL + aChartJSON;
const tChart = qcURL + tChartJSON;

/*
{
    type: 'bar',                                // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016],   // Set X-axis labels
      datasets: [{
        label: 'Users',                         // Create the 'Users' dataset
        data: [120, 60, 50, 180, 120]           // Add data to the chart
      }]
    }
  }

https://quickchart.io/chart?c={type:'bar',data:{labels:[2012],datasets:[{label:'Users',data:[120,60,50,180,120]}]}}
https://quickchart.io/chart?c={type:'bar',data:{labels:[A,B,C],datasets:[{label:'Artists',data:[1,50,99]}]}}

  {type:'bar',data:{labels:[2012,2013,2014,2015, 2016],datasets:[{label:'Users',data:[120,60,50,180,120]}]}}
 "{type: 'bar', data: {labels: [A,B,C], datasets: [{label: 'Artists 12/17/2023', data: [1,50,99]}]}}"
 
*/

const graphContent = document.getElementById('graph-content');
const imgElA = document.createElement("img");
const imgElT = document.createElement("img");

graphContent.appendChild(imgElA);
imgElA.setAttribute("src", aChart);
imgElA.setAttribute("alt", "Spotify aritists graph.")

graphContent.appendChild(imgElT);
imgElT.setAttribute("src", tChart);
imgElT.setAttribute("alt", "Spotify tracks graph.")
const clientId = "b04a7dd3004d4953af97c0266139356f"; // client ID of app
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
// const bypassCodeCheck = false; // added for testing only
//&&  !bypassCodeCheck


if (!code) {
    redirectToAuthCodeFlow(clientId);
}else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const artists = await fetchTopArtists(accessToken);
    const tracks  = await fetchTopTracks(accessToken);
    populateUI(profile, artists, tracks);
    populateGraph(artists, tracks);
    
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();//construct the url 
    params.append("client_id", clientId);//id of app client
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:5500/index.html");//where to send the user after sucessful auth. (test local) final(https://javreza.github.io/polirithm/)
    params.append("scope", "user-read-private user-read-email user-top-read");//list of permissions being requested by the client
    params.append("code_challenge_method", "S256");//type of code challenge
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
// function to generate code verifier and challenge
function generateCodeVerifier(length) {             
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));//generates a random key 
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

//retrieve access token from local storage and send auth request by constructing proper url
export async function getAccessToken(clientId, code) {    
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:5500/index.html");//where to send the user after sucessful auth. (test local) final(https://javreza.github.io/polirithm/)
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

//api call to get the users profile
async function fetchProfile(token) {
    const myProfile = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await myProfile.json();
} 

//api call to get the users top artists
async function fetchTopArtists(token) {
    const topArtists = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10', {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await topArtists.json();
}
//api call to get the users top tracks
async function fetchTopTracks(token) {
    const topTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await topTracks.json();
}


function populateUI(profile, artists, tracks) {
    document.getElementById("displayName").textContent = profile.display_name;
    
    // document.getElementById("url").setAttribute("href", profile.uri);
    //loop to show top 10 artists
    for (let i = 0; i < artists.items.length; i++) {
        console.log(artists.items[i].name);
        console.log(artists.items[i].images[0].url);

        const artistsList = document.getElementById('top-artists-list');
        const listItem = document.createElement('li');
        const imgLink = document.createElement('a');
        const artistImg = document.createElement('img');
        
        imgLink.target = "_blank";
        imgLink.href = artists.items[i].external_urls.spotify;
        artistImg.src = artists.items[i].images[0].url;
        artistImg.alt = "An image of: " + artists.items[i].name;

        listItem.textContent = i + 1 + ". " + artists.items[i].name;

        imgLink.appendChild(artistImg);
        listItem.appendChild(imgLink);
        artistsList.appendChild(listItem);
    }
    //loop to show top 10 tracks
    for (let i = 0; i < tracks.items.length; i++) {
        console.log(tracks.items[i].name);
        console.log(tracks.items[i].album.images[0].url);

        const tracksList = document.getElementById('top-tracks-list');
        const listItem = document.createElement('li');
        const imgLink = document.createElement('a');
        const trackImg = document.createElement('img');

        imgLink.target = "_blank";
        imgLink.href = tracks.items[i].external_urls.spotify;
        trackImg.src = tracks.items[i].album.images[0].url;
        trackImg.alt = "An image of: " + tracks.items[i].name;
        
        listItem.textContent = i + 1 + ". " + tracks.items[i].name;

        imgLink.appendChild(trackImg);
        listItem.appendChild(imgLink);
        tracksList.appendChild(listItem);
        
    }


}

function populateGraph(artists, tracks) {
    // Clear existing content
    const graphContentArtist = document.getElementById('graph-content-artist');
    const graphContentTrack = document.getElementById('graph-content-track');

    graphContentArtist.innerHTML = '';
    graphContentTrack.innerHTML = '';

    // Quickchart API
    const qcURL = `https://quickchart.io/chart?c=`;
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
    let currentYear = yyyy;

    // Populate artistsName 
    for (let i = 0; i < artists.items.length; i++) {
        artistsName.push(artists.items[i].name);
    }

    // Populate aPopularity 
    for (let i = 0; i < artists.items.length; i++) {
        aPopularity.push(artists.items[i].popularity);
    }

    // Populate tracksName 
    for (let i = 0; i < tracks.items.length; i++) {
        tracksName.push(tracks.items[i].name);
    }
    // Populate tPopularity 
    for (let i = 0; i < tracks.items.length; i++) {
        tPopularity.push(tracks.items[i].popularity);
    }

    console.log("Artists Name:", artistsName);
    console.log("Artists Popularity:", aPopularity);
    console.log("Tracks Name:", tracksName);
    console.log("Tracks Popularity:", tPopularity);

    //chart options
    const commonOptions = {
        maintainAspectRatio: false,
        responsive: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white' // Set the desired font color
            }
          }
        }
      };


    const aChartJSON = {
        type: 'horizontalBar',
        data: {
            labels: artistsName,
            datasets: [{
                label: `Artists ${today}`,
                data: aPopularity,
                backgroundColor: 'green',
                color:  "white"
                
            }]
        },
        options: commonOptions,
    };

    const tChartJSON = {
        type: 'horizontalBar',
        data: {
            labels: tracksName,
            datasets: [{
                label: `Tracks ${today}`,
                data: tPopularity,
                backgroundColor: 'green',
                color:  "white"
            }]
        }, 
        options: commonOptions, 
    };

   
   
    // Convert objects to JSON
    const aChart = qcURL + JSON.stringify(aChartJSON);
    const tChart = qcURL + JSON.stringify(tChartJSON);

    // Create elements
    const imgElA = document.createElement("img");
    const imgElT = document.createElement("img");
    const pEL = document.createElement("p");

    // Append elements based on active tab
    
    graphContentArtist.appendChild(imgElA);
    imgElA.setAttribute("src", aChart);
    imgElA.setAttribute("alt", "Spotify artists graph.")
    
    graphContentTrack.appendChild(imgElT);
    imgElT.setAttribute("src", tChart);
    imgElT.setAttribute("alt", "Spotify tracks graph.")
    
};

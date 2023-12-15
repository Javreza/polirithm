const clientId = "b04a7dd3004d4953af97c0266139356f"; // client ID of app
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
// const bypassCodeCheck = flase; // added for testing only
//&&  !bypassCodeCheck


if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const artists = await fetchTopArtists(accessToken);
    const tracks  = await fetchTopTracks(accessToken);
    populateUI(profile, artists, tracks);
    
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();//construct the url 
    params.append("client_id", clientId);//id of app client
    params.append("response_type", "code");
    params.append("redirect_uri", "https://javreza.github.io/polirithm/");//where to send the user after sucessful auth. (test local) final(https://javreza.github.io/polirithm/)
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

//retrive access token from local storage and send auth request
export async function getAccessToken(clientId, code) {    
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://javreza.github.io/polirithm/");//where to send the user after sucessful auth. (test local) final(https://javreza.github.io/polirithm/)
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const myProfile = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await myProfile.json();
} 

async function fetchTopArtists(token) {
    const topArtists = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10', {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await topArtists.json();
}

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
    for (let i = 1; i < artists.items.length; i++) {
        console.log(artists.items[i].name);
        const artistsList = document.getElementById('top-artists-list');
        const listItem = document.createElement('li');
        listItem.textContent = i + ". " + artists.items[i].name;
        artistsList.appendChild(listItem);
    }

    for (let i = 1; i < tracks.items.length; i++) {
        console.log(tracks.items[i].name);
        const tracksList = document.getElementById('top-tracks-list');
        const listItem = document.createElement('li');
        listItem.textContent = i + ". " + tracks.items[i].name;
        tracksList.appendChild(listItem);
    }
    
}




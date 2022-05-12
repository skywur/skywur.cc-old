$.getJSON(
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=97246405904689D0C42E9FCD79023EFA&steamids=76561198198543162/",
    function(data) {
        console.log(data);
    }
);

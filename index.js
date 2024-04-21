window.addEventListener("load", () => {
    setTimeout(function() {
        indefiniteWrite();
    }, 3450);
});

const numberOfParticles = 10000

// Options

const particleImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605067/particle-tiny.png',
    particleColor = '0xFFFFFF',
    particleSize = .1;

const defaultAnimationSpeed = 1,
    morphAnimationSpeed = 1;

// Triggers
const triggers = document.getElementsByClassName('triggers')[0].querySelectorAll('span')
const home = document.getElementsByClassName('logo')

// Renderer
const canvas = document.querySelector('#canvas')
var renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ensure Full Screen on Resize
function fullScreen() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', fullScreen, false)

// Scene
var scene = new THREE.Scene();

// Camera and position
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

camera.position.y = 0;
camera.position.z = 36;

// controls
let controls = new THREE.OrbitControls(camera);

// to disable zoom
controls.enableZoom = false;

// to disable rotation
controls.enableRotate = false;

// to disable pan
controls.enablePan = false;

// Lighting
var light = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(light);

// Particle Vars
var particleCount = numberOfParticles;

let projectPoints,
    homePoints,
    discordPoints,
    twitterPoints,
    steamPoints,
    pronounsPoints,
    mailPoints;

var particles = new THREE.Geometry(),
    homeParticles = new THREE.Geometry(),
    discordParticles = new THREE.Geometry(),
    twitterParticles = new THREE.Geometry(),
    steamParticles = new THREE.Geometry(),
    pronounsParticles = new THREE.Geometry(),
    mailParticles = new THREE.Geometry();

var pMaterial = new THREE.PointCloudMaterial({
    color: particleColor,
    size: particleSize,
    map: THREE.ImageUtils.loadTexture(particleImage),
    blending: THREE.AdditiveBlending,
    transparent: true
});

// Custom (OGJ) Objects
// home
var objLoader = new THREE.OBJLoader();
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/mainFINAL.obj?v=1663222069867', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 7;

            child.geometry.scale(scale, scale, scale);
            homePoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(homeParticles, homePoints, yOffset, 2);
        }
    });
});
// discord
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/discordFINAL.obj?v=1663215088026', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 7;

            child.geometry.scale(scale, scale, scale);
            discordPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(discordParticles, discordPoints, yOffset, 0);
        }
    });
});
// twitter
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/twitterFINAL.obj?v=1663209948782', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 7;

            child.geometry.scale(scale, scale, scale);
            twitterPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(twitterParticles, twitterPoints, yOffset, 0);
        }
    });
});
// steam
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/steamFINAL.obj?v=1663215362951', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 8.5;

            child.geometry.scale(scale, scale, scale);
            steamPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(steamParticles, steamPoints, yOffset, 0);
        }
    });
});
// pronouns
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/discordFINAL.obj?v=1663215088026', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 7;

            child.geometry.scale(scale, scale, scale);
            pronounsPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(pronounsParticles, pronounsPoints, yOffset, 0);
        }
    });
});
// mail
objLoader.load('https://cdn.glitch.global/f630c6b7-9fae-41f5-b0b8-620665c52345/spotify.obj?v=1668974528479', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let scale = 2.5;

            let area = new THREE.Box3();
            area.setFromObject(child);
            let yOffset = (area.max.y * scale) - 7;

            child.geometry.scale(scale, scale, scale);
            mailPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
            createVertices(mailParticles, mailPoints, yOffset, 0);
        }
    });
});

// Particles
for (var p = 0; p < particleCount; p++) {
    var vertex = new THREE.Vector3();
    vertex.x = 0;
    vertex.y = 0;
    vertex.z = 0;

    particles.vertices.push(vertex);
}

function createVertices(emptyArray, points, yOffset = 0, trigger = null) {
    for (var p = 0; p < particleCount; p++) {
        var vertex = new THREE.Vector3();
        vertex.x = points[p]['x'];
        vertex.y = points[p]['y'] - yOffset;
        vertex.z = points[p]['z'];

        emptyArray.vertices.push(vertex);
    }
    if (trigger !== null) {
        triggers[trigger].setAttribute('data-disabled', false)
    }
}

var particleSystem = new THREE.PointCloud(
    particles,
    pMaterial
);

particleSystem.sortParticles = true;

// Add the particles to the scene
scene.add(particleSystem);

// Animate
const normalSpeed = (defaultAnimationSpeed / 100),
    fullSpeed = (morphAnimationSpeed / 100)

let animationVars = {
    speed: normalSpeed
}

function animate() {
    particleSystem.rotation.y += animationVars.speed;
    particles.verticesNeedUpdate = true;

    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
setTimeout(toHome, 250);



function toHome() {
    morphTo(homeParticles, '0xffffff');
}

function todiscord() {
    handleTriggers(0);
    morphTo(discordParticles, '0x0A66C2');
}

function totwitter() {
    handleTriggers(1);
    morphTo(twitterParticles, '0x1DA1F2');
}

function tosteam() {
    handleTriggers(2);
    morphTo(steamParticles, '0xad3bff');
}

function topronouns() {
    handleTriggers(3);
    morphTo(pronounsParticles, '0xffb5fe');
}

function tomail() {
    handleTriggers(4);
    morphTo(mailParticles, '0x1db954');
}




function morphTo(newParticles, color) {
    TweenMax.to(animationVars, .03, {
        ease: Power2.easeIn,
        speed: fullSpeed,
        onComplete: slowDown
    });
    particleSystem.material.color.setHex(color);


    for (var i = 0; i < particles.vertices.length; i++) {
        TweenMax.to(particles.vertices[i], 5, {
            ease: Elastic.easeOut.config(1, 0.95),
            x: newParticles.vertices[i].x,
            y: newParticles.vertices[i].y,
            z: newParticles.vertices[i].z
        })
    }
}

function slowDown() {
    TweenMax.to(animationVars, 2, {
        ease: Power2.easeOut,
        speed: normalSpeed,
        delay: .1
    });
}

home[0].addEventListener('mouseover', toHome)
triggers[0].addEventListener('mouseover', todiscord)
triggers[1].addEventListener('mouseover', totwitter)
triggers[2].addEventListener('mouseover', tosteam)
triggers[3].addEventListener('mouseover', topronouns)
triggers[4].addEventListener('mouseover', tomail)



function handleTriggers(disable) {
    for (var x = 0; x < triggers.length; x++) {
        if (disable == x) {
            triggers[x].setAttribute('data-disabled', true)

        } else {
            triggers[x].setAttribute('data-disabled', false)
        }
    }
}

// typewriter
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function indefiniteWrite() {
    let strs = [
        "yacht oath umbrella race eagle animal fade adhere guide gallop oval train",
        "my room is a chokepoint",
        "real perc gamer",
        "ggwp trans rights uwu",
        "go play valorant you tran",
        "nice to meef you",
        "my name is mearty and i'm transphobic",
        "skylar is stupid",
        "fnaf_scary.mp3",
        "'0707 forever' sure lmao",
    ];


    var num = getRandomInt(strs.length);

    let quote = '"' + strs[num] + '"';

    console.log("writing " + quote + " (" + num + ")");

    var typElement = document.getElementById('quotes');

    var typewriter = new Typewriter(quotes, {
        loop: true
    });

    typewriter.typeString(quote).pauseFor(5000).deleteAll().pauseFor(100).callFunction(() => {
        typewriter.stop();
        indefiniteWrite();
    }).start();
}


function copyDiscord() {
    navigator.clipboard.writeText('skylar#0007');
    document.getElementById("tooltiptext").innerHTML = "copied!";
    setTimeout(() => { document.getElementById("tooltiptext").innerHTML = "click to copy"; }, 5000);
}

 const lastfmUsername = 'skywurowo';
 const lastfmApiKey = 'c163515529978da722daa7fb4094121e';

 $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUsername}&api_key=${lastfmApiKey}&format=json&limit=1`, data => {
   const track = data.recenttracks.track[0];

   if (track) {
    const artist = track.artist['#text'];
    const title = track.name;
    const url = track.url;
    const image = track.image[3]['#text'];
    console.log(`now listening to ${title} by ${artist}`);

    // Create the Spotify activity embed
    const embed = `
    <div class="nowPlayingBox">
        <div class="playingContent">
            <div id="trackArtwork"><a href="${url}"><img src="${image}"></a></div>
            <div class="trackInfo">
                <p id="trackName"><a href="${url}">${title}</a></p>
                <div id="artist"><a href="${url}">${artist}</a></div>
                <a href="${url}"><img class="spotifyLogo" src="spotify.png"></a>
            </div>
        </div>
    </div>
     `;

     // Add the embed to the page
     $('#nowPlayingContainer').html(embed);
     $('.nowPlayingBox').css("backgroundImage", "url('" + image + "')");
   }
 });

// Check if WebGL is enabled
if (window.WebGLRenderingContext) {
    // If not, display a div with a warning message
    const warningDiv = document.createElement('div');
    warningDiv.textContent = 'This site is best viewed with hardware acceleration enabled';
    warningDiv.classList.add('warning');
    document.body.appendChild(warningDiv);

    // Add a close button to the warning div
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    warningDiv.appendChild(closeButton);

    // Add event listener to close button
    closeButton.addEventListener('click', () => {
        warningDiv.style.display = 'none';
    });
}
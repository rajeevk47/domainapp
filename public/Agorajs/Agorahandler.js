function Agora(){const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const localTracks={
    audioTrack : null
}

let isPlaying = true;

const remoteUsers = {};
window.remoteUsers = remoteUsers;

const buttonclicked = new Audio
buttonclicked.src = './data/audio/buttonclicked.mp3'
const buttonreleased = new Audio
buttonreleased.src = './data/audio/buttonreleased.wav'

const muteButton = document.getElementById("mute");
const uid = Math.floor(Math.random() * 1000000);

muteButton.addEventListener("click", () => {
  if (isPlaying) {
    buttonreleased.play()
    localTracks.audioTrack.setEnabled(false);
    muteButton.innerText = "unmute";
    socket.emit("mute", true);
  } else {
    buttonclicked.play()
    localTracks.audioTrack.setEnabled(true);
    muteButton.innerText = "mute";
    socket.emit("mute", false);
  }
  isPlaying = !isPlaying;
});

const options={
    appid: '9d20889cfe1449229d2057caff504c48',
    channel:'Game',
    uid,
    token:null
}

async function subscribe(user, mediaType) {
    await client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  }
  
  function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  }
  
  function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
  }
  
  async function join() {
  
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
  
    await client.join(options.appid, options.channel, options.token || null, uid);
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  
    await client.publish(Object.values(localTracks));
  }
  
  join();}
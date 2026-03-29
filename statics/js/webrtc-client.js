const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

const channel = pc.createDataChannel('game');
channel.onopen = () => channel.send('Hola servidor de juegos');
channel.onmessage = e => console.log('Servidor de juegos dice:', e.data);

async function startGame() {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const res = await fetch('/api/webrtc/offer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });

  const answer = await res.json();
  await pc.setRemoteDescription(answer);
}

document.querySelector('#jugar-ahora').addEventListener('click', startGame);

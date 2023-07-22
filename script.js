  // Function to play or pause the video
  document.addEventListener('visibilitychange', function() {
    var video = document.getElementById('video');
    if (document.visibilityState === 'hidden') {
      video.pause();
    } else {
      video.play();
    }
  });

  // Play the video automatically 
  window.onload = function() {
    var video = document.getElementById('video');
    video.play();
  };
  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function(event) {
      var result = event.results[event.results.length - 1][0].transcript;
      var cue = new VTTCue(video.currentTime, video.currentTime + 1, result);
      video.textTracks[0].addCue(cue);
    };

    recognition.start();
  }

  // replay the video when it ends
  video.addEventListener('ended', function() {
    video.currentTime = 0;
    video.play();
  });
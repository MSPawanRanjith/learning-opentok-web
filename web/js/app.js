var apiKey,
    sessionId,
    token;

$(document).ready(function() {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  $.get(SAMPLE_SERVER_BASE_URL + '/session', function(res) {
    apiKey = 45805632;
    sessionId = 2_MX40NTgwNTYzMn5-MTQ5MDQ3NzE4MDkzM35QNTVuTzQxRjUrWXRDK3BORnBsY3g3VTJ-fg;
    token =3e73576233585d4a980051b6af082c58412b3fd2;

    initializeSession();
  });
});

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    });
  });

  session.on('sessionDisconnected', function(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (!error) {
      var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      });

      session.publish(publisher);
    } else {
      console.log('There was an error connecting to the session: ', error.code, error.message);
    }
  });
}

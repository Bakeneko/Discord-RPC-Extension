console.log('Start');
var websocket = new WebSocket("ws://localhost:6969");
websocket.onopen = function (evt) {onOpen(evt)};
websocket.onclose = function (evt) {onClose(evt)};
websocket.onerror = function (evt) {onError(evt)};
function onClose(){onOpen();}
function onError(){websocket.close();}

function onOpen(){
  websocket.send(JSON.stringify({
    clientId: '606504719212478504',
    presence: {
      state: 'Testing',
      details: '🍱',
      startTimestamp: Date.now(),
      instance: true,
    }
  }));
  console.log('Send');
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(activeInfo);
  chrome.tabs.get(activeInfo.tabId, function(tab){
    console.log(tab.title);
    websocket.send(JSON.stringify({
      clientId: '606504719212478504',
      presence: {
        state: tab.title,
        details: '🍱',
        startTimestamp: Date.now(),
        instance: true,
      }
    }));
  });
});

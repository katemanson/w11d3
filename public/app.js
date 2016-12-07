var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var albumData = JSON.parse(jsonString);
  listTitles(albumData);
}

var listTitles = function(albumData){
  var div = document.querySelector('#albums');

  for (var i = 0; i < albumData.albums.items.length; i++) {
    var p = document.createElement('p');
    
    var a = document.createElement('a');
    a.href = albumData.albums.items[i].external_urls.spotify;
    a.innerHTML = albumData.albums.items[i].name;
    
    var img = document.createElement('img');
    img.src = albumData.albums.items[i].images[2].url;
    img.alt = albumData.albums.items[i].name;
    
    a.appendChild(img);
    p.appendChild(a);
    div.appendChild(p);

  }
}

window.onload = app;
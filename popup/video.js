let url = localStorage.getItem('video');

let videotag = document.getElementById('videotags');

let height = videotag.offsetHeight;
let width = videotag.offsetWidth;

videotag.src = url;
videotag.play();


var timer = setInterval(function() {
    var x = browser.tabs.getCurrent();

    function onGot(tabInfo) {
        if (tabInfo['status'] == 'complete') {
            if (videotag.offsetHeight == height && videotag.offsetWidth == width) {
                var closing = browser.tabs.remove(tabInfo['id']);
                closing.then(function() {
                    console.log('closed')
                }, function() {
                    console.log('error closing');
                });
            }
            clearInterval(timer);
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    x.then(onGot, onError);
}, 2000);


let urls = JSON.parse(localStorage.getItem('urls'));
let links = document.getElementById('links');

let h4 = document.createElement('h4');
h4.id = 'title';
h4.textContent = localStorage.getItem('title');
document.getElementById('title').appendChild(h4);

let x = 0;
for (x = 0; x < urls.length; x++) {
    let val = urls[x];

    // get label value, identifying type of video
    let label = val['label'];

    // if video word occurs in the label, then dont display further links
    let consider = label.indexOf('video');

    if (consider != -1)
        break;

    // create the a tag
    let a = document.createElement('a');
    let linkText = document.createTextNode(label);
    a.appendChild(linkText);
    a.title = linkText;
    a.href = val['id'];
    a.id = 'video';
    links.appendChild(a);
}

var site = ['https://youtubetoany.com/@api/button/mp3/'];
var URL1 = localStorage.getItem('URL1');
var youtubeVideoID = URL1.split('=');
var link = site + youtubeVideoID[1];
document.getElementById('audioLinks').src = link;

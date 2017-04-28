'use strict';

console.log('\'Allo \'Allo! Content script');
console.log('chrome.runtime', chrome.runtime);
console.log('chrome', chrome);

var writeBlogUrlList = function(){
    setTimeout(function(){
        Array.from(document.querySelectorAll('h3.btag.title.thide a.fc03.m2a'))
                .forEach(x=>{
                    console.log('blog.url', x.href);
                })
    }, 0);
}

document.addEventListener('click', (e)=>{

    if (e.target.className && e.target.className.startsWith('pgi ')){
        writeBlogUrlList();
    }
}, false);




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                'from a content script:' + sender.tab.url :
                'from the extension');
    console.log('request', request)

    writeBlogUrlList();
    sendResponse({farewell: 'goodbye'});
});

// chrome.runtime.getPlatformInfo((info)=>{
//     console.log('platform', info);
// });
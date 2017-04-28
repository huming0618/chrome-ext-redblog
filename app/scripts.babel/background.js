'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  console.log('chrome.tabs.onUpdated', tabId);
  chrome.pageAction.show(tabId);
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: 'console.log("RED Blog v2");'
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: 'winniedezhu.blog.163.com'
    }]
});

chrome.webRequest.onCompleted.addListener(
  details => {
    // chrome.tabs.executeScript(details.tabId, {
    //     code: 'alert("The Request");'
    // });
    chrome.tabs.get(details.tabId, (theTab)=>{
      console.log(theTab);
    });

    chrome.tabs.sendMessage(details.tabId, {event: 'onCompleted', details: details}, function(response) {
      console.log('response', response);
    });

    console.log(details);
    return true;
  },
  {urls: ['*://api.blog.163.com/*']}
);

console.log('\'Allo \'Allo! Event Page for Page Action');

chrome.action.onClicked.addListener(async (tab) => {
  const url = new URL(tab.url);
  const newPort = handlePortIfLegacy(tab);
  
  url.port = newPort;
  await chrome.tabs.update(tab.id, {url: url.toString()});  
  await chrome.action.setBadgeText({text: newPort.toString()});
  await chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
});

const handlePortIfLegacy = (tab) => tab.url.includes('.action') ? '8080': '3000';

const handleStatusComplete = (info, tab) => {
  if (info.status === 'complete') {
    const url = new URL(tab?.url);
    const currentPort = url.port;
    chrome.action.setBadgeText({text: currentPort || ''});
    chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
  }
}
const handleChangeOfPort = (_, changeInfo, tab) => {
  handleStatusComplete(changeInfo, tab)
}

chrome.tabs.onUpdated.addListener(handleChangeOfPort);
chrome.tabs.onActivated.addListener(handleStatusComplete);
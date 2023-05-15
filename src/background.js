"use strict";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "openWindow") {
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            height: 300,
            width: 350,
        });
    } else if (message.type == "SET" || message.type == "GET") {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, message, () => {});
            }
        );
    }
});

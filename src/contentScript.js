"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let ele = document.querySelector("video");
    if (!Array.isArray(ele)) {
        ele = [ele];
    }

    if (request.type === "SET") {
        console.log(`Set speed to: ${request.value}`);
        ele.forEach((e) => {
            e.playbackRate = request.value;
        });
    }

    sendResponse({ type: "GET", value: ele[0].playbackRate });
    return true;
});

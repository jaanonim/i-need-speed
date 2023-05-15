"use strict";

import "./popup.css";

document.addEventListener("DOMContentLoaded", () => {});

document.getElementById("more").addEventListener("click", function () {
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
        this.innerText = "I need more speed...";
    } else {
        content.style.display = "block";
        this.innerText = "That's a speed 🚀";
    }
});

function setSpeed(v) {
    document.getElementById("value").innerText = `x${v}`;
    document.getElementById("range").value = v * 100;
    document.getElementById("number").value = v;

    sendMsg(
        {
            type: "SET",
            value: v,
        },
        (response) => {
            console.log(response);
        }
    );
}

function sendMsg(msg, callback) {
    chrome.runtime.sendMessage(msg);
}

document.getElementById("number").addEventListener("change", function () {
    setSpeed(this.value);
});

document.getElementById("range").addEventListener("input", function () {
    setSpeed(this.value / 100);
});

document.getElementById("set100").addEventListener("click", () => {
    setSpeed(1);
});
document.getElementById("set150").addEventListener("click", () => {
    setSpeed(1.5);
});
document.getElementById("set200").addEventListener("click", () => {
    setSpeed(2);
});

document.getElementById("set175").addEventListener("click", () => {
    setSpeed(1.75);
});
document.getElementById("set50").addEventListener("click", () => {
    setSpeed(0.5);
});

document.getElementById("openWindow").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openWindow" });
});

sendMsg({ type: "GET" }, (res) => {
    console.log(res.value);
    setSpeed(res.value);
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    console.log(activeTab);
});

// file: status.js

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    if(!navigator.online) {
        const elStatus = document.querySelector(".page-status");
        elStatus.innerHTML = "<span style='color:red'>Offline</span>"
    }

}
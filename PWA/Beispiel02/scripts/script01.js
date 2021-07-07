// file: scripts01.js1

var flaggen = [];
var flaggenIndex = 0;

function getStatus() {
    const elStatus = document.querySelector(".page-status");
    if(navigator.online) {
      elStatus.innerHTML = "<span style='color:green'>Online</span>"
    }
    else {
      elStatus.innerHTML = "<span style='color:red'>Offline</span>"
    }
}

function flaggenLaden() {
    console.log("*** flaggenLaden() ***");
    flaggen[0] = {name:"Armenien", path:"/images/Armenia.png"}
    flaggen[1] = {name:"Republik Kongo", path:"/images/Congo.png"}
    flaggen[2] = {name:"Frankreich", path:"/images/France.png"}
    flaggen[3] = {name:"Großbritannien", path:"/images/UnitedKingdom.png"}
}

function registerServiceWorker() {
    console.log("*** Calling registerServiceWorker() ***");
    var serviceWorkerPfad = "../pwa.js";
    navigator.serviceWorker.register(serviceWorkerPfad);
    console.log(`*** ${serviceWorkerPfad} soll registriert werden ***`);
    navigator.serviceWorker.ready
    .then((registration) => {
        console.log(`*** Der Service-Worker wurde soeben mit Scope=${registration.scope} registriert ***`);
    })
    // Dieser Teil wird offenbar nie ausgeführt???
    .catch(err => {
      console.error("!!! Der Service-Worker konnte leider nicht registriert werden !!! " + err);
    })
}

function prevPic() {
    console.log("*** prevPic() ***");
    if (flaggenIndex < flaggen.length -1) {
        flaggenIndex++;
    } else {
        flaggenIndex = 0;
    }
    elFlagge = document.getElementById("imgFlagge");
    elFlaggenName = document.getElementById("divFlagge");
    elFlagge.src = flaggen[flaggenIndex].path;
    divFlagge.innerHTML = flaggen[flaggenIndex].name;
}

function nextPic() {
    console.log("*** nextPic() ***");
    if (flaggenIndex > 0) {
        flaggenIndex--;
    } else {
        flaggenIndex = flaggen.length - 1;
    }
    elFlagge = document.getElementById("imgFlagge");
    elFlaggenName = document.getElementById("divFlagge");
    elFlagge.src = flaggen[flaggenIndex].path;
    divFlagge.innerHTML = flaggen[flaggenIndex].name;
}

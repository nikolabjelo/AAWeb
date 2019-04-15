﻿
/* Callbacks default responses. */

let GLOBAL = {};

GLOBAL.DEFAULT_OK_RESPONSE = {
    result: "Ok",
    message: "Operation Succeeded"
};

GLOBAL.DEFAULT_FAIL_RESPONSE = {
    result: "Fail",
    message: "Operation Failed"
};

GLOBAL.DEFAULT_RETRY_RESPONSE = {
    result: "Retry",
    message: "Retry Later"
};

GLOBAL.CUSTOM_OK_RESPONSE = {
    result: "Ok, but check Message",
    message: "Custom Message"
};

GLOBAL.CUSTOM_FAIL_RESPONSE = {
    result: "Fail Because",
    message: "Custom Message"
}; 

let browserCanvas;                 // This is the canvas object of the browser. 

function spacePad(str, max) {
    str = str.toString();
    return str.length < max ? spacePad(" " + str, max) : str;
}

function loadAdvancedAlgosPlatform() {

    const MODULE_NAME = "App Pre-Loader";
    const INFO_LOG = false;
    const ERROR_LOG = true;

    if (INFO_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[INFO] loadAdvancedAlgosPlatform -> Entering function."); }

    /* The first thing to do here is to add the canvas where all the action is going to happen. */

    let canvas = document.createElement('canvas');

    canvas.id = "canvas";
    canvas.width = 1400;
    canvas.height = 600;
    canvas.style.border = "0";
    canvas.style = "position:absolute; top:0px; left:0px; z-index:1";

    let canvasApp = document.getElementById('canvasApp');
    canvasApp.appendChild(canvas);

    browserCanvas = document.getElementById('canvas');

    browserCanvas.width = window.innerWidth;
    browserCanvas.height = window.innerHeight - window.canvasApp.topMargin;
    browserCanvas.style.border = "none";

    browserCanvas.style.top = window.canvasApp.topMargin + 'px';

    loadDebugModule();

    function loadDebugModule() {

        if (INFO_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[INFO] loadDebugModule -> Entering function."); }

        let path = window.canvasApp.urlPrefix + "WebDebugLog.js";

        REQUIREJS([path], onRequired);

        function onRequired(pModule) {

            if (INFO_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[INFO] " + path + " downloaded."); }

            loadModules();

        }
    }

    /* And Finally, we start loading all the scripts we will inmediatelly need. */

    function loadModules() {

        if (INFO_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[INFO] loadModules -> Entering function."); }

        let path = window.canvasApp.urlPrefix + "Scripts/AppLoader.js";

        REQUIREJS([path], onRequired);

        function onRequired(pModule) {

            if (INFO_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[INFO] " + path + " downloaded."); }

            let APP_LOADER_MODULE = newAppLoader();
            APP_LOADER_MODULE.loadModules();

        }
    }
}

function callServer(pContentToSend, pPath, callBackFunction) {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            callBackFunction(xhttp.responseText);

        }
    };

    if (pContentToSend === undefined) {

        xhttp.open("GET", pPath, true);
        xhttp.send();

    } else {

        try {

            let blob = new Blob([pContentToSend], { type: 'text/plain' });

            xhttp.open("POST", pPath, true);
            xhttp.send(blob);

        } catch (err) {

            if (ERROR_LOG === true) { console.log(spacePad(MODULE_NAME, 50) + " : " + "[ERROR] callServer -> err.message = " & err.message); }

        }
    }
}






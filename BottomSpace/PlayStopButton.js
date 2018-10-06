﻿
function newPlayStopButton() {

    var thisObject = {
        container: undefined,
        setDatetime: setDatetime, 
        draw: draw,
        getContainer: getContainer,     // returns the inner most container that holds the point received by parameter.
        initialize: initialize
    };

    var container = newContainer();
    container.initialize();
    thisObject.container = container;

    thisObject.container.frame.width = 50;
    thisObject.container.frame.height = TOP_SPACE_HEIGHT;

    container.frame.position.x = (viewPort.visibleArea.topRight.x - viewPort.visibleArea.topLeft.x) / 2 - 10;
    container.frame.position.y = viewPort.visibleArea.bottomLeft.y;

    container.isDraggeable = false;
    container.isClickeable = true;

    let play;
    let stop;
    let canDraw = false;
    let showing = "Play";
    let image;

    let datetime;
    let timePeriod;

    return thisObject;

    function initialize() {

        play = new Image();

        play.onload = onImageLoad;

        function onImageLoad() {
            image = play;
            canDraw = true;
        }

        play.src = "Images/Icons/play.png";

        stop = new Image();

        stop.src = "Images/Icons/pause.png";

        thisObject.container.eventHandler.listenToEvent("onMouseClick", onClick);

        viewPort.eventHandler.listenToEvent("Zoom Changed", onZoomChanged);
        timePeriod = INITIAL_TIME_PERIOD;

    }

    function onClick() {

        if (window.CURRENT_BOT_DISPLAY_NAME === "") { return; }

        switch (showing) {

            case "Play": {
                image = stop;
                showing = "Stop";

                let UI_COMMANDS = {
                    beginDatetime: datetime,
                    endDatetime: undefined,
                    timePeriod: timePeriod,
                    startMode: window.CURRENT_START_MODE,
                    eventHandler: thisObject.container.eventHandler
                };

                cloudVM.onBotPlayPressed(UI_COMMANDS);

                break;
            }
            case "Stop": {
                image = play;
                showing = "Play";

                cloudVM.onBotStopPressed();

                break;
            }
        }
    }

    function onZoomChanged(event) {

        timePeriod = recalculatePeriod(event.newLevel);

    }

    function setDatetime(pDatetime) {

        datetime = new Date(pDatetime);
    }

    function getContainer(point) {

        let container;

        /* First we check if this point is inside this object UI. */

        if (thisObject.container.frame.isThisPointHere(point, true) === true) {

            return this.container;

        } else {

            /* This point does not belong to this space. */

            return undefined;
        }

    }

    function draw() {

        if (window.CURRENT_BOT_DISPLAY_NAME === "") { return; }

        thisObject.container.frame.draw(false, false);

        let breakpointsHeight = 15;

        if (canDraw === false) { return; }

        let imageHeight = 20;
        let imageWidth = 20;

        let imagePoint = {
            x: thisObject.container.frame.width / 2 - imageWidth / 2,
            y: thisObject.container.frame.height / 2 - imageHeight / 2 + breakpointsHeight
        };

        imagePoint = thisObject.container.frame.frameThisPoint(imagePoint);

        browserCanvasContext.drawImage(image, imagePoint.x, imagePoint.y, imageWidth, imageHeight);
    }
}
﻿
function newBubble() {

    var thisObject = {

        drawBackground: drawBackground,
        drawForeground: drawForeground,
        initialize: initialize

    };

    return thisObject;

    function initialize(callBackFunction) {

        callBackFunction();

    }

    function drawBackground(pFloatingObject) {

        if (pFloatingObject.payloadBubbleIndex >= pFloatingObject.payload.bubbles.length) {

            return;   // The bubbles array changed at the plotter before it was reflected here. We ignore this object from now on.

        } 

        if (pFloatingObject.currentRadius > 1) {

            /* Target Line */

            browserCanvasContext.beginPath();
            browserCanvasContext.moveTo(pFloatingObject.currentPosition.x, pFloatingObject.currentPosition.y);
            browserCanvasContext.lineTo(pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].position.x, pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].position.y);
            browserCanvasContext.strokeStyle = 'rgba(204, 204, 204, 0.5)';
            browserCanvasContext.setLineDash([4, 2]);
            browserCanvasContext.lineWidth = 1;
            browserCanvasContext.stroke();
            browserCanvasContext.setLineDash([0, 0]);

        }

        if (pFloatingObject.currentRadius > 0.5) {

            /* Target Spot */

            var radius = 1;

            browserCanvasContext.beginPath();
            browserCanvasContext.arc(pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].position.x, pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].position.y, radius, 0, Math.PI * 2, true);
            browserCanvasContext.closePath();
            browserCanvasContext.fillStyle = 'rgba(30, 30, 30, 1)';
            browserCanvasContext.fill();

        }
    }

    function drawForeground(pFloatingObject) {

        if (pFloatingObject.payloadBubbleIndex >= pFloatingObject.payload.bubbles.length) {

            return;   // The bubbles array changed at the plotter before it was reflected here. We ignore this object from now on.

        } 

        const BUBBLE_CORNERS_RADIOUS = 10;
        const TITLE_BAR_HEIGHT = 14;

        const BUBBLE_WIDTH = BUBBLE_CORNERS_RADIOUS * 4 + pFloatingObject.currentRadius;
        const BUBBLE_HEIGHT = BUBBLE_CORNERS_RADIOUS * 2 + pFloatingObject.currentRadius;

        let borderPoint1;
        let borderPoint2;
        let borderPoint3;
        let borderPoint4;

        if (pFloatingObject.currentRadius > 5) {

            /* Rounded Background */

            let intialDisplace = {
                x: pFloatingObject.currentPosition.x - BUBBLE_WIDTH / 2,
                y: pFloatingObject.currentPosition.y - BUBBLE_HEIGHT / 2
            }

            borderPoint1 = {
                x: intialDisplace.x + BUBBLE_CORNERS_RADIOUS,
                y: intialDisplace.y + BUBBLE_CORNERS_RADIOUS
            };

            borderPoint2 = {
                x: intialDisplace.x + BUBBLE_WIDTH - BUBBLE_CORNERS_RADIOUS,
                y: intialDisplace.y + BUBBLE_CORNERS_RADIOUS
            };

            borderPoint3 = {
                x: intialDisplace.x + BUBBLE_WIDTH - BUBBLE_CORNERS_RADIOUS,
                y: intialDisplace.y + BUBBLE_HEIGHT - BUBBLE_CORNERS_RADIOUS
            };

            borderPoint4 = {
                x: intialDisplace.x + BUBBLE_CORNERS_RADIOUS,
                y: intialDisplace.y + + BUBBLE_HEIGHT - BUBBLE_CORNERS_RADIOUS
            };

            titleBarPoint1 = {
                x: intialDisplace.x + 0,
                y: intialDisplace.y + TITLE_BAR_HEIGHT
            };

            titleBarPoint2 = {
                x: intialDisplace.x + BUBBLE_WIDTH,
                y: intialDisplace.y + TITLE_BAR_HEIGHT
            };

            /* We paint the panel background first */

            browserCanvasContext.fillStyle = 'rgba(255, 255, 255, 0.75)';
            browserCanvasContext.beginPath();

            browserCanvasContext.arc(borderPoint1.x, borderPoint1.y, BUBBLE_CORNERS_RADIOUS, 1.0 * Math.PI, 1.5 * Math.PI);
            browserCanvasContext.lineTo(borderPoint2.x, borderPoint2.y - BUBBLE_CORNERS_RADIOUS);
            browserCanvasContext.arc(borderPoint2.x, borderPoint2.y, BUBBLE_CORNERS_RADIOUS, 1.5 * Math.PI, 2.0 * Math.PI);
            browserCanvasContext.lineTo(borderPoint3.x + BUBBLE_CORNERS_RADIOUS, borderPoint3.y);
            browserCanvasContext.arc(borderPoint3.x, borderPoint3.y, BUBBLE_CORNERS_RADIOUS, 0 * Math.PI, 0.5 * Math.PI);
            browserCanvasContext.lineTo(borderPoint4.x, borderPoint4.y + BUBBLE_CORNERS_RADIOUS);
            browserCanvasContext.arc(borderPoint4.x, borderPoint4.y, BUBBLE_CORNERS_RADIOUS, 0.5 * Math.PI, 1.0 * Math.PI);
            browserCanvasContext.lineTo(borderPoint1.x - BUBBLE_CORNERS_RADIOUS, borderPoint1.y);

            browserCanvasContext.closePath();

            browserCanvasContext.fill();

            browserCanvasContext.lineWidth = 0.1;
            browserCanvasContext.strokeStyle = 'rgba(54, 54, 54, 0.75)';
            browserCanvasContext.stroke();

            /* We paint the title bar now */

            browserCanvasContext.fillStyle = 'rgba(255, 151, 48, 0.75)';
            browserCanvasContext.beginPath();

            browserCanvasContext.moveTo(titleBarPoint1.x, titleBarPoint1.y);
            browserCanvasContext.lineTo(borderPoint1.x - BUBBLE_CORNERS_RADIOUS, borderPoint1.y);
            browserCanvasContext.arc(borderPoint1.x, borderPoint1.y, BUBBLE_CORNERS_RADIOUS, 1.0 * Math.PI, 1.5 * Math.PI);
            browserCanvasContext.lineTo(borderPoint2.x, borderPoint2.y - BUBBLE_CORNERS_RADIOUS);
            browserCanvasContext.arc(borderPoint2.x, borderPoint2.y, BUBBLE_CORNERS_RADIOUS, 1.5 * Math.PI, 2.0 * Math.PI);
            browserCanvasContext.lineTo(titleBarPoint2.x, titleBarPoint2.y);

            browserCanvasContext.closePath();
            browserCanvasContext.fill();

            browserCanvasContext.lineWidth = 0.1;
            browserCanvasContext.strokeStyle = 'rgba(12, 64, 148, 0.75)';
            browserCanvasContext.stroke();

            /* print the title */

            let labelPoint;
            let fontSize = 10;

            browserCanvasContext.font = fontSize + 'px Courier New';

            let label = pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].title;

            let xOffset = label.length / 2 * fontSize * FONT_ASPECT_RATIO;
            let yOffset = (TITLE_BAR_HEIGHT - fontSize) / 2 + 2;

            labelPoint = {
                x: intialDisplace.x + BUBBLE_WIDTH / 2 - xOffset,
                y: intialDisplace.y + TITLE_BAR_HEIGHT - yOffset
            };

            //labelPoint = frame.frameThisPoint(labelPoint);

            browserCanvasContext.fillStyle = 'rgba(240, 240, 240, 1)';
            browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y);

        }

        if (pFloatingObject.currentRadius > 0.5) {

            /* Image */

            let imagePosition = {
                x: borderPoint1.x,
                y: borderPoint1.y + TITLE_BAR_HEIGHT
            };

            if (pFloatingObject.payload.profile.imageId !== undefined) {

                let image = document.getElementById(pFloatingObject.payload.profile.imageId);

                if (image !== null) {

                    browserCanvasContext.drawImage(image, imagePosition.x - pFloatingObject.currentImageSize / 2, imagePosition.y - pFloatingObject.currentImageSize / 2, pFloatingObject.currentImageSize, pFloatingObject.currentImageSize);

                }
            }

            /* Image Contourn */

            browserCanvasContext.beginPath();
            browserCanvasContext.arc(imagePosition.x, imagePosition.y, pFloatingObject.currentImageSize / 2, 0, Math.PI * 2, true);
            browserCanvasContext.closePath();
            browserCanvasContext.strokeStyle = 'rgba(30, 30, 30, 0.25)';
            browserCanvasContext.lineWidth = 1;
            browserCanvasContext.stroke();

            /* Label Text */

            if (pFloatingObject.currentRadius > 6) {

                browserCanvasContext.strokeStyle = pFloatingObject.labelStrokeStyle;

                let labelPoint;
                let fontSize = 10;

                let label;

                label = pFloatingObject.payload.bubbles[pFloatingObject.payloadBubbleIndex].body;

                if (label !== undefined) {

                    const WORDS_PER_ROW = 4;
                    const TOTAL_ROWS = 5;
                    const ALPHA = Math.trunc(pFloatingObject.currentRadius / pFloatingObject.targetRadius  * 100) / 100 / 2;

                    if (ALPHA > 0.4) {

                        let startingPosition = {
                            x: pFloatingObject.currentPosition.x,
                            y: pFloatingObject.currentPosition.y - TOTAL_ROWS / 2 * (fontSize * 0.60 + 10)
                        };

                        let rawLabelArray = label.split(" ");
                        let labelArray = [];

                        /* Lets check when words are to long we add an empty space to the same line so as to roll all other words forward. */

                        for (let i = 0; i < rawLabelArray.length; i++) {

                            let word = rawLabelArray[i];

                            labelArray.push(word);

                            if (word.length > 8) {
                                labelArray.push("");
                            }

                            if (word.length > 10) {
                                labelArray.push("");
                            }
                        }

                        /* Now we plot each row. */

                        for (let i = 0; i < TOTAL_ROWS; i++) {

                            let labelRow = "";

                            for (let j = 0; j < WORDS_PER_ROW; j++) {

                                let newWord = labelArray[j + i * WORDS_PER_ROW];

                                if (newWord !== undefined && newWord !== "") {

                                    labelRow = labelRow + " " + newWord;
                                }
                            }

                            labelPoint = {
                                x: startingPosition.x - labelRow.length / 2 * fontSize * 0.60,
                                y: startingPosition.y + (i + 1) * (fontSize * 0.60 + 10)
                            };

                            browserCanvasContext.font = fontSize + 'px Courier New';
                            browserCanvasContext.fillStyle = 'rgba(60, 60, 60, ' + ALPHA + ')'
                            browserCanvasContext.fillText(labelRow, labelPoint.x, labelPoint.y);

                        }
                    }
                }
            }
        }
    }
}
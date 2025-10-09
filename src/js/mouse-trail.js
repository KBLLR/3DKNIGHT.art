import * as PIXI from "pixi.js"

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// Get the texture for rope.
const trailTexture = PIXI.Texture.from('/assets/bitmap/trail.png');
const historyX = [];
const historyY = [];
// historySize determines how long the trail will be.
const historySize = 20;
// ropeSize determines how smooth the trail will be.
const ropeSize = 100;
const points = [];

// Create history array.
for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}
// Create rope points.
for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

// Create the rope
const rope = new PIXI.SimpleRope(trailTexture, points);

// Set the blendmode
rope.blendmode = PIXI.BLEND_MODES.ADD;

app.stage.addChild(rope);

// Listen for animate update
app.ticker.add((delta) => {
    // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
    // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
    const mouseposition = app.renderer.plugins.interaction.mouse.global;

    // Update the mouse values to history
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    // Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;
    }
});

/**
 * @file This script creates a smooth, trailing visual effect that follows the user's mouse cursor.
 * It uses the PIXI.js library to render a `SimpleRope` object, which is continuously updated to create the trail.
 * The trail's smoothness is achieved through cubic interpolation, ensuring a fluid path without sharp edges.
 */

/**
 * Clips an index to the bounds of an array.
 * This function is used to prevent out-of-bounds errors when accessing array elements.
 *
 * @param {number} k - The index to clip.
 * @param {Array<any>} arr - The array to which the index should be clipped.
 * @returns {any} The value from the array at the clipped index.
 */
function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

/**
 * Calculates the tangent at a specific point in an array.
 * The tangent is used to determine the slope of the curve for cubic interpolation.
 *
 * @param {number} k - The index at which to calculate the tangent.
 * @param {number} factor - A scaling factor for the tangent.
 * @param {Array<number>} array - The array of numbers from which to calculate the tangent.
 * @returns {number} The calculated tangent.
 */
function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

/**
 * Performs cubic interpolation on an array of numbers.
 * This function creates a smooth curve between points, which is essential for the fluid motion of the trail.
 * It is based on the interpolation method from https://github.com/osuushi/Smooth.js.
 *
 * @param {Array<number>} array - The array of numbers to interpolate.
 * @param {number} t - The position to interpolate at, typically between 0 and `array.length - 1`.
 * @param {number} [tangentFactor=1] - An optional factor to influence the curve's tangents.
 * @returns {number} The interpolated value.
 */
function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}

/**
 * @author ktortolini
 *
 * @name ~MyWaterfall~
 * @date on 04/07/2024
 */

const rows = 20;
const columns = 20;

const GRAVITY = 0.595;
const PART_COUNT = columns * rows;

/**
 * Below are global variables that represent important values
 * in the form of parallel arrays with dynamic properties.
 */

let ptCount = new Array(PART_COUNT).fill(0);
let tx = Array.from({ length: columns }, () => new Array(rows).fill(0));
let ty = Array.from({ length: columns }, () => new Array(rows).fill(0));
let spdX = Array.from({ length: columns }, () => new Array(rows).fill(0));
let spdY = Array.from({ length: columns }, () => new Array(rows).fill(0));
let damping = Array.from({ length: columns }, () => new Array(rows).fill(0));
let friction = Array.from({ length: columns }, () => new Array(rows).fill(0));
let polyRad = Array.from({ length: columns }, () => new Array(rows).fill(0));
let fillColor = Array.from({ length: columns }, () => new Array(rows).fill(0));
let strokeColor = Array.from({ length: columns }, () => new Array(rows).fill(0));

const tableWidth = 400.0;
const tableHeight = 400.0;

/**
 * Below are the columnWidth and rowHeight with added
 * gap size to separate the polygons as they load.
 */

const columnWidth = tableWidth / (columns - 1);
const rowHeight = tableHeight / (rows - 1);

// deno-lint-ignore no-unused-vars
function setup() {
	/**
	 * This application uses p5.js and p5 createCanvas() method,
	 * see: {@link https://p5js.org/reference/#/p5/createCanvas}
	 */

	const canvas = createCanvas(1200, 1050);

	/**/

	canvas.parent('interactive-rose');

	/**
	 * This application uses p5.js and p5 smooth() method,
	 * see: {@link https://p5js.org/reference/#/p5/smooth}
	 */

	smooth(3);

	for (let i = 0, k = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {

			/**
       	 * For each polygon in the array a random number of sides
       	 * will form a unique polygon that is visible on the screen.
       	 */

			ptCount[k++] = Number(Math.random() * (14, 3) + (3));

			tx[i][j] = -(tableWidth / 2) + (columnWidth * i);
			ty[i][j] = -(tableHeight / 2) + (rowHeight * j);

			spdX[i][j] = Number(Math.random() * (2.2, -2.2) + (-2.2));
			spdY[i][j] = Number(Math.random() * (-9.0, -10.0) + (-10.0));

			damping[i][j] = Number(Math.random() * (0.9, 0.4) + (0.4));
			friction[i][j] = Number(Math.random() * (0.9, 0.23) + (0.23));
			polyRad[i][j] = Number(Math.random() * (9.0, 2.0) + (2.0));

			fillColor[i][j] = color(Number(Math.random() * (7, 0) + (0)), Number(Math.random() * (7, 0) + (0)), 255);
			strokeColor[i][j] = color(90 * (Math.random() * (1.25, 0) + (0)), 90 * (Math.random() * (1.25, 0) + (0)), 255);
		}
	}
}

function poly(customCount, customRad, customStroke, customFill) {
	let theta = 0.0, rad = customRad;
	beginShape();
	stroke(customStroke);
	fill(customFill);
	for (let i = 0; i < customCount; i++) {
		const x = cos(theta) * rad;
		const y = sin(theta) * rad;
		vertex(x, y);
		theta += TWO_PI / customCount;
	}
	endShape(CLOSE);
}

// deno-lint-ignore no-unused-vars
function draw() {
	
	/**
    * The complete matrix will be centered so that polygons
    * relatively close to the center as opposed to from outside.
    */

	translate(width / 2, height / 2);

	for (let i = 0, k = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) { 
			push();
			translate(tx[i][j], ty[i][j]);
			poly(ptCount[k++], polyRad[i][j], strokeColor[i][j], fillColor[i][j]);

			/**
       	 * For each polygon an attribute of gravity is applied to the
       	 * motion of the polygon along with handling the animation.
       	 */
      
			tx[i][j] += spdX[i][j];
			spdY[i][j] += GRAVITY;
			ty[i][j] += spdY[i][j];

			/**/

			if (tx[i][j] >= (width / 2) - polyRad[i][j] || tx[i][j] <= -(width / 2) + polyRad[i][j]) {
				spdX[i][j] *= -1;
			}
			if (ty[i][j] >= (height / 2) - polyRad[i][j]) {
				ty[i][j] = (height / 2) - polyRad[i][j];
				spdY[i][j] *= -1;
				spdY[i][j] *= -damping[i][j];
				spdX[i][j] *= friction[i][j];
			} else if (ty[i][j] <= -(height / 2) + polyRad[i][j]) {
				spdY[i][j] *= -1;
			}

			/**/

			pop();
		}
	}
}


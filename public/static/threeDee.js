/**
 * @author ktortolini
 *
 * @name ~MyThreeDee~
 * @date on 04/07/2024
 */

let img;

function preload() {
   img = loadImage('/static/sample-texture.png');
}

// deno-lint-ignore no-unused-vars
function setup() {
	/**
	 * This application uses p5.js and p5 createCanvas() method,
	 * see: {@link https://p5js.org/reference/#/p5/createCanvas}
	 */

	const canvas = createCanvas(800, 800, WEBGL);

	/**/

	canvas.parent('threeDee');

	/**
	 * This application uses p5.js and p5 smooth() method,
	 * see: {@link https://p5js.org/reference/#/p5/smooth}
	 */

	smooth(3);

   textureMode(NORMAL);
}

// deno-lint-ignore no-unused-vars
function draw() {

   background(0, 0, 0);
	
	/**/

   texture(img);

   /**/

	translate(-width / 16, height / 16);

   /**/

   rotateX(0.3432);

   /**/

   rotateY(millis() / 7000);

   /**/

   sphere(300);
}


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

class Sphere {

	constructor(xParam, yParam, zParam, rParam, wParam, sParam, fParam) {
		this.x = xParam;
		this.y = yParam;
		this.z = zParam;
		this.r = rParam;
		this.w = wParam;
		this.s = sParam;
		this.f = fParam;
	}

	draw() {
		stroke(this.s);
		fill(this.f);
		strokeWeight(this.w);

		/**/

		push();
		texture(img);
		translate(this.x, this.y, this.z);
		sphere(this.r);
		pop();
	}

};

// deno-lint-ignore no-unused-vars
function setup() {
	/**
	 * This application uses p5.js and p5 createCanvas() method,
	 * see: {@link https://p5js.org/reference/#/p5/createCanvas}
	 */

	const canvas = createCanvas(2048, 1080, WEBGL);

	/**/

	canvas.parent('threeDee');

	/**
	 * This application uses p5.js and p5 smooth() method,
	 * see: {@link https://p5js.org/reference/#/p5/smooth}
	 */

	smooth(3);

	textureMode(NORMAL);

	/**/

	redPlanetPrimo = new Sphere(0, 90, 10, 156, 0.9, 6, 15);

}

function createCelestial(x, y, z, r) {
	/**/

	push();

	translate(width / x, height / y);

	/**/

	rotateX(r);

	/**/

	rotateY(millis() / z);

	/**/

	redPlanetPrimo.draw();

	pop();

	/**/
}

// deno-lint-ignore no-unused-vars
function draw() {
	background(0, 0, 0);

	/**/

	for (let i = 0; i < 99; i++) {
		createCelestial(192 + (i / 1.25), 45 - (i / 12.25), 4 - Math.random(), 166.3452);
	}

}

document.addEventListener('DOMContentLoaded', init);

function init() {
    class Drawing {
        constructor(canvasId) {
            const canvas = document.getElementById(canvasId);
            if (typeof canvas !== 'object') {
                throw "Canvas does not exist.";
            }
            this.context = canvas.getContext('2d');
        }

        /**
         * Draws the full page circle and a point on it with coordinates passed with the first param
         * @param {number[]|} [coordinates] - Array of two numbers: x and y coordinates of the point to draw. If not set,
         * point is drawn at the default point.
         */
        redraw(coordinates) {
            this.context.canvas.width = window.innerWidth;
            this.context.canvas.height = window.innerHeight;

            const centerX = this.context.canvas.width / 2;
            const centerY = this.context.canvas.height / 2;
            const side = Math.round(Math.min(this.context.canvas.width, this.context.canvas.height) / 3);
            const halfSide = side / 2;
			const pointRadius = side / 20;

			this.context.beginPath();
            this.context.rect(centerX - halfSide, centerY - halfSide, side, side);
            this.context.lineWidth = pointRadius / 3;
            this.context.strokeStyle = 'black';
            this.context.stroke();

            if (typeof coordinates === 'object' && coordinates.length == 2) {
                this.context.beginPath();
                this.context.arc(centerX + side * (coordinates[0] - 0.5), centerY + side * (coordinates[1] - 0.5), pointRadius, 0, 2 * Math.PI, false);
                this.context.fillStyle = 'red';
                this.context.fill();
                this.context.lineWidth = 2;
                this.context.strokeStyle = 'red';
                this.context.stroke();
            }
        }
    }

    /**
     * Calculates coordinates for point depending on time
     * @param {number} time - Time to calculate coordinates
     * @returns {number[]} - Coordinates in Array, from 0 to 1
     */

    function getCoordinates(time) {
        // TODO: implement body of this function
        if (time % 10 <= 2.5) {
            const x = (time % 10) / 2.5
            const y = 0
            console.log(x, y, time % 10)
            return [x, y];
        } else if (time % 10 > 2.5 && time % 10 <= 5) {
            const x = 1
            const y = (time % 10 - 2.5) / 2.5
            console.log(x, y, time % 10)
            return [x, y];
        } else if (time % 10 > 5 && time % 10 <= 7.5) {
            const x = (7.5 - time % 10) / 2.5
            const y = 1
            console.log(x, y, time % 10)
            return [x, y];
        } else if (time % 10 > 7.5 && time % 10 <= 10) {
            const x = 0
            const y = (10 - time % 10) / 2.5
            console.log(x, y, time % 10)
            return [x, y];
        }
    }

    /**
     * Updates drawing on defined interval
     */
    function update() {
        const time = Date.now() / 1000;
        coordinates = getCoordinates(time);
        drawing.redraw(coordinates);
    }

    const drawing = new Drawing('cnvDraw');
    const timer = setInterval(update, 10);
}
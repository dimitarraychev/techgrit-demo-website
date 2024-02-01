const topCircle = document.querySelector('.top-circle');
const circles = document.querySelectorAll('.circle');

const mouse = {
    moving: false,
    down: false,
    x: 0,
    y: 0
};

export function attachMouseTrailListeners() {

    window.addEventListener('mousedown', (e) => mouse.down = true);
    
    window.addEventListener('mouseup', (e) => mouse.down = false);

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.moving = true;
    
        const interactable = e.target.closest('.interactable');
        const interacting = interactable !== null;
    
        if (interacting) {
            topCircle.style.opacity = 1;
        } else {
            topCircle.style.opacity = 0;
        }
    });

    animateCircles();
};

function animateCircles() {
    let x = mouse.x;
    let y = mouse.y;

    topCircle.style.left = (x - 16) + 'px';
    topCircle.style.top = (y - 16)  + 'px';

    circles.forEach((circle, index) => {
        circle.style.left = (x - 12) + 'px';
        circle.style.top = (y - 12) + 'px';

        circle.style.scale = (circles.length - index) / circles.length;

        const nextCircle = circles[index + 1] || circles[0];

        if (mouse.moving) {
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        }

        if (mouse.down) {
            const random = Math.random();

            if (random <= 0.25) {
                x += Math.random() * 10;
                y += Math.random() * 10;
            } else if (random <= 0.5) {
                x -= Math.random() * 10;
                y -= Math.random() * 10;
            } else if (random <= 0.75) {
                x += Math.random() * 10;
                y -= Math.random() * 10;
            } else if (random <= 1) {
                x -= Math.random() * 10;
                y += Math.random() * 10;
            }
        }

        circle.x = x;
        circle.y = y;
    });

    requestAnimationFrame(animateCircles);
}
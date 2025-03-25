import { Signal } from "./signal";

export class Spring {
    position: number;
    target: number;
    velocity = 0;
    damping = 0;
    stiffness = 0;
    isAnimating = false;

    // mx'' - bx' = kx

    constructor(initialValue: number) {
        this.position = initialValue;
        this.target = initialValue;
    }

    tick(dt: number) {
        const acceleration = this.stiffness * (this.target - this.position) - this.damping * this.velocity;
        this.velocity += acceleration * dt;
        this.position += this.velocity * dt;
    }

    setStiffnessCritical(stiffness: number) {
        this.stiffness = stiffness;
        this.damping = Math.sqrt(4 * stiffness);
    }
}

export function animateSpring(spring: Spring, signal: Signal, tolerance: number) {
    if (spring.isAnimating) return;

    spring.isAnimating = true;

    function tickSpring() {
        spring.tick(1 / 60);
        signal.update();

        if (Math.abs(spring.target - spring.position) < tolerance && Math.abs(spring.velocity) < tolerance) {
            spring.position = spring.target;
            spring.velocity = 0;
            spring.isAnimating = false;
            return;
        }

        requestAnimationFrame(tickSpring);
    }

    tickSpring();
}

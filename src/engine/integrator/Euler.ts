import Integrator from "./Integrator"
import Vector from "../../math/Vector"

export default class Euler extends Integrator {
    // v += a * dt
    // x += v * dt
    integrate(particles, dt: number, drag?: number): void {
        const vel = new Vector()

        for (const p of particles) {
            if (!p.fixed) {
                // Store previous location.
                p.old.pos.copy(p.pos)

                // Scale force to mass.
                p.acc.scale(p.massInv)

                // Duplicate velocity to preserve momentum.
                vel.copy(p.vel)

                // Add force to velocity.
                p.vel.add(p.acc.scale(dt))

                // Add velocity to position.
                p.pos.add(vel.scale(dt))

                // Apply friction.
                if (drag) p.vel.scale(drag)

                // Reset forces.
                p.acc.clear()
            }
        }
    }
}

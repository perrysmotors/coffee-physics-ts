import Integrator from "./Integrator"
import Vector from "../../math/Vector"

export default class Verlet extends Integrator {
    // v = x - ox
    // x = x + (v + a * dt * dt)

    integrate(particles, dt: number, drag?: number): void {
        const pos = new Vector()

        const dtSq = dt * dt

        for (const p of particles) {
            if (!p.fixed) {
                // Scale force to mass.
                p.acc.scale(p.massInv)

                // Derive velocity.
                p.vel.copy(p.pos).sub(p.old.pos)

                // Apply friction.
                if (drag) p.vel.scale(drag)

                // Apply forces to new position.
                pos.copy(p.pos).add(p.vel.add(p.acc.scale(dtSq)))

                // Store old position.
                p.old.pos.copy(p.pos)

                // Update position.
                p.pos.copy(pos)

                // Reset forces.
                p.acc.clear()
            }
        }
    }
}

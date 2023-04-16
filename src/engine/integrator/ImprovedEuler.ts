import Integrator from "./Integrator"
import Vector from "../../math/Vector"

export default class ImprovedEuler extends Integrator {
    // x += (v * dt) + (a * 0.5 * dt * dt)
    // v += a * dt
    integrate(particles, dt: number, drag?: number): void {
        const acc = new Vector()
        const vel = new Vector()
        const dtSq = dt * dt

        for (const p of particles) {
            if (!p.fixed) {
                // Store previous location.
                p.old.pos.copy(p.pos)

                // Scale force to mass.
                p.acc.scale(p.massInv)

                // Duplicate velocity to preserve momentum.
                vel.copy(p.vel)

                // Duplicate force.
                acc.copy(p.acc)

                // Update position.
                p.pos.add(vel.scale(dt).add(acc.scale(0.5 * dtSq)))

                // Update velocity.
                p.vel.add(p.acc.scale(dt))

                // Apply friction.
                if (drag) p.vel.scale(drag)

                // Reset forces.
                p.acc.clear()
            }
        }
    }
}

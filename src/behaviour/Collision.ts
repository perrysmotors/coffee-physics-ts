/**
 * Collision Behaviour
 * TODO: Collision response for non Verlet integrators.
 */

import Behaviour from "./Behaviour"
import Vector from "../math/Vector"
import Particle from "../engine/Particle"

type CollisionCallback =
    | ((p1: Particle, p2: Particle, overlap: number) => void)
    | null

export default class Collision extends Behaviour {
    // Pool of collidable particles
    public pool: Particle[] = []

    // Delta between particle positions
    private _delta: Vector

    // Whether to use mass in collision computations
    private useMass: boolean

    // Callback function to execute on collision
    private callback: CollisionCallback

    constructor(useMass = true, callback: CollisionCallback = null) {
        super()
        this.useMass = useMass
        this.callback = callback
        this._delta = new Vector()
    }

    apply(p: Particle, dt: number, index: number): void {
        for (let i = index; i < this.pool.length; i++) {
            const o = this.pool[i]
            if (o === p) continue

            // Delta between particles positions.
            this._delta.copy(o.pos).sub(p.pos)

            // Squared distance between particles.
            const distSq = this._delta.magSq()

            // Sum of both radii.
            const radii = p.radius + o.radius

            // Check if particles collide.
            if (distSq <= radii * radii) {
                // Compute real distance.
                const dist = Math.sqrt(distSq)

                // Determine overlap.
                let overlap = radii - dist
                overlap += 0.5

                // Total mass.
                const mt = p.mass + o.mass

                // Distribute collision responses.
                const r1 = this.useMass ? o.mass / mt : 0.5
                const r2 = this.useMass ? p.mass / mt : 0.5

                // Move particles so they no longer overlap.
                p.pos.add(
                    this._delta
                        .clone()
                        .norm()
                        .scale(-overlap * r1)
                )
                o.pos.add(this._delta.norm().scale(overlap * r2))

                // Fire callback if defined.
                if (this.callback) this.callback(p, o, overlap)
            }
        }
    }
}

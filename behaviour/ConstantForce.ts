import Behaviour from "./Behaviour.ts"
import Vector from "../math/Vector.ts"
import Particle from "../engine/Particle.ts"

export default class ConstantForce extends Behaviour {
    public force: Vector

    constructor(force: Vector = new Vector()) {
        super()
        this.force = force
    }

    apply(p: Particle, dt: number, index: number) {
        // super.apply(p, dt, index)

        p.acc.add(this.force)
    }
}

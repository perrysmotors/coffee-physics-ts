import Behaviour from "./Behaviour"
import Vector from "../math/Vector"
import Particle from "../engine/Particle"

export default class ConstantForce extends Behaviour {
    public force: Vector

    constructor(force: Vector = new Vector()) {
        super()
        this.force = force
    }

    override apply(p: Particle, _dt: number, _index: number) {
        // super.apply(p, dt, index)

        p.acc.add(this.force)
    }
}

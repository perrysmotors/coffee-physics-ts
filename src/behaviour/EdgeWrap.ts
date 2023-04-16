// Wrap particles around to the opposite side of the specified min and max boundaries

import Behaviour from "./Behaviour"
import Vector from "../math/Vector"
import Particle from "../engine/Particle"

export default class EdgeWrap extends Behaviour {
    public min: Vector
    public max: Vector

    constructor(min: Vector = new Vector(), max: Vector = new Vector()) {
        super()
        this.min = min
        this.max = max
    }

    override apply(p: Particle, _dt: number, _index: number) {
        // super.apply(p, dt, index)

        if (p.pos.x + p.radius < this.min.x) {
            p.pos.x = this.max.x + p.radius
            p.old.pos.x = p.pos.x
        } else if (p.pos.x - p.radius > this.max.x) {
            p.pos.x = this.min.x - p.radius
            p.old.pos.x = p.pos.x
        }

        if (p.pos.y + p.radius < this.min.y) {
            p.pos.y = this.max.y + p.radius
            p.old.pos.y = p.pos.y
        } else if (p.pos.y - p.radius > this.max.y) {
            p.pos.y = this.min.y - p.radius
            p.old.pos.y = p.pos.y
        }
    }
}

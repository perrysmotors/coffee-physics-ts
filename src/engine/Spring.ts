import Vector from "../math/Vector.ts"
import Particle from "./Particle.ts"

export default class Spring {
    private _delta: Vector

    constructor(
        public p1: Particle,
        public p2: Particle,
        public restLength: number = 100,
        public stiffness: number = 1.0
    ) {
        this._delta = new Vector()
    }

    // F = -kx
    apply(): void {
        this._delta.copy(this.p2.pos).sub(this.p1.pos)

        const dist = this._delta.mag() + 0.000001
        const force =
            ((dist - this.restLength) /
                (dist * (this.p1.massInv + this.p2.massInv))) *
            this.stiffness

        if (!this.p1.fixed) {
            this.p1.pos.add(this._delta.clone().scale(force * this.p1.massInv))
        }

        if (!this.p2.fixed) {
            this.p2.pos.add(this._delta.scale(-force * this.p2.massInv))
        }
    }
}

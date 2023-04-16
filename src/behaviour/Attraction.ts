import Behaviour from "./Behaviour"
import Particle from "../engine/Particle"
import Vector from "../math/Vector"

export default class Attraction extends Behaviour {
    private _delta: Vector
    public radius: number
    private _radiusSq: number
    public strength: number
    public target: Vector

    constructor(
        target: Vector = new Vector(),
        radius: number = 1000,
        strength: number = 100.0
    ) {
        super()
        this.target = target
        this._delta = new Vector()
        this.radius = radius
        this._radiusSq = radius * radius
        this.strength = strength
    }

    // Sets the effective radius of the behaviour.
    setRadius(radius: number): void {
        this.radius = radius
        this._radiusSq = radius * radius
    }

    override apply(p: Particle, _dt: number, _index: number): void {
        // Call the superclass apply method.
        // super.apply(p, dt, index)

        // Vector pointing from particle to target.
        this._delta.copy(this.target).sub(p.pos)

        // Squared distance to target.
        const distSq: number = this._delta.magSq()

        // Limit force to behaviour radius.
        if (distSq < this._radiusSq && distSq > 0.000001) {
            // Calculate force vector.
            this._delta.norm().scale(1.0 - distSq / this._radiusSq)

            // Apply force.
            p.acc.add(this._delta.scale(this.strength))
        }
    }
}

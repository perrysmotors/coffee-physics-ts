// Simulate an organic, meandering motion often seen in natural systems

import Behaviour from "./Behaviour"
import Particle from "../engine/Particle"

export default class Wander extends Behaviour {
    public jitter: number
    public radius: number
    public strength: number
    private theta: number

    constructor(
        jitter: number = 0.5,
        radius: number = 100,
        strength: number = 1.0
    ) {
        super()
        this.jitter = jitter
        this.radius = radius
        this.strength = strength
        this.theta = Math.random() * Math.PI * 2
    }

    override apply(p: Particle, _dt: number, _index: number) {
        // super.apply(p, dt, index)

        this.theta += (Math.random() - 0.5) * this.jitter * Math.PI * 2
        p.acc.x += Math.cos(this.theta) * this.radius * this.strength
        p.acc.y += Math.sin(this.theta) * this.radius * this.strength
    }
}

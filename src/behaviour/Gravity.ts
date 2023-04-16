import Behaviour from "./Behaviour"
import Vector from "../math/Vector"
import Particle from "../engine/Particle"

export default class Gravity extends Behaviour {
    private force: Vector
    public scale: number

    constructor(scale: number = 1000) {
        super()
        this.scale = scale
        this.force = new Vector(0, this.scale)

        window.addEventListener("devicemotion", (event: DeviceMotionEvent) => {
            const accX = event.accelerationIncludingGravity?.x ?? 0
            const accY = event.accelerationIncludingGravity?.y ?? 9.8
            this.force.x = (accX * this.scale) / 9.8
            this.force.y = -(accY * this.scale) / 9.8
        })
    }

    apply(p: Particle, dt: number, index: number) {
        // super.apply(p, dt, index)

        p.acc.add(this.force)
    }
}

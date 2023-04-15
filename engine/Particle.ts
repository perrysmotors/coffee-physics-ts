import Vector from "../math/Vector.ts"

export default class Particle {
    static GUID = 0
    public id: string
    public mass: number
    public massInv: number
    public radius: number
    public radiusSq: number
    public fixed: boolean
    public behaviours: any[]
    public pos: Vector
    public vel: Vector
    public acc: Vector
    public old: {
        pos: Vector
        vel: Vector
        acc: Vector
    }

    constructor(mass = 1.0) {
        // Set a unique id.
        this.id = "p" + Particle.GUID++
        // Set initial mass.
        this.setMass(mass)
        // Set initial radius.
        this.setRadius(1.0)
        // Apply forces.
        this.fixed = false
        // Behaviours to be applied.
        this.behaviours = []
        // Current position.
        this.pos = new Vector()
        // Current velocity.
        this.vel = new Vector()
        // Current force.
        this.acc = new Vector()
        // Previous state.
        this.old = {
            pos: new Vector(),
            vel: new Vector(),
            acc: new Vector(),
        }
    }

    /** Moves the particle to a given location vector. */
    moveTo(pos: Vector): void {
        this.pos.copy(pos)
        this.old.pos.copy(pos)
    }

    /** Sets the mass of the particle. */
    setMass(mass = 1.0): void {
        // The inverse mass.
        this.mass = mass
        this.massInv = 1.0 / mass
    }

    /** Sets the radius of the particle. */
    setRadius(radius = 1.0): void {
        this.radius = radius
        this.radiusSq = radius * radius
    }

    /** Applies all behaviours to derive new force. */
    update(dt: number, index: number): void {
        // Apply all behaviours.
        if (!this.fixed) {
            for (const behaviour of this.behaviours) {
                behaviour.apply(this, dt, index)
            }
        }
    }
}

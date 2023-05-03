/** Physics Engine */

import Integrator from "./integrator/Integrator"
import Euler from "./integrator/Euler"
import Behaviour from "../behaviour/Behaviour"
import Particle from "./Particle"
import Spring from "./Spring"

export default class Physics {
    // Properties
    // private _time = 0.0
    // private _step = 0.0
    private _clock: number | null = null
    private _buffer = 0.0
    private _maxSteps = 4
    public particles: Particle[] | null = []
    public springs: Spring[] | null = []
    public behaviours: Behaviour[] = []
    public timestep = 1.0 / 60
    public viscosity = 0.005
    public integrator: Integrator | null

    constructor(integrator = new Euler()) {
        this.integrator = integrator
    }

    // Methods
    integrate(dt: number): void {
        // Drag is inversely proportional to viscosity
        const drag = 1.0 - this.viscosity

        // Update particles
        this.particles?.forEach((particle, index) => {
            // apply global behaviours
            for (const behaviour of this.behaviours) {
                behaviour.apply(particle, dt, index)
            }
            particle.update(dt, index)
        })

        // Integrate motion
        this.integrator && this.particles && this.integrator.integrate(this.particles, dt, drag)

        // Compute all springs
        this.springs?.forEach((spring) => {
            spring.apply();
        })
    }

    step(): void {
        // Initialise the clock on first step.
        this._clock ??= Date.now()

        // Compute delta time since last step.
        const time = Date.now()
        let delta = time - this._clock

        // No sufficient change.
        if (delta <= 0.0) {
            return
        }

        // Convert time to seconds.
        delta *= 0.001

        // Update the clock.
        this._clock = time

        // Increment time buffer.
        this._buffer += delta

        // Integrate until the buffer is empty or until the
        // maximum amount of iterations per step is reached.
        let i = 0

        while (this._buffer >= this.timestep && ++i < this._maxSteps) {
            // Integrate motion by fixed timestep.
            this.integrate(this.timestep)

            // Reduce buffer by one timestep.
            this._buffer -= this.timestep

            // Increment running time.
            // this._time += this.timestep
        }

        // Store step time for debugging.
        // this._step = Date.now() - time
    }

    destroy(): void {
        this.integrator = null
        this.particles = null
        this.springs = null
    }
}

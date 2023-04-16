export default class Behaviour {
    // Each behaviour has a unique id
    static GUID = 0
    GUID: number
    interval: number

    constructor() {
        this.GUID = Behaviour.GUID++
        this.interval = 1
    }

    apply(p: any, _dt: number, _index: number) {
        // Store some data in each particle.
        const behaviour = (p[`__behaviour${this.GUID}`] ??= { counter: 0 })
        behaviour.counter++
    }
}

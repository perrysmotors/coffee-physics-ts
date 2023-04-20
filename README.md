# coffee-physics-ts
Coffee Physics TS is a TypeScript port of [Coffee-Physics](https://github.com/soulwire/Coffee-Physics/) by Justin Windle (a.k.a. soulwire) ‘A simple, lightweight physics engine written in CoffeeScript’

# Usage

## Import any classes you plan to use

```
import {
    Vector,
    Particle,
    Physics,
    Spring,
    Euler,
    ImprovedEuler,
    Verlet,
    Attraction,
    Collision,
    ConstantForce,
    EdgeBounce,
    EdgeWrap,
    Gravity,
    Wander,
} from "coffee-physics-ts"
```

## Create a physics instance

```
const physics = new Physics(new Verlet())
```

Coffee Physics offers three integrations methods: *Euler*, *ImprovedEuler*, and *Verlet*. Verlet integration is required for simulating particle collisions. Euler integration will be used if no method is specified.

## Define the behaviours affecting particles

```
const avoid = new Attraction(undefined, 100, -1000)
const pullToCenter = new Attraction(undefined, undefined, 120)
const collision = new Collision()
```

Coffee Physics provides the following behaviours:

- `Attraction` applies an attractive force to particles within a certain radius towards a target point.
- `Collision` detects collisions between particles and reacts accordingly, either by stopping particles from overlapping or by bouncing them off each other.
- `ConstantForce` applies a constant force causing particles to accelerate.
- `EdgeBounce` bounces particles off the edges of the specified min and max boundaries.
- `EdgeWrap` wraps particles around to the opposite side of the specified min and max boundaries.
- `Gravity` applies a gravitational force to particles. On devices with motion sensors the direction and magnitude of the force is controlled by tilting the device. 
- `Wander` simulates an organic, meandering motion often seen in natural systems

## Apply global behaviours on the physics instance

```
physics.behaviours = [avoid, pullToCenter, collision]
```

These behaviours will affects all particles in the simulation

## Create some particles

```
const particles = []
for (let i = 0; i < 200; i++) {
    // Create a particle
    const mass = 2
    const particle = new Particle(mass)
    particle.setRadius(mass * 10)

    // Make it collidable by adding it to the collision pool
    collision.pool.push(particle)

    // Then add it to the simulation
    physics.particles.push(particle)
}
```

Behaviours can also be applied to a particle directly: `particle.behaviours = [avoid, pullToCenter, collision]`

## Start the simulation

```
let animationFrameId = null
const updatePhysics = () => {
    physics.step()
    animationFrameId = requestAnimationFrame(updatePhysics)
}
animationFrameId = requestAnimationFrame(updatePhysics)
```

## Clean up when you are done

```
cancelAnimationFrame(animationFrameId)
```

## Coffee Physics doesn't handle rendering

Coffee Physics TS is just a physics engine. The only job it does is to calculate the position of particles in the simulation. That means you need to combine it with a system for drawing the particles in the browser. 

[Check out this demo](https://codesandbox.io/s/coffee-physics-ts-n7d65f) that uses React and Framer Motion.
export default class Vector {
    // Static methods
    /** Adds two vectors and returns the product. */
    static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y)
    }

    /** Subtracts v2 from v1 and returns the product. */
    static sub(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    /** Projects one vector (v1) onto another (v2) */
    static project(v1: Vector, v2: Vector): Vector {
        return v1.clone().scale(v1.dot(v2) / v1.magSq())
    }

    // Instance methods
    constructor(public x = 0.0, public y = 0.0) {}

    /** Sets the components of this vector. */
    set(x: number, y: number): this {
        this.x = x
        this.y = y
        return this
    }

    /** Adds a vector to this one. */
    add(v: Vector): this {
        this.x += v.x
        this.y += v.y
        return this
    }

    /** Subtracts a vector from this one. */
    sub(v: Vector): this {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    /** Scales this vector by a value. */
    scale(f: number): this {
        this.x *= f
        this.y *= f
        return this
    }

    /** Computes the dot product between vectors. */
    dot(v: Vector): number {
        return this.x * v.x + this.y * v.y
    }

    /** Computes the cross product between vectors. */
    cross(v: Vector): number {
        return this.x * v.y - this.y * v.x
    }

    /** Computes the magnitude (length). */
    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /** Computes the squared magnitude (length). */
    magSq(): number {
        return this.x * this.x + this.y * this.y
    }

    /** Computes the distance to another vector. */
    dist(v: Vector): number {
        const dx = v.x - this.x
        const dy = v.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    /** Computes the squared distance to another vector. */
    distSq(v: Vector): number {
        const dx = v.x - this.x
        const dy = v.y - this.y
        return dx * dx + dy * dy
    }

    /** Normalizes the vector, making it a unit vector (of length 1). */
    norm(): this {
        const m = Math.sqrt(this.x * this.x + this.y * this.y)
        this.x /= m
        this.y /= m
        return this
    }

    /** Limits the vector length to a given amount. */
    limit(l: number): this {
        const mSq = this.x * this.x + this.y * this.y
        if (mSq > l * l) {
            const m = Math.sqrt(mSq)
            this.x /= m
            this.y /= m
            this.x *= l
            this.y *= l
        }
        return this
    }

    /** Copies components from another vector */
    copy(v: Vector): this {
        this.x = v.x
        this.y = v.y
        return this
    }

    /** Clones this vector to a new itentical one. */
    clone(): Vector {
        return new Vector(this.x, this.y)
    }

    /** Resets the vector to zero. */
    clear(): void {
        this.x = 0.0
        this.y = 0.0
    }
}

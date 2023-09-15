class ZeroDivisionError extends Error {
    constructor() {
        const message = "Divisor no valido"
        super(message)
        this.name = "ZeroDivisionError";
    }
}

export {ZeroDivisionError}
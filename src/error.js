class NotImplementedError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name
  }
}

module.export = {
  NotImplementedError,
}
import pThrottle from 'p-throttle'

export class ThrottledQueue {
  private queue: Promise<void>[]
  private throttle

  constructor() {
    this.queue = []
    this.throttle = pThrottle({
      limit: 3,
      interval: 1000
    });
  }

  async add(fn: () => Promise<void>) {
    await this.throttle(() => {
      this.queue.push(fn())
    })()
  }

  async clear() {
    await Promise.all(this.queue)
    this.queue.splice(0)
  }
}


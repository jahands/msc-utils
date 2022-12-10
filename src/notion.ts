import pThrottle from 'p-throttle'
import PQueue from 'p-queue';

export class ThrottledQueue {
  private queue: PQueue
  private throttle

  constructor(concurrency = 8) {
    this.queue = new PQueue({ concurrency });
    this.throttle = pThrottle({
      limit: 3,
      interval: 1000
    });
  }

  async add(fn: () => Promise<void>) {
    // await this.throttle(async () => await this.queue.add(fn))()
    await this.queue.add(this.throttle(fn))
  }

  async onIdle() {
    await this.queue.onIdle()
  }
}


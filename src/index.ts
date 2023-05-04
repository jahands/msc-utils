import pThrottle from 'p-throttle'
import PQueue from 'p-queue';

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function auth(request: Request, allowedKey: string): Response | null {
  const url = new URL(request.url);
  const requestKey = url.searchParams.get('key');
  if (requestKey !== allowedKey) {
    return new Response('Unauthorized', { status: 401 });
  }
  return null;
}

export class ThrottledQueue {
  private queue: PQueue
  private throttle

  constructor({concurrency = 8, interval = 1000, limit = 3}) {
    this.queue = new PQueue({ concurrency });
    this.throttle = pThrottle({
      limit,
      interval
    });
  }

  async add(fn: () => Promise<void>) {
    return this.queue.add(this.throttle(fn))
  }

  async onIdle() {
    return this.queue.onIdle()
  }
}


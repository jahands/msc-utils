export async function log(data: any) {
  await fetch('https://log-request-body.jachands.repl.co/log-npm',
    {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST', body: JSON.stringify({ log: data })
    })
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export * as notion from './notion'

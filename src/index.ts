export async function log(data: any) {
  await fetch('https://log-request-body.jachands.repl.co/log-npm',
    {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST', body: JSON.stringify({ log: data })
    })
}

export * as notion from './notion'

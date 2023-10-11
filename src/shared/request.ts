import superagent from 'superagent'

export const get = (url: string, headers: any = {}) => {
  const promise = superagent.get(url)

  for (const k of Object.keys(headers)) promise.set(k, headers[k])

  promise.timeout({
    response: 5 * 1000, // Wait 5 seconds for the server to start sending,
    deadline: 60 * 1000 // but allow 1 minute for the file to finish loading.
  })

  return promise
}

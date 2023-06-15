export const getToken = (authorization: string | undefined) => {
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.split(' ')[1]
  } else {
    return undefined
  }
}

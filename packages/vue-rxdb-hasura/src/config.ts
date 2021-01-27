type JsonConfig = {
  HASURA_ENDPOINT?: string
  HBP_ENDPOINT?: string
}

type Config = {
  hasura: string
  hbp: string
}

// TODO replaceSubdomain is not perfect
// TODO move it elsewhere
const replaceSubdomain = (url: string, subdomain: string): string =>
  url.replace(/(:\/\/\w+\.)/, `://${subdomain}.`)

export const fetchConfig = async (): Promise<Config> => {
  // ? if NODE_ENV, use process.env.HASURA_ENDPOINT and process.env.HBP_ENDPOINT?
  const defaultHasura =
    process.env.HASURA_ENDPOINT ||
    replaceSubdomain(window.location.origin, 'hasura')
  const defaultHbp =
    process.env.HBP_ENDPOINT || replaceSubdomain(window.location.origin, 'hbp')
  try {
    const response = await fetch('/config.json')
    const config: JsonConfig = await response.json()
    return {
      hasura: `${config.HASURA_ENDPOINT || defaultHasura}/v1/graphql`,
      hbp: config.HBP_ENDPOINT || defaultHbp
    }
  } catch (e) {
    console.error('config error', e)
    return {
      hasura: `${defaultHasura}/v1/graphql`,
      hbp: defaultHbp
    }
  }
}

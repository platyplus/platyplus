import { Page } from '@platyplus/rxdb-hasura'

export const pageTitle = (page: Page) =>
  page.title ? `${page.title} (${page.slug})` : `${page.slug}`

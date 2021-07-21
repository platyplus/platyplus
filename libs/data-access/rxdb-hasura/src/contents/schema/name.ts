export const metadataName = (data: {
  table_schema: string
  table_name: string
}): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`

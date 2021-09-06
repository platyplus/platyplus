import { CollectionComponent } from './types'
import { DocumentTag } from '../documents'
import { TagGroup } from 'rsuite'

export const TagCollection: CollectionComponent = ({
  data,
  edit,
  tableInfo,
  role
}) => {
  if (data)
    return (
      <TagGroup>
        {data
          .sort((a, b) => (a.label < b.label ? -1 : 1))
          .map((doc, index) => (
            <DocumentTag
              key={index}
              tableInfo={tableInfo}
              role={role}
              document={doc}
              edit={edit}
            />
          ))}
      </TagGroup>
    )
  else return null
}

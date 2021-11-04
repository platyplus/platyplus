import { Animation } from 'rsuite'
import { HeaderTitleWrapper, RichText } from '@platyplus/layout'
import { useParams } from 'react-router-dom'
import { usePage } from '@platyplus/react-rxdb-hasura'

export const PagePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const page = usePage(slug)
  return (
    <HeaderTitleWrapper title={page?.title}>
      <Animation.Fade in={!!page}>
        {(props) => (
          <div {...props}>
            {page?.contents && <RichText readOnly value={page.contents} />}
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export default PagePage

import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useThemeContext from '@theme/hooks/useThemeContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const features = [
  /* // TODO
- 'Isomorphic' - define schema, permissions etc in one single place and make it work both backend and frontend
- Hasura, ACID / relational, soft-delete, field-level permissions...
- Extensible - custom components
*/
  {
    title: 'SGDB',
    imageUrl: 'img/database.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'Offline-first',
    imageUrl: 'img/disconnect.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'Realtime',
    imageUrl: 'img/time.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'Isomorphic',
    imageUrl: 'img/merge.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'Open source',
    imageUrl: 'img/open-source.svg',
    description: (
      <>
        No vendor lockin. Extend or customize your website layout by reusing
        React. Docusaurus can be extended while reusing the same header and
        footer.
      </>
    )
  },
  {
    title: 'Modern architecture',
    imageUrl: 'img/ship.svg',
    description: <>Kubernetes, Docker, React</>
  }
]

function Feature({ imageUrl, title, description, dark }) {
  const imgUrl = useBaseUrl(imageUrl)
  const { isDarkTheme } = useThemeContext()
  const classes = `${styles.featureImage} ${
    isDarkTheme ? styles.darkFeatureImage : styles.lightFeatureImage
  }`
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={classes} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home

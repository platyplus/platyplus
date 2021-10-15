import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import ThemedImage from '@theme/ThemedImage'

import styles from './styles.module.css'

const features = [
  {
    title: 'Relational',
    imageUrl: 'img/database.svg',
    description: (
      <>
        Describe your application data from a PostgreSQL schema and Hasura
        metadata. Define field-level access permissions, relations and
        validation rules.
      </>
    )
  },
  {
    title: 'Isomorphic',
    imageUrl: 'img/merge.svg',
    description: (
      <>
        Avoid the hussle to define roles, permissions, validations and form
        logic twice: describe it once for both frontend and backend.
      </>
    )
  },
  {
    title: 'Offline-first',
    imageUrl: 'img/disconnect.svg',
    description: (
      <>
        Data is processed in the frontend first, then synced with the backend
        when connection is available.
      </>
    )
  },
  {
    title: 'Realtime',
    imageUrl: 'img/time.svg',
    description: (
      <>
        Sync client and server instantly with GraphQL subscriptions over
        websockets.
      </>
    )
  },
  {
    title: 'Modern architecture',
    imageUrl: 'img/ship.svg',
    description: (
      <>
        Extend your app with React components, and your business logic with
        serverless functions or microservices connected to your Hasura backend.
        Ready to use with Kubernetes.
      </>
    )
  },
  {
    title: 'Open source',
    imageUrl: 'img/open-source.svg',
    description: (
      <>
        Exclusively built with open-source tools: React, Hasura, Kubernetes,
        RxDB... Don't get stuck with a vendor. Contribute and share instead!
      </>
    )
  }
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  const imgUrlDark = useBaseUrl(imageUrl.replace('.svg', '-dark.svg'))
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <ThemedImage
            className={styles.featureImage}
            sources={{
              light: imgUrl,
              dark: imgUrlDark
            }}
            alt={title}
          />
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
    <Layout title={siteConfig.title} description="Platyplus website">
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

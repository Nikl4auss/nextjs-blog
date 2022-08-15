import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostsIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

import utilsStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilsStyles.headingXl}>{postData.title}</h1>
        <div className={utilsStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}



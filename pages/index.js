import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Error from 'next/error'
import Link from 'next/link'

import Layout from '../components/Layout'
import StoryList from '../components/StoryList'

class Index extends Component {
  static async getInitialProps({ query }) {
    let stories = []
    let page = 1

    try {
      page = Number(query.page) || 1
      const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
      // const res = await fetch('https://qiita.com/api/v2/items?query=tag:typescript')
      stories = await res.json()
    } catch (error) {
      console.log(error)
    }
    return { stories, page }
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('service worker registration successful', registration)
      })
      .catch(err => {
        console.log('service worker registration failed', err.message)
      })
    }
  }

  render() {
    const { stories, page } = this.props
    const title = page > 1 ? `Tech NEWS: Page${page}` : "Tech NEWS"

    if (stories.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <Layout title={title} description="This is Tech NEWS!!">
        <div>
          <StoryList stories={stories} />
        </div>
        <footer>
          {page > 1 &&
            <Link href={`/?page=${page - 1}`}>
              <a>Prev</a>
            </Link>
          }
          <Link href={`/?page=${page + 1}`}>
            <a>Next</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;
          }
          footer a {
            display: inline-block;
            margin: 1em;
            padding: 1em 2em;
            background-color: #265988;
            border-radius: 4px;
            text-decoration: none;
            color: white;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index

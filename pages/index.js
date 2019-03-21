import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Error from 'next/error'

import Layout from '../components/Layout'
import StoryList from '../components/StoryList'

class Index extends Component {
  static async getInitialProps() {
    let stories = []
    try {
      const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
      // const res = await fetch('https://qiita.com/api/v2/items?query=tag:typescript')
      stories = await res.json()
    } catch (error) {
      console.log(error)
    }
    return { stories }
  }

  render() {
    const { stories } = this.props

    if (stories.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <Layout title="Tech NEWS" description="This is Tech NEWS">
        <div>
          <StoryList stories={stories} />
        </div>
      </Layout>
    )
  }
}

export default Index

import fetch from 'isomorphic-fetch'
import Error from 'next/error'

import Layout from '../components/Layout'
import CommentList from '../components/CommentList'

class Story extends React.Component {
  static async getInitialProps({ query }) {
    let story

    try {
      const storyId = query.id
      const response = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`)
      story = await response.json()
    } catch (error) {
      console.log(error)
      story = null
    }

    return { story }
  }

  render() {
    const { story } = this.props

    if (!story) {
      return <Error statusCode={503} />
    }

    return (
      <Layout title={story.title} description={story.description}>
        <main>
          <h1 className="story-title">
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
          </h1>
          <div className="story-details">
            <strong>{story.points} points</strong>
            <strong>{story.comments_count} comments</strong>
            <strong>{story.time_ago} </strong>
          </div>
          {story.comments.length > 0 ? (
            <CommentList comments={story.comments} />
          ) : (
            <div>No comments for this story</div>
          )}
        </main>
        <style jsx>{`
          main {
            padding: 1em;
          }
          .story-title {
            margin: 0;
            padding-bottom: 0.5em;
            font-size: 1.2rem;
            font-weight: 500;
          }
          .story-title a {
            color: #333;
            text-decoration: none;
          }
          .story-title a:hover {
            text-decoration: underline;
          }
          .story-details {
            margin-bottom: 1em;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 0.8rem;
          }
          .story-details strong {
            margin-right: 1em;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Story

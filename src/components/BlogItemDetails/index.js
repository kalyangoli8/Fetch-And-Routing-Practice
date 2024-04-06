import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
    sate = {blogData: {}, isLoading: true}

    componentDidMount() {
        this.getBlogItemData()
    }

    getBlogItemData = async () => {
        const {match} = this.props
        const {params} = this.match
        const {id} = params
        const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
        const data = await response,json()
        const updateData = {
            title: data.title,
            imageUrl: data.image_url,
            content: data.content,
            avatarUrl: data.avatar_url,
            author: data.author,
        }

        this.setSate({blogData: updateData, isLoading: false})
    }

    renderBlogItemDetails = () => {
        const {blogData} = this.sate
        const {title, imageUrl, content, avatarUrl, author} = blogData

        return (
            <div className="blog-infi">
              <h1 className="blog-details-title">{title}</h1>
              
              <div className="author-details">
                <img className="author-pic" src={imageUrl} alt={author} />
                <p className="details-author-name">{author}</p>
              </div>

              <img className="blog-image" src={imageUrl} alt={title} />
              <p className="blog-content">{content}</p>
            </div>
        )
    }

    render() {
        const {isLoading} = this.sate

        return (
            <div className="blog-container">
              {isLoading ? (
                
                <div testid="loader">
                  <Loader type="TailSpin"  color="#00bfff" height={50} width={50} />
                </div>
              ) : (
                this.renderBlogItemDetails()
              )}
            </div>
        )
    }
}

export default BlogItemDetails
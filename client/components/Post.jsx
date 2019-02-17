import React from 'react';
import ReactDOM from 'react-dom';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.readMore = React.createRef();
		this.state = {
			readMore: null,
			prev: null
		};
		this.highlightText = this.highlightText.bind(this);
		this.expandPost = this.expandPost.bind(this);
	}

	componentDidMount() {
		this.updateReadMore();
	}

	componentDidUpdate() {
		this.updateReadMore();
	}

updateReadMore() {
	var node = this.readMore.current;
	if (node.scrollHeight !== this.state.prev && node.scrollHeight > node.offsetHeight) {
		this.setState({
			readMore: <div className='expand' onClick={this.expandPost}>+ Read More</div>,
			prev: node.scrollHeight
		});
	} else if (node.scrollHeight !== this.state.prev && node.scrollHeight <= node.offsetHeight) {
		this.setState({
			readMore: null,
			prev: node.scrollHeight
		});
	}		
}

	highlightText(text, highlight) {
		var parts = text.split(new RegExp(`(${highlight.join('|')})`, 'gi'));
		return (
			<span className='post hide' ref={this.readMore}>
				{
					parts.map(part => highlight.includes(part.toLowerCase()) ? <b>{part}</b> : part)
				}
			</span>
		);
	}

	expandPost(node) {
		var classList = node.target.parentNode.querySelector('.post').classList;
		if (classList.contains('hide')) {
			classList.replace('hide', 'show');
			node.target.innerText = '- Read Less';
		} else {
			classList.replace('show', 'hide');
			node.target.innerText = '+ Read More';
		}
	}

	render() {
		return (
			<div>
				{
					this.highlightText(this.props.post, this.props.checked)
				}
				{
					this.state.readMore
				}
			</div>
		);	
	}
}

module.exports = Post;
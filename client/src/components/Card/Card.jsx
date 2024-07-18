import React from 'react'
import './Card.scss'
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
	console.log(item)
	return (
		<Link className='link' to={`/product/${item.id}`}>
			<div className='card'>
				<div className='image'>
					{1 && <span>New Season</span>}
					<img
						src={`http://localhost:1337${item.attributes.img.data.attributes.url}`}
						alt=''
						className='mainImg'
					/>
					<img src={item.attributes.img2} alt='' className='secondImg' />
				</div>
				<h2>{item.attributes.title}</h2>
				<div className='prices'>
					<h3>${item.attributes.price}</h3>
					{/* <h3>${1}</h3> */}
				</div>
			</div>
		</Link>
	)
}

export default Card

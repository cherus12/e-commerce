import React, { useEffect, useState } from 'react'
import './List.scss'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'

const List = ({ subCats, maxPrice, sort, catId }) => {
	const { data, loading, error } = useFetch(
		`http://localhost:1337/api/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
			item => `&[filters][sub_categories][id]=${item}`
		)}&[filters][price][$lte]=${maxPrice}${sort ? `&sort=price:${sort}` : ''}`
	)

	return (
		<div className='list'>
			{data &&
				data?.map(item => <Card item={item} key={item.attributes.id}></Card>)}
		</div>
	)
}

export default List

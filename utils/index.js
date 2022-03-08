import moment from 'moment'

export const getLabelTime = (type, days) => {
	const formater = type === 'years'? 'YYYY' : 
		type === 'months'? 'MM' : 'YYYY:M:DD'
	const arr = []
	for (let i = 0; i < days; i++) {
		const date = moment().subtract(i, type).format(formater)
		arr.push(date)
	}
	return arr
}

export const getDateStr = (formater, date) => {
	return moment(date).format(formater)
}

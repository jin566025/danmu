import request from '@/utils/request.js'

export function allShowActiveUser(data){

	return request({
		url:'/show-active-user/allShowActiveUser',
		headers: {
			 'Content-type': 'application/x-www-form-urlencoded'
		},
		params:data,
		method:'get'
	})
}
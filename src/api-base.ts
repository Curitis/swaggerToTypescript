import { AxiosRequestConfig, CancelToken } from 'axios'
import axiosInstance from '@/libs/api.request' // 封装后的axios

export type RequestQueryParamsType = Record<string | number, any>

export class ApiBase {
	private baseUrl: string = process.env.VUE_APP_BASE_URL?.substring(0, process.env.VUE_APP_BASE_URL.length - 1) || '';

	private addQueryParam(query: RequestQueryParamsType, key: string) {
		return (
			encodeURIComponent(key) + '=' + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(',') : query[key])
		)
	}

	protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
		const query = rawQuery || {}
		const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key])
		return keys.length
			? `?${keys
					.map(key =>
						typeof query[key] === 'object' && !Array.isArray(query[key])
							? this.addQueryParams(query[key] as object).substring(1)
							: this.addQueryParam(query, key)
					)
					.join('&')}`
			: ''
	}

	public request = <T = any>(path: string, method: string, body?: any, cancelToken?: CancelToken): Promise<T> => {
		const options = <AxiosRequestConfig>{
			method: method,
			data: body,
			url: `${this.baseUrl}${path}`,
			headers: {
				Accept: 'application/json, text/plain, */*'
			},
			cancelToken
		}
		const promise = axiosInstance.request(options)

		return promise.then(async (response: any) => {
			return response.data
		})
	}
}

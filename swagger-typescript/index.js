// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateApi } = require('@wynnyo/swagger-typescript-api')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
generateApi({
	output: '/api', // 输出的文件放在哪个目录下
	name: 'publicApi.ts', // 输出的ts文件名
	url: 'http://*****/swagger.json', // swaggerjson地址
	templates: './swagger-typescript/templates/default' // 编译模板地址
})
	.then(({ files }) => {
		files.forEach(({ content, name }) => {
			// eslint-disable-next-line no-undef
			fs.writeFile(`.\\src\\api\\${name}`, content, err => {
				console.log(err)
			})
		})
	})
	.catch(e => console.error(e))

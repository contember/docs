import * as React from 'react'

export const GeneratorLazy = React.memo(() => {
	const [generator, setGenerator] = React.useState(null)

	React.useEffect(() => {
		import('./Generator').then(({ Generator }) => {
			setGenerator(<Generator />)
		})
	}, [])

	return generator
})

GeneratorLazy.displayName = 'GeneratorLazy'

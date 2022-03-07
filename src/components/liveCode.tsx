import * as React from 'react'
import * as Contember from '@contember/admin'
import { ApplicationEntrypoint } from '@contember/admin'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import { useColorMode } from '@docusaurus/theme-common'

export default function ({ code, entity, entities }) {
	const { isDarkTheme } = useColorMode()

	return (
		<ApplicationEntrypoint
			basePath="http://localhost:1481"
			apiBaseUrl="http://localhost:1481"
			sessionToken="0000000000000000000000000000000000000000"
			project="quickstart"
			stage="live"
		>
			<LiveProvider code={code} scope={Contember} language="tsx" theme={nightOwl} transformCode={(code) => {
				if (entity) {
					return (`
						<DataBindingProvider stateComponent={FeedbackRenderer}>
							<EntitySubTree entity="${entity}" isCreating>
								${code}
							</EntitySubTree>
						</DataBindingProvider>
					`)
				} else if (entities) {
					return (`
					<DataBindingProvider stateComponent={FeedbackRenderer}>
						<EntityListSubTree entity="${entities}" isCreating>
							${code}
						</EntityListSubTree>
					</DataBindingProvider>
				`)
				} else {
					return (`
					<DataBindingProvider stateComponent={FeedbackRenderer}>
						${code}
					</DataBindingProvider>
				`)
				}
			}}>
				<LiveEditor className="live-code-editor" />
				<LiveError className="live-code-error admonition admonition-tip alert alert--danger" />
				<div className="live-code-preview-wrapper">
					<h6>Component preview</h6>
					<div className="live-code-preview">
						<LivePreview className={`cui-layout scheme-${isDarkTheme ? 'dark' : 'light'}`} />
					</div>
				</div>
			</LiveProvider>
		</ApplicationEntrypoint>
	)
}

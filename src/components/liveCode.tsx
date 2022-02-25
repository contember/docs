import * as React from 'react'
import * as Contember from '@contember/admin'
import { ApplicationEntrypoint, DataBindingProvider, DirtinessContext, FeedbackRenderer } from '@contember/admin'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

{/* <DirtinessContext.Provider value={true}> */ }

export default function ({ children }) {
	return (
		<div className="cui-layout">
			<ApplicationEntrypoint
				basePath="http://localhost:1481"
				apiBaseUrl="http://localhost:1481"
				sessionToken="0000000000000000000000000000000000000000"
				project="quickstart"
				stage="live"
			>
				<DataBindingProvider stateComponent={FeedbackRenderer}>
					<DirtinessContext.Provider value={true}>
						<LiveProvider code={children} scope={Contember} language="tsx">
							<LiveEditor />
							<LiveError />
							<LivePreview />
						</LiveProvider>
					</DirtinessContext.Provider>
				</DataBindingProvider>
			</ApplicationEntrypoint>
		</div>
	)
}

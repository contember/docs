import * as React from 'react'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { ToasterProvider, DialogProvider, ContemberClient, Toaster, I18nProvider, StyleProvider } from '@contember/admin'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useColorMode } from '@docusaurus/theme-common'
import * as Contember from './contember'

type LiveCodeProps = {
	code: string
	entity: string
	entities: string
	preview: boolean
	withoutDatabinding: boolean
}

export default function ({ code, entity, entities, withoutDatabinding = false, preview = true }: LiveCodeProps) {
	const { isDarkTheme } = useColorMode()
	const { siteConfig: { customFields } }: any = useDocusaurusContext()

	return (
		<BrowserOnly fallback={<div>Loading...</div>}>
			{
				() => {
					return (
						<I18nProvider localeCode={undefined} dictionaries={undefined}>
							<ToasterProvider>
								<DialogProvider>
									<ContemberClient
										apiBaseUrl={customFields.contemberApiBaseUrl}
										sessionToken={customFields.contemberSessionToken}
										project={customFields.contemberProjectName}
										stage="live"
									>
										<LiveProvider
											code={code}
											scope={Contember}
											language="tsx"
											theme={nightOwl}
											transformCode={(code) => {
												if (withoutDatabinding) {
													return code
												} else if (entity) {
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
											}}
										>
											<LiveEditor className="live-code-editor" />
											<LiveError className="live-code-error admonition admonition-tip alert alert--danger" />
											{preview &&

												<div className="live-code-preview-wrapper">
													<h6>Component preview</h6>
													<div className="live-code-preview">
														<StyleProvider>
															<LivePreview className={`scheme-${isDarkTheme ? 'dark' : 'light'}`} />
														</StyleProvider>
													</div>
												</div>
											}
										</LiveProvider>
									</ContemberClient>
									<Toaster />
								</DialogProvider>
							</ToasterProvider>
						</I18nProvider>
					)
				}
			}
		</BrowserOnly >
	)
}

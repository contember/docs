import * as React from 'react'
// import * as Contember from '@contember/admin'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { ToasterProvider, DialogProvider, ContemberClient, Toaster, I18nProvider, StyleProvider } from '@contember/admin'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useColorMode } from '@docusaurus/theme-common'

// solves SSR window problem
import { DataBindingProvider, EntitySubTree, FeedbackRenderer, ClearFieldButton, PersistButton, BlockEditor, RichEditor, TextField } from '@contember/admin' 

export default function ({ code, entity, entities }) {
	const { isDarkTheme } = useColorMode()

	return (
		<BrowserOnly fallback={<div>Loading...</div>}>
			{
				() => {
					const scope = { 
						DataBindingProvider, 
						EntitySubTree, 
						FeedbackRenderer, 
						ClearFieldButton, 
						PersistButton, 
						BlockEditor, 
						RichEditor, 
						TextField 
					}

					return (
						<I18nProvider localeCode={undefined} dictionaries={undefined}>
							<ToasterProvider>
								<DialogProvider>
									<ContemberClient
										apiBaseUrl="http://localhost:1481"
										sessionToken="0000000000000000000000000000000000000000"
										project="quickstart"
										stage="live"
									>
											<LiveProvider
												code={code} 
												scope={scope} 
												language="tsx" 
												theme={nightOwl} 
												transformCode={(code) => {
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
												}}
											>
												<LiveEditor className="live-code-editor" />
												<LiveError className="live-code-error admonition admonition-tip alert alert--danger" />
												<div className="live-code-preview-wrapper">
													<h6>Component preview</h6>
													<div className="live-code-preview">
														<StyleProvider>
															<LivePreview className={`scheme-${isDarkTheme ? 'dark' : 'light'}`} />
														</StyleProvider>
													</div>
												</div>
											</LiveProvider>
									</ContemberClient>
									<Toaster />
								</DialogProvider>
							</ToasterProvider>
						</I18nProvider>
					)
				}
			}
		</BrowserOnly>
	)
}

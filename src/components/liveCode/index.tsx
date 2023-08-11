import { ContemberClient, DialogProvider, I18nProvider, Providers, StyleProvider, Toaster, ToasterProvider, toViewClass } from '@contember/admin'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import classNames from 'classnames'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import * as Contember from './contember'

type LiveCodeProps = {
	code: string
	editDisabled?: boolean
	entity: string
	entities: string
	noPreviewPadding?: boolean
	preview: boolean
	withoutDatabinding: boolean
}

export default function ({ code, editDisabled = false, entity, entities, noPreviewPadding = false, withoutDatabinding = false, preview = true }: LiveCodeProps) {
	const { colorMode } = useColorMode()
	const { siteConfig: { customFields } }: any = useDocusaurusContext()

	return (
		<BrowserOnly fallback={<div>Loading...</div>}>
			{
				() => {
					return (
						<I18nProvider localeCode={undefined} dictionaries={undefined}>
							<ToasterProvider>
								<ContemberClient
									apiBaseUrl={customFields.contemberApiBaseUrl}
									sessionToken={customFields.contemberSessionToken}
									project={customFields.contemberProjectName}
									stage="live"
								>
									<Providers>
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
											<LiveEditor disabled={editDisabled} className="live-code-editor" />
											<LiveError className="live-code-error admonition admonition-tip alert alert--danger" />
											{preview &&

												<div className="live-code-preview-wrapper">
													<h6>Component preview</h6>
													<div className={classNames("live-code-preview", toViewClass('no-padding', noPreviewPadding))}>
														<StyleProvider>
															<LivePreview className={`scheme-${colorMode === 'dark' ? 'dark' : 'light'}`} />
														</StyleProvider>
													</div>
												</div>
											}
										</LiveProvider>
									</Providers>
								</ContemberClient>
								<Toaster />

							</ToasterProvider>
						</I18nProvider>
					)
				}
			}
		</BrowserOnly>
	)
}

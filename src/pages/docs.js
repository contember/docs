import React from "react";
import Layout from '@theme/Layout';

export default function Docs() {
	return (
		<Layout>
			<div className={'padding-vert--lg'}>
				<div className={'container'}>
					<div className={'row'}>
						<div className={'col'}>
							<h1>Contember Documentation</h1>
							Continue to <a href={'/docs/intro/how-it-works'}>How Contember works</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

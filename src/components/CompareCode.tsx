import React from "react"
import "./CompareCode.css"

type CompareCodeProps = {
	children?: React.ReactNode
}

export default function CompareCode(props: CompareCodeProps) {
	return (
		<div className="compare-code-wrapper">
			{props.children[0]}
			<span className="icon" />
			{props.children[1]}
		</div>
	)
}

import React from 'react'
import { PropsTableRow, PropsTableRowProps } from '../propsTable'

export const renderFilePreview = (props: PropsTableRowProps) => (
	<PropsTableRow
		{...props}
		prop="renderFilePreview"
		propType={`(options: RenderFilePreviewOptions<AcceptArtifacts>) => ReactNode`}
		description="Renders the file preview."
	/>
)

export const acceptMimeTypes = (props: PropsTableRowProps) => (
	<PropsTableRow
		{...props}
		prop="acceptMimeTypes"
		propType={`undefined | string | string[]`}
		description="Accepted mime types."
	/>
)

export const acceptFile = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="acceptFile"
        propType={`undefined | ((options: AcceptFileOptions) => boolean | Promise<unknown>)`}
        description={`
            A function that is called to check if the file is accepted.
        `}
    />
)

export const urlField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="urlField"
        propType="string"
        description="The name of the column in Contember schema where to store file url."
    />
)

export const fileNameField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileNameField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file name.
        `}
    />
)

export const fileSizeField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileSizeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file size.
        `}
    />
)

export const fileTypeField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="fileTypeField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store file type.
        `}
    />
)

export const heightField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="heightField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store height.
        `}
    />
)


export const widthField = (props: PropsTableRowProps) => (
    <PropsTableRow
        {...props}
        prop="widthField"
        propType={`undefined | string`}
        description={`
            The name of the column in Contember schema where to store width.
        `}
    />
)

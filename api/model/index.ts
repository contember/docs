import { SchemaDefinition as def } from '@contember/schema-definition'

export const ContentBlockType = def.createEnum(
	'heroSection', // primaryText, content, images, buttons
	'logosSection', // jsonContent, images
	'contentSection', // primaryText, content
	'featureSection', // primaryText, secondaryText, content, featureList
	'ctaSection', // primaryText, secondaryText, content, buttons
	'testimonialSection', // primaryText, content, testimonials
	'contactSection', // primaryText, content
)

export class BlockRepeater {
	blocks = def.oneHasMany(RepeaterBlock, 'blockRepeater').orderBy('order')
}

export class RepeaterBlock {
	order = def.intColumn().notNull()
	type = def.enumColumn(ContentBlockType).notNull()

	content = def.stringColumn()
	author = def.stringColumn()
	images = def.oneHasMany(RepeaterGallery, 'repeaterReference').orderBy('order')
	blockRepeater = def.manyHasOne(BlockRepeater, 'blocks')
}

export class RepeaterGallery {
	order = def.intColumn().notNull()
	image = def.manyHasOne(Image).notNull()
	repeaterReference = def.manyHasOne(RepeaterBlock, 'images').cascadeOnDelete()
}

export class BlockEditor {
	blocks = def.oneHasMany(EditorBlock, 'blockEditor').orderBy('order')
	name = def.stringColumn()
}

export class EditorBlock {
	order = def.intColumn().notNull()
	type = def.enumColumn(ContentBlockType).notNull()

	content = def.stringColumn()
	blockEditor = def.manyHasOne(BlockEditor, 'blocks')
	references = def.oneHasMany(ContentReference, 'contentPart')
}

export class ContentReference {
	type = def.enumColumn(def.createEnum('gallery')).notNull()
	contentPart = def.manyHasOne(EditorBlock, 'references')
	content = def.stringColumn()
	author = def.stringColumn()
	images = def.oneHasMany(ContentGallery, 'contentReference').orderBy('order')
}

export class ContentGallery {
	order = def.intColumn().notNull()
	image = def.manyHasOne(Image).notNull()
	contentReference = def.manyHasOne(ContentReference, 'images').cascadeOnDelete()
}

export class Upload {
	file = def.oneHasOne(File)
	files = def.oneHasMany(UploadFile, 'upload')
	image = def.oneHasOne(Image)
	video = def.oneHasOne(Video)
}

export class UploadFile {
	order = def.intColumn().notNull()
	file = def.oneHasOne(File)
	upload = def.manyHasOne(Upload, 'files')
}

export class File {
	url = def.stringColumn()
	description = def.stringColumn()
	name = def.stringColumn()
	size = def.stringColumn()
	type = def.stringColumn()
	width = def.intColumn()
	height = def.intColumn()
}

export class Image {
	url = def.stringColumn()
	description = def.stringColumn()
	name = def.stringColumn()
	size = def.stringColumn()
	type = def.stringColumn()
	width = def.intColumn()
	height = def.intColumn()
}

export class Video {
	url = def.stringColumn()
}

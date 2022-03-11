import { PermissionsBuilder } from '@contember/schema-definition'
import { Acl, Model } from '@contember/schema'

const fieldNames = (model: Model.Schema, entity: string): string[] => {
	return Object.keys(model.entities[entity].fields)
}

const someFields = (predicate: Acl.Predicate, fields: string[]): Acl.FieldPermissions => {
	return Object.fromEntries(fields.map(field => [field, predicate]))
}

const allField = (model: Model.Schema, entity: string, predicate: Acl.Predicate): Acl.FieldPermissions => {
	return someFields(predicate, fieldNames(model, entity))
}

const readOnly = (model: Model.Schema, entity: string, predicate: Acl.Predicate): Acl.EntityOperations => {
	return {
		read: allField(model, entity, predicate),
	}
}

const aclFactory = (model: Model.Schema): Acl.Schema => ({
	roles: {
		admin: {
			variables: {},
			stages: '*',
			entities: PermissionsBuilder.create(model).allowAll().permissions,
		},
		public: {
			variables: {},
			stages: '*',
			entities: {
				BlockRepeater: {
					predicates: {},
					operations: readOnly(model, 'BlockRepeater', true),
				},
				RepeaterBlock: {
					predicates: {},
					operations: readOnly(model, 'RepeaterBlock', true),
				},
				RepeaterGallery: {
					predicates: {},
					operations: readOnly(model, 'RepeaterGallery', true),
				},
				BlockEditor: {
					predicates: {},
					operations: readOnly(model, 'BlockEditor', true),
				},
				EditorBlock: {
					predicates: {},
					operations: readOnly(model, 'EditorBlock', true),
				},
				ContentReference: {
					predicates: {},
					operations: readOnly(model, 'ContentReference', true),
				},
				ContentGallery: {
					predicates: {},
					operations: readOnly(model, 'ContentGallery', true),
				},
				Upload: {
					predicates: {},
					operations: readOnly(model, 'Upload', true),
				},
				UploadFile: {
					predicates: {},
					operations: readOnly(model, 'UploadFile', true),
				},
				File: {
					predicates: {},
					operations: readOnly(model, 'File', true),
				},
				Image: {
					predicates: {},
					operations: readOnly(model, 'Image', true),
				},
				Video: {
					predicates: {},
					operations: readOnly(model, 'Video', true),
				},
			}
		}
	},
})

export default aclFactory

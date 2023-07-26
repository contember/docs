import { EditScope, FieldView, PersistButton } from '@contember/admin'
import { Directive } from '../components/Directives'
import { EditOrCreateForm } from '../components/EditOrCreateForm'
import { SlotSources, Title } from '../components/Slots'

export default () => (
  <>
    <Directive name="full-width" content={true} />

    <EditScope entity="Article(id = $id)">
      <FieldView field="title" render={title => (
        <Title>{`Edit ${title.value ? title.value : 'Article'}`}</Title>
      )} />

      <EditOrCreateForm />

      <SlotSources.Actions>
        <PersistButton />
      </SlotSources.Actions>
    </EditScope>
  </>
)

import React from 'react'

export const PropsTable = ({ firstColumnHeading, secondColumnHeading, children }) => (
    <table className="props-table">
        <thead>
            <tr>
                <th>{firstColumnHeading ?? 'Props'}</th>
                <th>{secondColumnHeading ?? 'Description'}</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
)

export const PropsTableRow = ({ prop, propType, description, inherited, required, readOnly }) => (
    <tr>
        <td>
            {prop &&
                <p className="props-prop">
                    {required ? <span className="required"><code>{prop}</code></span> : <code>{prop}</code>}
                </p>
            }
        </td>
        <td>
            {propType && <p className="props-type-prop" dangerouslySetInnerHTML={{ __html: propType }} />}
            {description && <p className="props-description-prop" dangerouslySetInnerHTML={{ __html: description }} />}
            {inherited && <p className="props-inherited-prop">Inherited from <b>{inherited}</b></p>}
            <div style={{ display: "flex", gap: "0.5em" }}>
                {required && <p className="props-required-prop">Required</p>}
                {readOnly && <p className="props-readonly-prop">Read Only</p>}
            </div>
        </td>
    </tr>
)

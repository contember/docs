import React from 'react';

export const PropsTable = ({ children }) => (
    <table className="props-table">
        <thead>
            <tr>
                <th>Props</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
);

export const PropsTableRow = ({ prop, propType, description, inherited }) => (
    <tr>
        <td>
            <code>{prop}</code>
        </td>
        <td>
            {propType &&
                <p className="props-type-prop">
                    {propType}
                </p>
            }
            <p>
                {description}
            </p>
            {inherited && <span>Inherited from <code>{inherited}</code></span>}
        </td>
    </tr>
);

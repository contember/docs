import React from 'react';

export const PropsTable = ({ children, required }) => (
    <table className="props-table">
        <thead>
            <tr>
                <th>Props</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
        {
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            required
          });
        })
      }
        </tbody>
    </table>
);

export const PropsTableRow = ({ prop, propType, description, inherited, required }) => (
    <tr>
        <td>
            {required ? <span className="required"><code>{prop}</code></span> : <code>{prop}</code>}
        </td>
        <td>
            {propType &&
                <p className="props-type-prop">
                    {propType}
                </p>
            }
            {description &&
                <p className="props-description-prop">
                    {description}
                </p>
            }
            {inherited && <p className="props-inherited-prop">Inherited from <b>{inherited}</b></p>}
            {required && <p className="props-required-prop">Required</p>}
        </td>
    </tr>
);

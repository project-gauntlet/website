import { ReactNode } from "react";
import { Property, renderPropertyType } from "@site/src/components/types";

interface Data {
    internalName: string
    props: Property[]
}

export default function Default({ data }: { data: Data }): ReactNode {
    return (
        <table key={`props-${data.internalName}`}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Is Required</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {data.props.map(property => {
                return (
                    <tr key={property.name}>
                        <td>{property.name}</td>
                        <td>{property.optional ? "Optional" : "Required"}</td>
                        <td>
                            <span style={{ "whiteSpace": "nowrap" }}>{renderPropertyType(property.type)}</span>
                        </td>
                        <td>{property.description}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

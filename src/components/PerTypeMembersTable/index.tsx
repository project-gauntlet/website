import { ComponentRef, renderArity } from "@site/src/components/types";

interface Data {
    tableKey: string
    members: Record<string, ComponentRef>,
    withString: boolean
}

export default function Default({ data }: { data: Data }): JSX.Element {
    return (
        <>
            <p>
                Available non-order-sensitive React children components. The position in children doesn't matter for
                these elements
            </p>
            <table key={`per-type-members-${data.tableKey}`}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>React Component Type</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(data.members).map(([name, componentRef]) => {
                    return ( // TODO Link to section
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{componentRef.componentName}</td>
                            <td>{renderArity(componentRef.arity)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    )
}

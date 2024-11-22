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
                Available order-sensitive React children components. The order in which these elements
                are be placed in code will
                be reflected in UI
            </p>
            <table key={`ordered-members-${data.tableKey}`}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>React Component Type</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {data.withString && (
                    <tr>
                        <td></td>
                        <td>string</td>
                        <td>{renderArity({ type: "zero_or_more" })}</td>
                    </tr>
                )}
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

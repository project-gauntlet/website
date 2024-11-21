import { ReactNode } from "react";

type Component = StandardComponent | RootComponent | TextPartComponent

type StandardComponent = {
    type: "standard",
    internalName: string,
    name: string,
    description: string
    props: Property[],
    children: Children,
}

type RootComponent = {
    type: "root",
    internalName: string,
    children: ComponentRef[],
    sharedTypes: Record<string, SharedType>
}

type SharedType = SharedTypeEnum | SharedTypeObject | SharedTypeUnion

type SharedTypeEnum = {
    type: "enum",
    items: string[],
}

type SharedTypeObject = {
    type: "object",
    items: Record<string, PropertyType>
}

type SharedTypeUnion = {
    type: "union",
    items: PropertyType[]
}

type TextPartComponent = {
    type: "text_part",
    internalName: string,
}

type Property = {
    name: string
    optional: boolean
    description: string
    type: PropertyType
}
type Children = ChildrenMembers | ChildrenString | ChildrenNone | ChildrenStringOrMembers

type ChildrenMembers = {
    type: "members",
    ordered_members: Record<string, ComponentRef>
    per_type_members: Record<string, ComponentRef>
}
type ChildrenStringOrMembers = {
    type: "string_or_members",
    textPartInternalName: string,
    ordered_members: Record<string, ComponentRef>
    per_type_members: Record<string, ComponentRef>
}
type ChildrenString = {
    type: "string"
    textPartInternalName: string,
}
type ChildrenNone = {
    type: "none"
}

type ComponentRef = {
    componentInternalName: string,
    componentName: string,
    arity: Arity
}

type PropertyType = TypeString | TypeNumber | TypeBoolean | TypeComponent | TypeFunction | TypeSharedTypeRef | TypeImageArray | TypeImageUnion

type TypeString = {
    type: "string"
}
type TypeNumber = {
    type: "number"
}
type TypeBoolean = {
    type: "boolean"
}
type TypeComponent = {
    type: "component"
    reference: ComponentRef,
}
type TypeFunction = {
    type: "function"
    arguments: Property[]
}
type TypeSharedTypeRef = {
    type: "shared_type_ref"
    name: string
}
type TypeImageUnion = {
    type: "union"
    items: PropertyType[]
}
type TypeImageArray = {
    type: "array"
    item: PropertyType
}

type Arity = ArityZeroOrOne | ArityOne | ArityZeroOrMore

type ArityZeroOrOne = {
    type: "zero_or_one"
}

type ArityOne = {
    type: "one"
}

type ArityZeroOrMore = {
    type: "zero_or_more"
}

function renderPropertyType(propertyType: PropertyType): ReactNode {
    switch (propertyType.type) {
        case "string": {
            return "string";
        }
        case "number": {
            return "number";
        }
        case "boolean": {
            return "boolean"
        }
        case "component": {
            return `${propertyType.reference.componentName}` // TODO link
        }
        case "function": {
            const args = propertyType
                .arguments
                .map(prop => {
                    const optional = prop.optional ? '?' : '';

                    `${prop.name}${optional}: ${renderPropertyType(prop.type)}`
                })
                .join();

            return `(${args}) => void`
        }
        case "shared_type_ref": {
            return propertyType.name // TODO link
        }
        case "array": {
            return `${renderPropertyType(propertyType.item)}[]`
        }
        case "union": {
            return propertyType.items.map(value => renderPropertyType(value)).join(" | ")
        }
    }
}

function renderArity(arity: Arity): ReactNode {
    switch (arity.type) {
        case "zero_or_one": {
            return "Zero or One"
        }
        case "one": {
            return "Exactly One"
        }
        case "zero_or_more": {
            return "Zero or More"
        }
    }
}

function renderOrderedMembers(tableKey: string, orderedMembers: Record<string, ComponentRef>, withString: boolean): ReactNode {
    return (
        <>
            <h3>
                Children components (order-sensitive)
            </h3>
            <p>
                Available order-sensitive React children components. The order in which these elements are be placed in code will
                be reflected in UI
            </p>
            <table key={tableKey}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>React Component Type</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {withString && (
                    <tr>
                        <td></td>
                        <td>string</td>
                    </tr>
                )}
                {Object.entries(orderedMembers).map(([name, componentRef]) => {
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


function renderPerTypeMembers(tableKey: string, perTypeMembers: Record<string, ComponentRef>): ReactNode {
    return (
        <>
            <h3>
                Children components (non-order-sensitive)
            </h3>
            <p>
                Available non-order-sensitive React children components. The position in children doesn't matter for these elements
            </p>
            <table key={tableKey}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>React Component Type</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(perTypeMembers).map(([name, componentRef]) => {
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

export default function Default({ data }: { data: Component }): JSX.Element {

    const result: ReactNode[] = [];

    switch (data.type) {
        case "text_part": {
            throw new Error("not supported")
        }
        case "root": {
            throw new Error("not supported")
        }
        case "standard": {
            result.push((
                <>
                    <h3>
                        Props
                    </h3>
                    <table key={data.internalName}>
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
                                    <td>{renderPropertyType(property.type)}</td>
                                    <td>{property.description}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </>
            ))

            switch (data.children.type) {
                case "none":
                    break;
                case "string": {
                    result.push(renderOrderedMembers(`ordered-${data.name}`, {}, true))

                    break;
                }
                case "members": {
                    result.push(renderPerTypeMembers(`per-type-${data.name}`, data.children.per_type_members))
                    result.push(renderOrderedMembers(`ordered-${data.name}`, data.children.ordered_members, false))

                    break;
                }
                case "string_or_members": {
                    result.push(renderPerTypeMembers(`per-type-${data.name}`, data.children.per_type_members))
                    result.push(renderOrderedMembers(`ordered-${data.name}`, data.children.ordered_members, true))

                    break;
                }
            }
        }
    }

    return (
        <>
            {result}
        </>
    )
}

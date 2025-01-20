import { ReactNode } from "react";

export type Component = StandardComponent | RootComponent | TextPartComponent

export type StandardComponent = {
    type: "standard",
    internalName: string,
    name: string,
    description: string
    props: Property[],
    children: Children,
}

export type RootComponent = {
    type: "root",
    internalName: string,
    children: ComponentRef[],
    sharedTypes: Record<string, SharedType>
}

export type SharedType = SharedTypeEnum | SharedTypeObject | SharedTypeUnion

export type SharedTypeEnum = {
    type: "enum",
    items: string[],
}

export type SharedTypeObject = {
    type: "object",
    items: Record<string, PropertyType>
}

export type SharedTypeUnion = {
    type: "union",
    items: PropertyType[]
}

export type TextPartComponent = {
    type: "text_part",
    internalName: string,
}

export type Property = {
    name: string
    optional: boolean
    description: string
    type: PropertyType
}
export type Children = ChildrenMembers | ChildrenString | ChildrenNone | ChildrenStringOrMembers

export type ChildrenMembers = {
    type: "members",
    ordered_members: Record<string, ComponentRef>
    per_type_members: Record<string, ComponentRef>
}
export type ChildrenStringOrMembers = {
    type: "string_or_members",
    textPartInternalName: string,
    ordered_members: Record<string, ComponentRef>
    per_type_members: Record<string, ComponentRef>
}
export type ChildrenString = {
    type: "string"
    textPartInternalName: string,
}
export type ChildrenNone = {
    type: "none"
}

export type ComponentRef = {
    componentInternalName: string,
    componentName: string,
    arity: Arity
}

export type PropertyType = TypeString | TypeNumber | TypeBoolean | TypeComponent | TypeFunction | TypeSharedTypeRef | TypeImageArray | TypeImageUnion

export type TypeString = {
    type: "string"
}
export type TypeNumber = {
    type: "number"
}
export type TypeBoolean = {
    type: "boolean"
}
export type TypeComponent = {
    type: "component"
    reference: ComponentRef,
}
export type TypeFunction = {
    type: "function"
    arguments: Property[]
}
export type TypeSharedTypeRef = {
    type: "shared_type_ref"
    name: string
}
export type TypeImageUnion = {
    type: "union"
    items: PropertyType[]
}
export type TypeImageArray = {
    type: "array"
    item: PropertyType
}

export type Arity = ArityZeroOrOne | ArityOne | ArityZeroOrMore

export type ArityZeroOrOne = {
    type: "zero_or_one"
}

export type ArityOne = {
    type: "one"
}

export type ArityZeroOrMore = {
    type: "zero_or_more"
}

export function renderPropertyType(propertyType: PropertyType): ReactNode {
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
            return `<${propertyType.reference.componentName}/>` // TODO link
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

export function renderArity(arity: Arity): ReactNode {
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
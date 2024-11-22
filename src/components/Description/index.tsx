import { ReactNode } from "react";

interface Data {
    description: string
}

export default function Default({ data }: { data: Data }): ReactNode {
    return (
        <p>
            {data.description}
        </p>
    )
}

import { isPrimitiveType } from "./types"

export const objectToString = (obj: any) => {
    let str = `{\n`
    for (const [key, value] of Object.entries(obj)) {
        if (isPrimitiveType(value)) {
            str += `\t${key}: ${typeof value === 'string' ? `'${value}'` : value},\n`
        }
    }
    str += `}`
    return str
}
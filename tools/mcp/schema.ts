import { ZodRawShape } from "zod";
import { CustomElement } from "./manifest";


export function describe(schema: ZodRawShape, customElement: CustomElement){
    for (const [attributeName, value] of Object.entries(schema)) {

        if(!schema[attributeName].description ) {
            const description =  customElement.describe(attributeName);
            if (description) {
                schema[attributeName] = value.describe(description);
            }
        }
    }

}
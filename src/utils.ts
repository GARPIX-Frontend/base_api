import {PAGE_SIZE} from "./constants";

export const getLimitOffset = (page=1, inputLimit=null) => {
    const limit = inputLimit !== null ? inputLimit : PAGE_SIZE;
    const offset = (page - 1) * limit;
    return {
        limit,
        offset,
        page_size: limit,
    }
};

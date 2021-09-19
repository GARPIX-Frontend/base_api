import {PAGE_SIZE} from "../constants";

const paginationSerializer = (data: any, items: any, page=1, limit=PAGE_SIZE) => {
    const pageCount: number = Math.ceil(data.count / limit);
    return {
        count: data.count,
        pageSize: limit,
        page: page,
        pageCount: pageCount,
        hasNext: page < pageCount,
        hasPrev: page > 1,
        items: items,
    };
};

export default paginationSerializer;

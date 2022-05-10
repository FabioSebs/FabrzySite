//HOW TO MAKE OWN TYPES
export interface Post {
    _id: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    categories: {
        _key: string;
        _ref: string;
        _type: string;
    }
}

export interface Category {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string
    _updatedAt: string;
    description: string;
    title: string;
}
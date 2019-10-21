export interface ResponseList<T> {
    count: number;
    value: T[];
}

export interface Project {
    id: string;
    name: string;
    url: string;
    state: string;
    revision: number;
    visibility: string;
    lastUpdateTime: string;
    description?: string;
}

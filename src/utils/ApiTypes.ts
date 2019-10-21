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

export interface BuildDefinition {
    _links: ValueLinks;
    quality: string;
    authoredBy: User;
    id: number;
    name: string;
    url: string;
    uri: string;
    path: string;
    type: Type;
    queueStatus: QueueStatus;
    revision: number;
    createdDate: Date;
    project: Project;
}

export interface ValueLinks {
    [key: string]: { href: string };
}

export interface User {
    displayName: string;
    url: string;
    _links: ValueLinks;
    id: string;
    uniqueName: string;
    imageUrl: string;
    descriptor: string;
}

export enum QueueStatus {
    Enabled = "enabled",
    Disabled = "disabled"
}

export enum Type {
    Build = "build"
}

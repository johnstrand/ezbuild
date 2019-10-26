import { Branch } from "./ApiTypes";

export const stringCompare = (a: string, b: string) => {
    return a > b ? 1 : a < b ? -1 : 0;
};

export const branchCompare = (a: Branch, b: Branch) => {
    return (
        (a.isBaseVersion ? -1 : 1) - (b.isBaseVersion ? -1 : 1) ||
        new Date(b.commit.committer.date).valueOf() -
            new Date(a.commit.committer.date).valueOf()
    );
};

export interface ResponseList<T> {
    count: number;
    value: T[];
}

export const LOADING = true;
export const LOADING_COMPLETE = false;

export const VISIBLE = true;
export const HIDDEN = false;

export interface AzureTenant {
    id: string;
    tenantId: string;
    countryCode: string;
    displayName: string;
    domains: string[];
    tenantCategory: string;
}

export interface Profile {
    displayName: string;
    publicAlias: string;
    emailAddress: string;
    coreRevision: number;
    timeStamp: string;
    id: string;
    revision: number;
}

export interface Organization {
    accountId: string;
    accountUri: string;
    accountName: string;
    properties: any;
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
    process: Process;
    repository: Repository;
    variables: Variables;
    queue: Queue;
    latestBuild: Build;
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

export interface Build {
    _links: ValueLinks;
    properties: any;
    tags: any[];
    validationResults: any[];
    plans: Plan[];
    triggerInfo: any;
    id: number;
    buildNumber: string;
    status: BuildStatus;
    result: BuildResult;
    queueTime: string;
    startTime: string;
    finishTime: string;
    url: string;
    definition: BuildDefinition;
    buildNumberRevision: number;
    project: Project;
    uri: string;
    sourceBranch: string;
    sourceVersion: string;
    queue: Queue;
    priority: string;
    reason: Reason;
    requestedFor: User;
    requestedBy: User;
    lastChangedDate: Date;
    lastChangedBy: User;
    orchestrationPlan: Plan;
    logs: Logs;
    repository: Repository;
    keepForever: boolean;
    retainedByRelease: boolean;
    parameters?: string;
}

export interface Plan {
    planId: string;
}

export interface Logs {
    id: number;
    type: string;
    url: string;
}

export interface Queue {
    id: number;
    name: string;
    pool: Pool;
}

export interface Pool {
    id: number;
    name: string;
}

export interface Repository {
    id: string;
    type: string;
    name: string;
    url: string;
    defaultBranch: string;
    clean: string;
    checkoutSubmodules: boolean;
}

export interface Branch {
    commit: Commit;
    name: string;
    aheadCount: number;
    behindCount: number;
    isBaseVersion: boolean;
}

export interface Commit {
    commitId: string;
    author: Author;
    committer: Author;
    comment: string;
    url: string;
    treeId?: string;
    parents?: string[];
}

export interface Author {
    name: string;
    email: string;
    date: string;
}

export enum Reason {
    Manual = "manual",
    Schedule = "schedule"
}

export type BuildStatus =
    | "all"
    | "cancelling"
    | "completed"
    | "inProgress"
    | "none"
    | "notStarted"
    | "postponed";

export type BuildResult =
    | "canceled"
    | "failed"
    | "none"
    | "partiallySucceeded"
    | "succeeded";

export interface BuildRequest {
    queue: Id;
    definition: Id;
    project: Id;
    sourceBranch: string;
    sourceVersion: string;
    parameters: string;
}

export interface Id {
    id: number | string;
}

export interface Variables {
    [key: string]: Variable;
}

export interface Variable {
    value: string;
    allowOverride: boolean;
}

export interface ReleaseDefinition {
    source: string;
    revision: number;
    description: string;
    createdBy: User;
    createdOn: string;
    modifiedBy: User;
    modifiedOn: string;
    isDeleted: boolean;
    variableGroups: any;
    releaseNameFormat: string;
    properties: any;
    id: number;
    name: string;
    path: string;
    projectReference: any;
    url: string;
    _links: ValueLinks;
}

export interface Process {
    phases?: Phase[];
    type: number;
    yamlFilename?: string;
}

export interface Phase {
    steps: Step[];
    name: string;
    refName: string;
    condition: string;
    target: Target;
    jobAuthorizationScope: string;
    jobCancelTimeoutInMinutes?: number;
}

export interface ExecutionOptions {
    [key: string]: any;
}

export interface Target {
    executionOptions: ExecutionOptions;
    allowScriptsAuthAccessOption: boolean;
    type: number;
}

export interface Step {
    environment: any;
    enabled: boolean;
    continueOnError: boolean;
    alwaysRun: boolean;
    displayName: string;
    timeoutInMinutes: number;
    condition?: string;
    task: Task;
    inputs: { [key: string]: string };
}

export interface Task {
    id: string;
    versionSpec: string;
    definitionType: string;
}

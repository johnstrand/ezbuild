import profileService from "./Services/ProfileService";
import ApiService from "./Interfaces";
import accountService from "./Services/AccountService";
import repositoryService from "./Services/RepositoryService";
import projectService from "./Services/ProjectService";
import buildService from "./Services/BuildService";
import releaseService from "./Services/ReleaseService";

const Api: ApiService = {
    profileService,
    accountService,
    repositoryService,
    projectService,
    buildService,
    releaseService
};

export default Api;

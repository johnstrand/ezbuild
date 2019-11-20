import createInjector from "hypospray-react";
import {
  ProjectService,
  BuildService,
  RepositoryService,
  ReleaseService,
  ProfileService,
  AccountService
} from "./Api/Interfaces";
import Api from "./Api/Api";

type ApiServices = {
  projectService: ProjectService;
  buildService: BuildService;
  repositoryService: RepositoryService;
  releaseService: ReleaseService;
  profileService: ProfileService;
  accountService: AccountService;
};

const injector = createInjector<ApiServices>();

injector
  .register("accountService", Api.accountService)
  .register("buildService", Api.buildService)
  .register("profileService", Api.profileService)
  .register("projectService", Api.projectService)
  .register("releaseService", Api.releaseService)
  .register("repositoryService", Api.repositoryService);

const { inject } = injector;

export default inject;

import { injectable, inject } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
export default class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.all();

    return projects;
  }
}

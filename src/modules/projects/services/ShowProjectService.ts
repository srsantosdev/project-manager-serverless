import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Project from '../infra/typeorm/entities/Project';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
}

@injectable()
export default class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    return project;
  }
}

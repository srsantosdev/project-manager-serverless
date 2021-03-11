import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
  name?: string;
  client?: string;
  duration?: number;
}

@injectable()
export default class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    project_id,
    name,
    duration,
    client,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    project.name = name || project.name;
    project.duration = duration || project.duration;
    project.client = client || project.client;

    await this.projectsRepository.save(project);

    return project;
  }
}

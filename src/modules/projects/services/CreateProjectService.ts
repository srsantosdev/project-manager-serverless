import { injectable, inject } from 'tsyringe';

import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
  client: string;
  duration: number;
}

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ name, duration, client }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.create({
      name,
      duration,
      client,
    });

    return project;
  }
}

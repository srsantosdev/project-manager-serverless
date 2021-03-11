import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
}

@injectable()
export default class RemoveProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    await this.projectsRepository.remove(project_id);
  }
}

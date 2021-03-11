import { getRepository, Repository } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

export default class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async all(): Promise<Project[]> {
    const projects = await this.ormRepository.find();

    return projects;
  }

  public async create({
    name,
    duration,
    client,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      duration,
      client,
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async findById(project_id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { id: project_id },
    });

    return project;
  }

  public async save(project: Project): Promise<Project> {
    await this.ormRepository.save(project);

    return project;
  }

  public async remove(project_id: string): Promise<void> {
    await this.ormRepository.delete(project_id);
  }
}

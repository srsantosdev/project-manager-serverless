import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import Project from '../infra/typeorm/entities/Project';

export default interface IProjectsRepository {
  all(): Promise<Project[]>;
  create(data: ICreateProjectDTO): Promise<Project>;
  findById(project_id: string): Promise<Project | undefined>;
  save(project: Project): Promise<Project>;
  remove(project_id: string): Promise<void>;
}

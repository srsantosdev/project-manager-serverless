import { container } from 'tsyringe';
import { APIGatewayProxyEvent } from 'aws-lambda';

import '@modules/projects/container';

import handlerErrors from '@shared/utils/handlerErrors';
import handlerResponse from '@shared/utils/handlerResponse';

import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ListProjectsService from '@modules/projects/services/ListProjectsService';
import RemoveProjectService from '@modules/projects/services/RemoveProjectService';
import ShowProjectService from '@modules/projects/services/ShowProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';

type HandlerResponse = {
  statusCode: number;
  body: string;
};

class Handler {
  public static async create(
    event: APIGatewayProxyEvent,
  ): Promise<HandlerResponse> {
    try {
      const { name, client, duration } = JSON.parse(event.body);

      const createProjectService = container.resolve(CreateProjectService);

      const project = await createProjectService.execute({
        name,
        client,
        duration,
      });

      return handlerResponse(project, 201);
    } catch (error) {
      return handlerErrors(error);
    }
  }

  public static async show(
    event: APIGatewayProxyEvent,
  ): Promise<HandlerResponse> {
    try {
      const { project_id } = event.pathParameters;

      const showProjectService = container.resolve(ShowProjectService);

      const project = await showProjectService.execute({ project_id });

      return handlerResponse(project);
    } catch (error) {
      return handlerErrors(error);
    }
  }

  public static async index(_: APIGatewayProxyEvent): Promise<HandlerResponse> {
    try {
      const listProjectsService = container.resolve(ListProjectsService);

      const projects = await listProjectsService.execute();

      return handlerResponse(projects);
    } catch (error) {
      return handlerErrors(error);
    }
  }

  public static async update(
    event: APIGatewayProxyEvent,
  ): Promise<HandlerResponse> {
    try {
      const { project_id } = event.pathParameters;
      const { name, client, duration } = JSON.parse(event.body);

      const updateProjectService = container.resolve(UpdateProjectService);

      const project = await updateProjectService.execute({
        project_id,
        name,
        client,
        duration,
      });

      return handlerResponse(project);
    } catch (error) {
      return handlerErrors(error);
    }
  }

  public static async delete(
    event: APIGatewayProxyEvent,
  ): Promise<HandlerResponse> {
    try {
      const { project_id } = event.pathParameters;

      const removeProjectService = container.resolve(RemoveProjectService);

      await removeProjectService.execute({ project_id });

      return handlerResponse({ success: true }, 200);
    } catch (error) {
      return handlerErrors(error);
    }
  }
}

export default {
  createProject: Handler.create,
  listProjects: Handler.index,
  showProject: Handler.show,
  updateProject: Handler.update,
  deleteProject: Handler.delete,
};

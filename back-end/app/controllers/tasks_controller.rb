class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: tasks
    end

    def show
        task = Task.find_by(id: params["id"])
        render json: task
    end

    def create
        task = Task.create(name: params[:name], list_id: params[:list_id])
        render json: task
    end

    def destroy
        task = Task.find_by(id: params["id"])
        task.destroy()
        render json: task
    end
end

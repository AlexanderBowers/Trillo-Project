class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: tasks
    end

    def show
        task = Task.find(params[:id])
        render json: task
    end

    def create
        task = Task.create(name: params[:name], list_id: 1)
        render json: list
    end

    def destroy
        task = Task.find(params[:id])
        task.destroy()
        render json: task
    end
end

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
<<<<<<< HEAD
        task = Task.create(name: params[:name], list_id: params[:list_id])
=======
        task = Task.create(name: params[:name], list_id: 1)
>>>>>>> e638c1fe3bcd91d7233557c70e0d264d27f8a64a
        render json: task
    end

    def destroy
        task = Task.find(params[:id])
        task.destroy()
        render json: task
    end
end

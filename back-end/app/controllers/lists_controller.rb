class ListsController < ApplicationController
    def index
        list = List.all
        render json: lists
    end

    def show
        list = List.find(params[:id])
        render json: list
    end

    def create
        list = List.create(name: params[:name], board_id: 1)
        render json: list
    end

    def destroy
        list = List.find(params[:id])
        list.destroy()
        render json: list
    end
end

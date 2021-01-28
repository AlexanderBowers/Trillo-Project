class ListsController < ApplicationController
    def index
        lists = List.all
        render json: lists
    end

    def show
        list = List.find_by(id: params["id"])
        render json: list
    end

    def create
        list = List.create(name: params[:name], board_id: params[:board_id])
        render json: list
    end

    def destroy
        list = List.find_by(id: params["id"])
        list.destroy()
        render json: list
    end
end

class BoardsController < ApplicationController
    def index
        boards = Board.all
        render json: boards
    end

    def show
        board = Board.find_by(id: params["id"])
        render json: board
    end

    def create
        board = Board.create(name: params[:name])
        render json: board
    end

    def destroy 
        board = Board.find_by(id: params["id"])
        board.destroy()
        render json: board
    end
end

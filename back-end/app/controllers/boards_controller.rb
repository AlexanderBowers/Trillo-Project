class BoardsController < ApplicationController
    def index
        boards = Board.all
        render json: boards
    end

    def show
        board = Board.find_by(id: params["id"])
        render json: board
    end
end

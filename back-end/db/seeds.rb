# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Board.all.destroy_all
List.all.destroy_all
Task.all.destroy_all

board1 = Board.create(name: 'test_board')
board2 = Board.create(name: 'second_board')

list1 = List.create(name: 'myList', board_id: 1)
list2 = List.create(name: 'secondList', board_id: 1)
list3 = List.create(name: 'third list', board_id: 1)
list4 = List.create(name: 'fourth list', board_id: 1)
list5 = List.create(name: 'fifth list', board_id: 1)
list6 = List.create(name: '2nd board list1', board_id: 2)
list7 = List.create(name: '2nd board works!', board_id: 2)

task1 = Task.create(name: 'testTask', list_id: 1)
task2 = Task.create(name: 'task2', list_id: 1)
task3 = Task.create(name: 'thirdTask', list_id: 2)
task4 = Task.create(name: 'lastTask', list_id: 2)
task6 = Task.create(name: 'it works!', list_id: 7)
task7 = Task.create(name: 'task 1', list_id: 3)
task8 = Task.create(name: 'task 2', list_id: 3)
task9 = Task.create(name: 'task 1', list_id: 4)
task10 = Task.create(name: 'task 2', list_id: 4)

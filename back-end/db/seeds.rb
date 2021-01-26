# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

board = Board.create(name: 'test_board')
list1 = List.create(name: 'myList', board_id: 1)

task1 = Task.create(name: 'testTask', list_id: 1)
task2 = Task.create(name: 'task2', list_id: 1)

list2 = List.create(name: 'secondList', board_id: 1)
task3 = Task.create(name: 'thirdTask', list_id: 2)
task4 = Task.create(name: 'lastTask', list_id: 2)

list3 = List.create(name: 'third list', board_id: 1)
list4 = List.create(name: 'fourth list', board_id: 1)
list5 = List.create(name: 'fifth list', board_id: 1)
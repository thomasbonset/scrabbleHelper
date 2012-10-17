###
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp
 * ----------------------------------------------------------------------------
 */
###
@newLetters=[]
class letterinTheMatrix
	constructor: (@value, @i, @j) ->
	equals: (letter) ->
		return (letter.value == @value and letter.i == @i and letter.j == @j)
			
@map = 
	A:1 
	B:3
	C:3
	D:2
	E:1
	F:4
	G:2
	H:4 
	I:1
	J:8
	K:10
	L:1
	M:2
	N:1 
	O:1
	P:3
	Q:8
	R:1
	S:1
	T:1
	U:1 
	V:4
	W:10
	X:10
	Y:10
	Z:10
	 
@matrix=[]
for i in[0..14]
	matrix[i]= []
	for j in[0..14]
		matrix[i][j]=-1
		
@compute = () ->
	@newLetters=[]
	for i in[0..14]
		for j in[0..14]
			tile = document.querySelector("#coord-#{i}-#{j} > div")
			if tile != null 
				if  matrix[i][j] is -1
					newLetters.push new letterinTheMatrix(tile.innerHTML,i,j)
					matrix[i][j] = tile.innerHTML
	onGoingContent = ""
	switch detectIfNewWordIsHorizontalOrVertical()
		when "horizontal"
			onGoingContent += "Horizontal : #{countWord getHorizontalWord(newLetters[0])} <br>"
			for letter in newLetters
				if getVerticalWord(letter) != undefined
					onGoingContent += "Vertical : #{countWord getVerticalWord(letter)} <br>"
		when "vertical"
			onGoingContent += "Vertical : #{countWord getVerticalWord(newLetters[0])} <br>"	
			for letter in newLetters
				if getHorizontalWord(letter) != undefined
					onGoingContent += "Horizontal : #{countWord getHorizontalWord(letter)} <br>"	
		when "onlyOneLetter"
			if getHorizontalWord(newLetters[0]) != undefined
				onGoingContent += "Horizontal : #{countWord getHorizontalWord(newLetters[0])} <br>"
			if getVerticalWord(newLetters[0]) != undefined
				onGoingContent += "Vertical : #{countWord getVerticalWord(newLetters[0])} <br>"	
		when "unknown"
			onGoingContent = "unknown"			
	document.getElementById("onGoing").innerHTML=onGoingContent
		
countWord = (listofLetters) ->
	result = ""
	score = 0
	for letter in listofLetters
		temp = letter.value
		if letter.value != ' '
			result += temp
			valueOfLetter=map[temp]	
			for newletter in newLetters
				if letter.equals(newletter)
					switch document.getElementById("coord-#{letter.i}-#{letter.j}").className		
						when "blue-pane"
							valueOfLetter = map[temp]*3
						when "cyan-pane"
							valueOfLetter = map[temp]*2
		else
			valueOfLetter=0
		score += valueOfLetter
	return "#{result} : #{score} * #{getWordMultipliers(listofLetters)} = #{score*getWordMultipliers(listofLetters)}" 

getWordMultipliers= (listofLetters) ->
	multiplier = 1
	for letter in listofLetters
		for newletter in newLetters
			if letter.equals(newletter)
				switch document.getElementById("coord-#{letter.i}-#{letter.j}").className		
					when "pink-pane"
						multiplier *=2
					when "red-pane"
						multiplier *=3
	return multiplier
	
getHorizontalWord = (letter) ->
	result=[]
	cursor = letter.j
	while matrix[letter.i][cursor] != -1 and cursor != 0
		cursor--
	if matrix[letter.i][cursor] == -1 then cursor++	
	while matrix[letter.i][cursor] != -1
		result.push new letterinTheMatrix(matrix[letter.i][cursor],letter.i,cursor)
		cursor++
		if cursor == 15 then break
	if result.length > 1
		return result	

getVerticalWord = (letter) ->
	result=[]
	cursor = letter.i
	while matrix[cursor][letter.j] != -1 and cursor != 0
		cursor--
	if matrix[cursor][letter.j] == -1 then cursor++	
	while matrix[cursor][letter.j] != -1
		result.push new letterinTheMatrix(matrix[cursor][letter.j],cursor,letter.j)
		cursor++
		if cursor == 15 then break
	if result.length > 1
		return result		
	
detectIfNewWordIsHorizontalOrVertical = () ->
	if newLetters.length == 1
		return "onlyOneLetter"
	coordList=[]
	for letterinTheMatrix in newLetters
	    coordList.push letterinTheMatrix.i
	if (coordList.every (x)-> x==coordList[0])
		return "horizontal"
	coordList=[]
	for letterinTheMatrix in newLetters
	    coordList.push letterinTheMatrix.j
	if (coordList.every (x)-> x==coordList[0])
		return "vertical"
	return "unknown"
			
@drag = (target, event) ->
	event.dataTransfer.setData "tile", target.id
	
@drop = (target, event) ->
	id = event.dataTransfer.getData "tile"
	target.appendChild document.getElementById(id)
	event.preventDefault() 
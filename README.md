# whiteboard

////////////////////////////////////////////////////////

ToDo :
- add size scaling?
- add movement?? panning?
- fix / improve button boundaries
- some sort of tutorial?

- Improve letters ( font, size, padding )
- Improve background
- Reize buttons

////////////////////////////////////////////////////////

Functions :
letterMove(item): 
Ensures the letter is in front of other characters, then positions it at the position of the mouse. Triggers letterDrop function.

letterDrop(item):
Returns the letter to the back of the page. Checks if the letter was dropped on the clear button, and deletes it if this is the case. If the letter was dropped within the boundary of the page, and the letter is dropped within range of any other letters, the two letters join to become one, and the colour changes to an average of both letter's colours.

letterCreate(count, randBool, char):
If the letter is to be random, a random letter is selected, given a random colour and placed at a random place on the page. Similarly, if the letter is not to be random, the same process is repeated, but with the given letter.

letterSplit(item):
If the user doubleclicks on a word, the word is deleted and individual letters are created of each letter in the word.

randPlacement(element):
The function selects a random X and Y value within the page border, then moves the element to the random place.

letterClear():
Deletes a given element.

isCollide():
Tests if two objects are touching eachother
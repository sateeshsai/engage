User form:
Info to collect - Project name, etc

On clicking Create project button

1. New entry added to the database table
2. Create a New list database for chats
   XProject, Owners, Contributors, Meeting IDs, Files, Goals, Tasks, Chat database ID

3. Project dashboard component active using the data from (XProject)

Click on create meeting

1. Meeting form - Name, ID, Date and time, Sections or Sections from Template, info for each section (goals, agenda - show options from the project tasks and goals), participants, theme

On submit

1. Meeting ID posted to the Project dashboard column
2. Entry in the meeting database -
   MEETINGS
   ID NAME DATETIME FACILITATORS PARTICIPANTS AGENDA GOALS TASKS FILES CHATID NOTES COVER THEME

3. Name, ID, Date and time, {Sections: Agenda: {0: {id: 1; text: "something, status: incomplete}}, goals, tasks, files, chat, Notes, Theme, Cover}
   Show meeting component (device dimensions, device type, date and time, sections, files, Chat database)

STORES:

1. Readable stores:
   A. Window dimensions
   B. Date
2. Writable stores:

A. Sections

A. Meeting info:
Name:
ID:
data: [{
section: "Todo",
items: ["Something", "Another thing"],

}]

Header
Main
Assuming six small and one large component
Grid area might look like:
If less than three components
LEFT
Each small component - Type of the component - Match using Svelte component from Component array -
RIGHT
Large component

If more than 3 Components
LEFT
Each first half of the components
RIGHT
RIGHT TOP
Large component
RIGHT BOTTOM
Each remaining components
Footer

n

#Use Element.getBoundingClientRect() to calculate dimensions #DONE

Add another row in the grid template areas to divide the space equally between the remaining elements. Set minimum height to the board/canvas. #TODO

Icon generated based on the item name, using keywords. User can manually change the icon using the icon library. #TODO

Add photos to agenda and goals and transition them next to names when the item is opened #TODO

Tasks are marked completed with a nice tick animation and moved to the end; #TO DO

<!--
Mousemove should be on the window for the item to be dragged freely. Use svelte:window? #TODO

#Possible cause for the click item bug - change an arbitrary invisible elements properties so tick wont be undefined. May be. -->

# LATEST TO DO:

PWA

1. Host skeleton on github pages for demo

ARCHITECTURE:

1. Create LocalStorage database simulating the SharePoint API
2. Polling
3. Data flow
   1. create a local REST API mirroring SharePoint API for testing
4. Readable Stores
5. Dynamic theming
6. Dynamic layout
7. Zen mode

CSS:

1. Modular systems
   1. Colors
   2. Fonts
   3. Patterns
   4. Illustrations system
   5. Shapes

DESIGN:

1. Collections
   1. Colors
   2. Fonts
   3. Patterns
   4. Illustrations

COMPONENTS:
Global:

- Animation
- Zen mode implementation for each component

1. Chat:
   1. Private chat tabs
   2. Chat bubbles
   3. Rounded corners for the scrollbar
   4. Chat bar top - blend top edge
   5. Time stamps
2. Agenda/Goals:
   1. Delete Item components and merge with List
3. Files:
   1. Test files
   2. thumbnails
   3. Delete button
4. Tasks
   1. Expanded view incomplete
   2. Delete button
   3. More info button
   4. colors implementation
5. Notes
   1. Add a note
   2. Send as an email
   3. Conver to Agenda, goal, or task
6. Board
   1. Game: Tetris
   2. Drawing: Whiteboard - Canvas + Elements?
   3. Interaction: Live Poll
   4. File view + MS live editing
7. Memento
   1. Canvas + Photo collage
   2. Selfie
8. Meeting form

CUSTOMIZATION FEATURES

1. Theming studio
   1. Theme designer
   2. Specs
   3. Approval process
2. Theme store
   1. Stars
   2. Creator
   3. Used by

# CONCEPTUAL

1. Themes by categories

# R&D TO DOs

1. Single file bundling

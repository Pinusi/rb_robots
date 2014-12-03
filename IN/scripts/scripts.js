if( !CLIENT ) { var CLIENT = {}; }
if( !CLIENT.ROBOTSWORLD ) { CLIENT.ROBOTSWORLD = {}; }

/*
 * @Constructor for the game
 * @width = width of mars
 * @height = height of mars
 * @container = eventual dom container
 */
CLIENT.ROBOTSWORLD.Main = function( width, height, container )
{
	//Store Variables of the world
	this.width = width + 1; //normalize the array cause it's the coordinate and not the width
	this.height = height + 1; //normalize the array

	//arrays for scented stuff
	this.notsafe = [];

	//array of robots
	this.robots = [];

	//eventually render it on the page (not requested)
	this.$container = $( container );
	this.$container.css("width",100 * width);
	this.$container.css("height",100 * height);

};

/*
 * Function for the robots creation
 * @data = array of robots objects
 */
CLIENT.ROBOTSWORLD.Main.prototype.createRobots = function( data )
{
	//passed an arryay of objects with coord and eventual instructions
	for (var i = 0; i < data.length; i++) //loop
	{
		//get instructions, if note set to empty
		var eventual_instructions = data[i].instructions ? data[i].instructions : '';

		//create a new robot object
		var new_robot = new CLIENT.ROBOTSWORLD.Robot( data[i].position,eventual_instructions );

		//if at the end of creation is alive add it to the world
		if( new_robot.alive )
		{
			this.robots.push( new_robot );
			console.log(new_robot.x + " " + new_robot.y + " " + new_robot.dir );
		}
		else
		{
			console.log(new_robot.x + " " + new_robot.y + " " + new_robot.dir + " LOST");
		}
	}
};
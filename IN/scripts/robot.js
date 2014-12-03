if( !CLIENT ) { var CLIENT = {}; }
if( !CLIENT.ROBOTSWORLD ) { CLIENT.ROBOTSWORLD = {}; }

/*
 * @Constructor for robot object
 * @initial_position = eg. 1 1 W
 * @eventual_instruction = to move robot initially
 */
CLIENT.ROBOTSWORLD.Robot = function( initial_position, eventual_instruction )
{
	//sequence of rotation position
	this.position_sequence = ["N", "E", "S", "W"];
	//is it alive?
	this.alive = true;

	//assign x
	if( parseInt(initial_position.split(" ")[0], 10) >= window.ROBOTSWORLD.width ) //is it inside the world?
	{
		this.alive = false;
		return;
	}
	else if ( initial_position.split(" ")[0] < 50 ) //is it under 50? as per task
	{
		this.x = parseInt(initial_position.split(" ")[0], 10);
	}
	else
	{
		this.x = 50; //otherwise assign max
	}

	//same for y
	if( parseInt(initial_position.split(" ")[1], 10) >= window.ROBOTSWORLD.height )
	{
		this.alive = false;
		return;
	}
	else if ( initial_position.split(" ")[1] < 50 ) 
	{
		this.y = parseInt(initial_position.split(" ")[1], 10);
	}
	else
	{
		this.y = 50;
	}

	//initial direction (N,W,E,S)
	this.dir = initial_position.split(" ")[2];

	//are there instructions to move it already?
	if( eventual_instruction )
	{
		this.moveRobot( eventual_instruction );
	}
};

/*
 * Function to move the robot, it can be either rotation or move forward
 * @instruction = to move robot
 */
CLIENT.ROBOTSWORLD.Robot.prototype.moveRobot = function( instructions )
{
	//get instructions and limit them to 100 as per request
	var instruction_array = instructions.split("");

	if (instruction_array.length > 100) 
	{
		instruction_array = instruction_array.slice(0, 99);
	}

	//control for falling
	var fall_out = false;

	//loop the instruction string
	for (var i = 0; i < instruction_array.length; i++) {
		switch(instruction_array[i]) //now decide what to do
		{
			case "L":
				this.rotateRobot(true); //rotate left
				break;
			case "F":
				fall_out = this.ffRobot(); //move forward
				break;
			case "R":
				this.rotateRobot(false); //rotate right
				break;
		}
		if( fall_out ) //after this istruction is it still alive?
		{
			this.alive = false;
			break; //if not exit
		}
	}
};

/*
 * Function to rotate the robot
 * @isleft = left or right?
 */
CLIENT.ROBOTSWORLD.Robot.prototype.rotateRobot = function( isleft )
{
	var position_sequence_index = this.position_sequence.indexOf( this.dir ); //determine in the general array the position
	var new_dir_index = 0; //new position?

	if(isleft) //rotate left
	{
		new_dir_index = position_sequence_index - 1;
		
		if( new_dir_index >= 0 ) //circular
		{
			this.dir = this.position_sequence[new_dir_index];
		}
		else
		{
			this.dir = this.position_sequence[3];
		}
	}
	else //rotate right
	{
		new_dir_index = position_sequence_index + 1;
		
		if( new_dir_index < 4 ) //circular
		{
			this.dir = this.position_sequence[new_dir_index];
		}
		else
		{
			this.dir = this.position_sequence[0];
		}
	}
};

/*
 * Function to move forward the robot
 */
CLIENT.ROBOTSWORLD.Robot.prototype.ffRobot = function()
{
	var fallen_out = false;
	var new_pos = 0;
	var new_pos_string = '';

	//do different things depending on the initial direction of the robot
	if( this.dir == 'N' ) //north
	{
		new_pos = this.y + 1; //go up
		new_pos_string = this.x.toString() + new_pos.toString();
		if( window.ROBOTSWORLD.notsafe.indexOf( new_pos_string ) == -1 ) //the new position has a scented stuff? so someone has already fallen from here?
		{
			this.y = new_pos; //if not go

			if( this.y >= window.ROBOTSWORLD.height ) //the new position is outside the planet?
			{
				window.ROBOTSWORLD.notsafe.push(  this.x.toString() + new_pos.toString() ); //then put scented stuff
				fallen_out = true; //robot dead
			}
		}
	}
	else if( this.dir == 'S' ) //south
	{
		new_pos = this.y - 1;
		new_pos_string = this.x.toString() + new_pos.toString();
		if( window.ROBOTSWORLD.notsafe.indexOf( new_pos_string ) == -1 ) //the new position has a scented stuff? so someone has already fallen from here?
		{
			this.y = new_pos; //if not go

			if( this.y < 0 ) //the new position is outside the planet?
			{
				window.ROBOTSWORLD.notsafe.push( this.x.toString() + new_pos.toString() ); //then put scented stuff
				fallen_out = true; //robot dead
			}
		}
	}
	else if( this.dir == 'E' ) //east
	{
		new_pos = this.x + 1;
		new_pos_string = new_pos.toString() + this.y.toString();
		if( window.ROBOTSWORLD.notsafe.indexOf( new_pos_string ) == -1 )//the new position has a scented stuff? so someone has already fallen from here?
		{
			this.x = new_pos; //if not go

			if( this.x >= window.ROBOTSWORLD.width )
			{
				window.ROBOTSWORLD.notsafe.push( new_pos_string ); //then put scented stuff
				fallen_out = true; //robot dead
			}
		}
	}
	else
	{
		//same story but with WEST
		new_pos = this.x - 1;
		new_pos_string = new_pos.toString() + this.y.toString();
		if( window.ROBOTSWORLD.notsafe.indexOf( new_pos_string ) == -1 )
		{
			this.x = new_pos;
			if( this.x < 0 )
			{
				window.ROBOTSWORLD.notsafe.push( new_pos_string );
				fallen_out = true;
			}
		}
	}

	return fallen_out;
};










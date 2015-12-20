/*
Copyright (c) <2015> <Leonard Schütz>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var applescript = require('applescript');

function newTimer(timerEnd, voice) {
	if (timerEnd) {
		// split input
		timerEnd = timerEnd.split(":"); // hours, minutes
		timerEnd.forEach(function(item, index, array) {
			array[index] = parseInt(item);
		});

		// get current time
		var date = new Date();
		var timerCurrent = [date.getHours(), date.getMinutes()];

		var offset_h = timerEnd[0] - timerCurrent[0];
		var offset_m = timerEnd[1] - timerCurrent[1];

		// check if the timer is on the current or the next day
		//
		// calculate the offset for the setTimeout method
		var offset = 0;
		if (!((offset_h<0) || (!offset_h && offset_m<0))) {
			// current day
			offset = (offset_h)*3600000 + (offset_m)*60000;
		} else {
			// next day
			offset = ((24 - timerCurrent[0]-1)*3600000 + (60 - timerCurrent[1])*60000) + (timerEnd[0])*3600000 + (timerEnd[1])*60000;
		}

		// set the timer
		setTimeout(function() {
			var script = 	'display notification "Timer finished" with title "clockjs"'+'\n';
			if (voice) {
				script += 		' do shell script "say timer has finished"'+'\n';
			}
			
			applescript.execString(script, function(err, rtn) {
			  if (err) console.log(err);
			});
		}, offset);
	} else {
		console.log("No time specified.");
	}
}

// allow the newTimer method to be accessed form the outside
exports.newTimer = newTimer;

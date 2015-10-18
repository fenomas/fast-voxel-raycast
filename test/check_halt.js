var test = require("tap").test
var raycast = require("..")

test("halts", function (t) {
	var fakeVoxel = function () { return 0 }
	var pos = new Array(3)
	var direction = new Array(3)
	var start = +new Date()
	for (var i = 0; i < 1000000; ++i) {
		for (var j = 0; j < 3; ++j) {
			pos[j] = Math.random() * 10
			direction[j] = Math.random() - 0.5
		}
		raycast(fakeVoxel, pos, direction, 100)
	}
	var end = +new Date()
	console.log("Time elapsed:", end - start, "ms")
	t.end()
})
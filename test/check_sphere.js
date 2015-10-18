var test = require("tap").test
var raycast = require("..")

test("sphere", function (t) {

	var voxel = { getBlock: function (x, y, z) { return x === 0 && y === 0 && z === 0 ? 1 : 0; } }
	var hit_position = new Array(3)
	var hit_normal = new Array(3)

	//Cast a bunch of rays around a sphere, make sure they hit box surface
	for (var theta = 0; theta < Math.PI * 2.0; theta += 0.25) {
		for (var phi = 0; phi < Math.PI; phi += 0.25) {
			var dir = [Math.cos(theta) * Math.cos(phi),
				Math.sin(theta) * Math.cos(phi),
				Math.sin(phi)]
			var min = 0.001
			for (var x = min; x < 1.0; x += 0.25) {
				for (var y = min; y < 1.0; y += 0.25) {
					for (var z = min; z < 1.0; z += 0.25) {
						var pos = [x - 2.0 * dir[0], y - 2.0 * dir[1], z - 2.0 * dir[2]]
						var b = raycast(voxel, pos, dir, 10, hit_position, hit_normal)
						t.equals(b, 1, "expect hit: " + pos + "  " + dir)
					}
				}
			}
		}
	}

	t.end()
})

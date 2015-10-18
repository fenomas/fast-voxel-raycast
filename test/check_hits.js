var test = require("tap").test
var raycast = require("..")

test("hits", function(t) {

  function assert_tolerance(a, b, str) {
    for(var i=0; i<3; ++i) {
      t.assert(Math.abs(a[i] - b[i]) < 1e-6, str + ": " + a.join(",") + " - " + b.join(","))
    }
  }
  
  
  var voxel = { getBlock: function(x,y,z) { return x === 0 && y === 0 && z === 0  ? 1 : 0; } }
  var hit_position = new Array(3)
  var hit_normal = new Array(3)

  t.equals(raycast(voxel, [-1, 0.5, 0.5], [1, 0, 0], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [0, 0.5, 0.5], "-x position")
  assert_tolerance(hit_normal, [-1, 0, 0], "-x normal")

  t.equals(raycast(voxel, [2, 0.5, 0.5], [-1, 0, 0], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [1, 0.5, 0.5], "+x position")
  assert_tolerance(hit_normal, [1, 0, 0], "+x normal")

  t.equals(raycast(voxel, [0.5, -1, 0.5], [0, 1, 0], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [0.5, 0, 0.5], "-y position")
  assert_tolerance(hit_normal, [0, -1, 0], "-y normal")

  t.equals(raycast(voxel, [0.5, 2, 0.5], [0, -1, 0], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [0.5, 1, 0.5], "+y position")
  assert_tolerance(hit_normal, [0, 1, 0], "+y normal")

  t.equals(raycast(voxel, [0.5, 0.5, -1], [0, 0, 1], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [0.5, 0.5, 0], "-z position")
  assert_tolerance(hit_normal, [0, 0, -1], "-z normal")

  t.equals(raycast(voxel, [0.5, 0.5, 2], [0, 0, -1], 100, hit_position, hit_normal), 1)
  assert_tolerance(hit_position, [0.5, 0.5, 1], "+z position")
  assert_tolerance(hit_normal, [0, 0, 1], "+z normal")
    
  
  //Check distance
  for(var d=0.0; d<1.0; d+=0.1) {
    t.equals(raycast(voxel, [0.5, 0.5, -1.0], [0, 0, 1], d), 0, "distance")
  }
  t.equals(raycast(voxel, [0.5, 0.5, -1.0], [0, 0, 1], 1.0), 1, "distance")
  
  
  t.end()
})
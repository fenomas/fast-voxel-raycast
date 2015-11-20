## fast-voxel-raycast

Fast raycasting through voxels.

This is a fork of [voxel-raycast](https://github.com/mikolalysenko/voxel-raycast), 
using the faster, simpler algorithm described in 
[this paper](http://www.cse.chalmers.se/edu/year/2010/course/TDA361/grid.pdf)
by Amanatides and Woo.

In general it functions equivalently to the parent library, except for 
edge cases (e.g. when the raycast precisely touches the corner of a solid voxel),
in which case no particular behavior is defined.

For 2D raycasting, also see noffle's 
[wrapped implementation](https://github.com/noffle/raycast-2d-tilemap) of this module.

### Installation

    npm install fast-voxel-raycast
    
### Usage

```js
var raycast = require('fast-voxel-raycast')

raycast( getVoxel, start, direction, distance, hit_position, hit_normal )
```

* `getVoxel` - a `function(x,y,z)` that returns a truthy value for whether each voxel should block the raycast
* `start` - origin of the ray
* `direction` - direction of the ray
* `distance` - how far to check the ray before giving up
* `hit_position` - result array, gets populated with the point of impact
* `hit_normal` - gets populated with a normal vector pointing away from the voxel that was struck 

**Returns:**  whatever value was returned by the `getVoxel` function for the struck voxel, 
or `0` if no voxel was struck.

### Example

```js
var raycast = require('fast-voxel-raycast')

var getVoxel = function(x,y,z) {
    // return a truthy value here for voxels that block the raycast
    return (y<0) ? 1 : 0
}

var hit_position = []
var hit_normal = []

var result = raycast( getVoxel, [3,4,5], [1,-1,-1], 20, hit_position, hit_normal )

if (result != 0) {
    console.log('hit:', result, hit_position, hit_normal)
} else {
    console.log('no truthy voxel was struck')
}
```


//////// REDUX ////////

// nerver really change the object, always copy it
// history is available with older versions of the state obj

// actions have two keys
//  type & payload

//only pure functions to be done in reducer
// (= functions that do not change anything outside of the fn())

// shallow cloning
//var user2 = {...user}
// if you ...clone an object the objects one level
// down get connected to the new copy and are still the SAME object

// possilbe copy hack: use json stringify and rejobectify bam full copy??!

// alwasy deep clone!
// optional chaining ?.

// UPDATE redux state
// call dispatch
// give it an action
// reducer executes the action

// GET redux state
// use useSelector

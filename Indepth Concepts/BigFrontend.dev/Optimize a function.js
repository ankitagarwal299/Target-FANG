const items = [
    { color: 'red', type: 'tv', age: 18 },
    { color: 'silver', type: 'phone', age: 20 },
]

const excludes = [
    { k: 'color', v: 'red' },
    { k: 'type', v: 'tv' }
]
function filterItems(items, excludes) {
    excludes.forEach((pair) => {
        items = items.filter((item) => {
            return item[pair.k] != pair.v
        });
    });
    return items;
}//Onm

/* function filterItems(items, excludes) {

    excludes.forEach((pair) => {
        items = items.filter((item) => item[pair.k] != pair.v);
    });

    return items;
} */
//Onk
function filterItems(items, excludes) {
    let excludeMap = {};
    for (let pair of excludes){
        excludeMap[pair.k] = pair.v;
    }
    
    return items.filter((item)=>{
      return Object.keys(excludeMap).every((key)=> item[key] !== excludeMap[key] )
    })
        
  }

console.log(filterItems(items, excludes));


//https://www.youtube.com/watch?v=UETRlxXz9Vg&list=PLvx8w9g4qv_pqqERoqYyX4HKcY8zFbqSp&index=5
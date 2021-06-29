//Q1. Print all path in maze from top to bottom - Very simple
function floodPath(maze) {
    let visited = new Array(maze.length).fill(false).map(_ => new Array(maze[0].length).fill(false));
    floodfill(maze, 0, 0, "", visited);
}
function floodfill(maze, row, col, psf, visited) {
    if (row < 0 || row == maze.length || col < 0 || col == maze[0].length || maze[row][col] == 1 || visited[row][col] == true) {
        return;
    }

    if (row == maze.length - 1 && col == maze[0].length - 1) {
        console.log(psf);
        return
    }

    visited[row][col] = true;
    floodfill(maze, row - 1, col, psf + "t", visited);//top
    floodfill(maze, row, col - 1, psf + "l", visited);//left
    floodfill(maze, row + 1, col, psf + "d", visited);//down
    floodfill(maze, row, col + 1, psf + "r", visited);//right
    visited[row][col] = false;
    return;
}

let path = [[0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0,], [1, 0, 1, 1, 0, 1, 1], [1, 0, 1, 1, 0, 1, 1], [1, 0, 0, 0, 0, 0, 0]];
//ddrdddrrrrr
//ddrrttrrrrddlldddrr
//ddrrrrdddrr

let path = [[0, 1, 1], [0, 0, 1], [1, 0, 0], [0, 1, 0]];//only 1 path drdrd

//https://www.youtube.com/watch?v=R1URUB6_y2k&list=PL-Jc9J83PIiFxaBahjslhBD1LiJAV7nKs&index=47
console.log(floodPath(path));


//11. Container With Most Water/Trapping Rain Water - very Easy
//Sol 1
var maxArea = function (height) {
    /* We are not using values therefore dp is not necessary */

    let overAllArea = 0;
    for (let i = 0; i < heights.length; i++) {
        for (let j = i + 1; j < heights.length; j++) {
            minHeight = Math.min(heights[i], heights[j]);
            let area = minHeight * (j - i);

            if (overAllArea < area) overAllArea = area;
        }

    }
    return overAllArea;
};
let heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights));

//Sol 2
var maxArea = function (height) {
    let overAllArea = 0;

    let i = 0;
    let j = height.length - 1;

    while (i < j) {
        let area = Math.min(height[i], height[j]) * (j - i);//calculate area
        if (overAllArea < area) overAllArea = area;

        if (height[i] <= height[j]) {//we care about max heigh so leave min height
            i++;
        } else {
            j--;
        }
    }
    return overAllArea;
};
let heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights));






//Above question is total area and below is total water
//42. Trapping Rain Water
var trap = function (heights) {
    let maxL = heights[0];
    let maxR = heights[heights.length - 1];
    let trapped = 0;

    let left = 0;
    let right = heights.length - 1;

    while (left <= right) {
        if (maxL < maxR) {
            if (maxL > heights[left]) {
                trapped += maxL - heights[left];

            } else {
                maxL = heights[left];
            }
            left++;
        } else {
            if (maxR > heights[right]) {
                trapped += maxR - heights[right];

            } else {
                maxR = heights[right];
            }
            right--;

        }
    }
    return trapped;

};
//https://www.youtube.com/watch?v=C8UjlJZsHBw
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));//6
console.log(trap([4, 2, 0, 6, 2, 5]));//9
console.log(trap([4, 2, 0, 3, 2, 5]));//9











//733. Flood Fill - Very Easy
//paint adjacent
var floodFill = function (image, sr, sc, newColor) {
    let startingColor = image[sr][sc];

    if (image[sr][sc] == newColor) {
        return image;//floodFill([[0,0,0],[0,1,1]], 1,1,1)
    }
    fill(image, sr, sc, newColor, startingColor);
    return image
};


function fill(image, row, col, newColor, startingColor) {
    if (row < 0 || row == image.length || col < 0 || col == image[0].length || image[row][col] != startingColor) {
        return;
    }
    if (image[row][col] == startingColor) {
        image[row][col] = newColor;
    }

    fill(image, row - 1, col, newColor, startingColor);//top
    fill(image, row, col - 1, newColor, startingColor);//left
    fill(image, row + 1, col, newColor, startingColor);//down
    fill(image, row, col + 1, newColor, startingColor);//right
    return;
}

let initialRow = 0
let initialCol = 0;

console.log(floodFill([[0, 0, 0], [0, 0, 0]], initialRow, initialCol, 2));//[[2,2,2],[2,2,2]]
console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2));//[ [ 2, 2, 2 ], [ 2, 2, 0 ], [ 2, 0, 1 ] ]

//https://www.youtube.com/watch?v=TClRuEZ-uDg
console.log(floodFill([[0, 0, 0], [0, 1, 1]], 1, 1, 1));
//very goood test case , it will continue left to right and right to left.



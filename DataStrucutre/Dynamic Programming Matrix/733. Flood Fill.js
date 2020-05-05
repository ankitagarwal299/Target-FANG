//https://www.youtube.com/watch?v=TClRuEZ-uDg

var floodFill = function (image, sr, sc, newColor) {
    if (image[sr][sc] == newColor) return image;
  
    function fill(image, i, j, color, newColor) {
      if (i < 0 || i >= image.length || j < 0 || j >= image[i].length || image[i][j] != color) return;
  
      image[i][j] = newColor;
      fill(image, i + 1, j, color, newColor);
      fill(image, i - 1, j, color, newColor);
      fill(image, i, j + 1, color, newColor);
      fill(image, i, j - 1, color, newColor);
  
    }
  
    fill(image, sr, sc, image[sr][sc], newColor);
  
    return image;
  };
  
  let image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ];
  
  console.log(floodFill(image, 1, 1, 2));
  
  /*
  Input:  image = [[1,1,1],[1,1,0],[1,0,1]]
  sr = 1, sc = 1, newColor = 2
  Output: [[2,2,2],[2,2,0],[2,0,1]]
  
  Explanation:
  From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected
  by a path of the same color as the starting pixel are colored with the new color.
  Note the bottom corner is not colored 2, because it is not 4-directionally connected
  to the starting pixel.
   */
  
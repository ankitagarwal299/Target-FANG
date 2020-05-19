var flipAndInvertImage = function (image) {
  for (let i = 0; i < image.length; i++) {
    let start = 0;
    let end = image[i].length - 1;

    while (start < end) {
      [image[start], image[end]] = [image[end], image[start]];
      image[start] = image[start] ^ 1;
      image[end] = image[end] ^ 1;
      start++;
      end--;
    }

    if (start == end) image[i] = image[i] ^ 1;
  }
}

var image = [
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 0, 1, 0],
];
console.log(flipAndInvertImage(image));

//https://github.com/eMahtab/flipping-an-image
/*
 Runtime Complexity = O(r * c)
 Space Complexity   = O(1)
*/

//https://www.youtube.com/watch?v=npo6JMzd9No&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=48
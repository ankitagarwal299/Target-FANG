var findContentChildren = function (g, s) {
  if (g == null || s == null || g.length == 0 || s.length == 0) return 0;

  g.sort();
  s.sort();

  let contentChildren = 0;
  let i = g.length - 1;
  let j = s.length - 1;

  while (i >= 0 && j >= 0) {
    if (s[j] >= g[i]) {
      // if size is greater than greed then make kid content
      contentChildren++;
      i--;
      j--;
    } else {
        i--;
    }
  }

  return contentChildren;
};

console.log(findContentChildren([1, 2, 3], [1, 1]));
//https://www.youtube.com/watch?v=1JDh9O7GDyA&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=104
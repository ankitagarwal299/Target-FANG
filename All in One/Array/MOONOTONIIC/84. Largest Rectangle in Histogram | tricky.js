var largestRectangleArea = function (heights) {
    if (heights == null || heights.length == 0) return 0;

    let maxArea = -Infinity;

    let stack = [];
    for (let i = 0; i <= heights.length; i++) {//trick go to out of bounds

        while (stack.length > 0 && (i == heights.length || heights[stack[stack.length - 1]] > heights[i])) {
            let height = heights[stack.pop()];//height at stack peak(max height from left)
            let width = stack.length > 0 ? i - stack[stack.length - 1] - 1 : i;//case 2 and 3 ([1], [1,1])
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};
//[2,4] out of bounds case 2*2=4
//[1]
//[1,1]

//Questioon understanding: https://www.youtube.com/watch?v=J2X70jj_I1o&list=PL_z_8CaSLPWdeOezg68SKkeLN4-T_jNHd&index=7
//code copied : https://www.youtube.com/watch?v=m4hvxzLoN_I
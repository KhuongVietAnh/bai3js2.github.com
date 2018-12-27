window.onload = eventWindowLoaded;
function eventWindowLoaded() {
    Canvas();
}
function Canvas() {
    var myRate = {
        fail: 0.6,
        success: 0.4
    };
    var color = {
        topSuccess: "#009ed5",
        botSuccess: "#456aa4",
        topFail: "red",
        botFail: "#ff6464"
    };
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    var myPiechart = new Piechart(
            {
                ctx,
                widthX: 500,
                heightY: 500,
                radius: 250,
                title: " BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC",
                canvas: canvas,
                data: myRate,
                colors: color
            }
    );
    if ((myRate.fail + myRate.success)*100 !==100)
        alert("The sum of value is deifent 100%. Please try input again.");
    else
        myPiechart.draw();
}
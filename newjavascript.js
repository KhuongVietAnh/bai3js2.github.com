var Piechart = function (options) {
    this.options = options;
    // x,y center of Pie
    var heightY = options.heightY;
    var widthX = options.widthX;
    //radius of pie
    var radius = options.radius;
    //color of pie,text...
    var color = options.colors;
    var ctx = options.ctx;
    //data rate
    var myrate = options.data;
    //radius of Pie
    var pieRadius = Math.min(widthX / 2, heightY / 2);
    var slice_angle;
    var midRadiusSucY;
    var midRadiusSucX;
    var midRadiusFailY;
    var midRadiusFailX;
    var title = options.title;
    /*Check rate
     * If rate success higher =true
     * else = false
     * */
    this.isSuccessHigher = function () {
        if (myrate.fail > myrate.success)
        {
            return false;
        }
        return true;
    };
    var check = this.isSuccessHigher();
    var start_angle = 0;
   //find 
    this.setMidRadius = function () {
        var total = myrate.fail + myrate.success;
        slice_angle = (2 * Math.PI * myrate.fail) / total;
        if (check === true) {
            midRadiusFailX = 230 + widthX / 2 + (pieRadius / 2) * (Math.cos(start_angle + slice_angle / 2));
            midRadiusFailY = heightY / 2 + (pieRadius / 2) * (Math.sin(start_angle + slice_angle / 2));
            if (myrate.fail * 100 === 10) {
                midRadiusFailY = midRadiusFailY + 80;
            }
            slice_angle = (2 * Math.PI * myrate.success) / total;
            midRadiusSucX = 220 + widthX / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            midRadiusSucY = 100 + heightY / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
        } else {
            midRadiusFailX = 250 + widthX / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            midRadiusFailY = heightY / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

            slice_angle = (2 * Math.PI * myrate.success) / total;

            midRadiusSucX = 220 + widthX / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            midRadiusSucY = 150 + heightY / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
        }
    };
    //Draw Text Fail
    this.drawTextFail = function () {
        ctx.beginPath();
        ctx.moveTo(midRadiusFailX, midRadiusFailY);
        if (check === true) {
            ctx.lineTo(700, 200);
            ctx.lineTo(850, 200);
            ctx.fillText(myrate.fail * 100 + "% CHƯA ĐẠT", 700, 190);
        } else {
            ctx.lineTo(300, 200);
            ctx.lineTo(100, 200);
            ctx.fillText(myrate.fail * 100 + "% CHƯA ĐẠT", 100, 190);
        }
        ctx.lineWidth = 3;     
        ctx.strokeStyle = color.botFail;
        ctx.stroke();
    };
    //Draw Text Success
    this.drawTextSuc = function () {
        ctx.beginPath();
        ctx.moveTo(midRadiusSucX, midRadiusSucY);
        if (check === true) {
            ctx.lineTo(300, 200);
            ctx.lineTo(100, 200);
            ctx.fillText(myrate.success * 100 + "% ĐÃ ĐẠT", 100, 190);
        } else {
            ctx.lineTo(700, 200);
            ctx.lineTo(850, 200);
            ctx.fillText(myrate.success * 100 + "% ĐÃ ĐẠT", 700, 190);
        }
        ctx.lineWidth = 3; 
        ctx.strokeStyle = color.botSuccess;
        ctx.stroke();
    };
    //Draw Title
    this.drawTitle = function () {
        ctx.scale(1, 1);
        ctx.restore();
        ctx.beginPath();
        ctx.font = "24px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(title, 280, 850);
        ctx.stroke();
    };
    //Draw Text
    this.drawText = function () {
        this.setMidRadius();
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        this.drawTextFail();
        this.drawTextSuc();
        this.drawTitle();
    };
    //Draw rate Success
    this.drawSuccess = function (i) {
        ctx.beginPath();
        if (i < 99) {
            ctx.fillStyle = color.botSuccess;
        } else {
            ctx.fillStyle = color.topSuccess;
        }
        if (check === false) {
            //alert("asdad");
            ctx.arc(widthX + 15, heightY - i + 5, radius, 0, 2 * Math.PI * myrate.success);
            ctx.lineTo(widthX + 15, heightY - i + 5);

        } else if (myrate.fail === myrate.success) {
            ctx.arc(widthX, heightY - i + 20, radius, 0, 2 * Math.PI * myrate.success);
            ctx.lineTo(widthX, heightY - i + 20);
        } else {
            ctx.arc(widthX - 20, heightY - i + 10, radius, 0, 2 * Math.PI * myrate.success);
            ctx.lineTo(widthX - 20, heightY - i + 10);
        }
        ctx.fill();
    };
    //Draw rate Fail
    this.drawFail = function (i) {
        ctx.beginPath();
        ctx.arc(widthX, heightY - i, radius, 2 * Math.PI * myrate.success, 0);
        ctx.lineTo(widthX, heightY - i);
        if (i < 99) {
            ctx.fillStyle = color.botFail;
        } else {
            ctx.fillStyle = color.topFail;
        }
        ctx.fill();
    };
    //Draw Chart
    this.draw = function () {
        ctx.scale(1, 0.6);
        for (var i = 0; i < 100; i++)
        {
            this.drawFail(i);
            this.drawSuccess(i);
        }
        this.drawText();
    };
};

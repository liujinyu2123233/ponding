var map = new BMap.Map("allmap");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 12);
//开启鼠标滚轴缩放地图功能
map.enableScrollWheelZoom(true);
$.ajax({
    url:"./data/beijing.json",
    type:'get',
    dataType:'json',
    success:function(json){
        console.log(json)
        var datas = json.beijing;
        for(var i=datas.length-1;i>=0;i--){
            var marker = new BMap.Marker(new BMap.Point(datas[i].longitude,datas[i].latitude)); // 创建点
            map.addOverlay(marker);    //增加点
            // pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);


        }
    }
})
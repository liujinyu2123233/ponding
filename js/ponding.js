var M = {
    mapContainerId:'allmap',
    Labels:{},
    map:null,
    data_url_head:'./data/', //ajax数据头
    maxZoom:14,
    minZoom:4,
    defaultZoom:12

};
M.map = new BMap.Map(M.mapContainerId,{minZoom:M.minZoom,maxZoom:M.maxZoom,enableMapClick:false});
var point = new BMap.Point(116.404, 39.915);

M.map.centerAndZoom(point, M.defaultZoom);
//开启鼠标滚轴缩放地图功能
M.map.enableScrollWheelZoom(true);


$.ajax({
    url: M.data_url_head + "fu_zhou.json",
    type:'get',
    dataType:'jsonp',
    jsonpCallback:'callback',
    success:function(json){
        console.log(json)
        var datas = json.d;
        for(var i=datas.length-1;i>=0;i--){

            // pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
            (function(point,street){
                var marker = new BMap.Marker(point); // 创建点
                M.map.addOverlay(marker);    //增加点

                var opts = {
                    width : 200,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title : street, // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                }
                var infoWindow = new BMap.InfoWindow("", opts);  // 创建信息窗口对象
                marker.addEventListener("click", function(){
                    M.map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
            })(new BMap.Point(datas[i][0],datas[i][1]),datas[i][2],datas[i][5],datas[i][2])
        }

    }
})

//缩放动作监听 放大缩小按钮效果
M.map.addEventListener("zoomend",listenerZoomend)
function listenerZoomend(){
    var zoom = M.map.getZoom();
    if (zoom >= M.maxZoom) {
        $('#setzoom_big').css('opacity','0.5')
    }else if (zoom <= M.minZoom) {
        $('#setzoom_small').css('opacity','0.5')
    }else{
        $('#setzoom_big,#setzoom_small').css('opacity','1')
    };
}
//地图放大缩小
$('#setzoom_big').click(function(){
    var zoom = M.map.getZoom();
    if (zoom<M.maxZoom) {
        M.map.setZoom(zoom+1);
    }
})
$('#setzoom_small').click(function(){
    var zoom = M.map.getZoom();
    if (zoom>M.minZoom) {
        M.map.setZoom(zoom-1);
    }
})
//再查一次
$('#again').click(function(){
    console.log(11)
})

$('#again').dblclick(function(){
    console.log(22)
})
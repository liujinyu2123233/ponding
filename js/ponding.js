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
//开启鼠标滚轴缩放地图功能
M.map.enableScrollWheelZoom(true);

//var point = new BMap.Point(116.404, 39.915);
//M.map.centerAndZoom(point, M.defaultZoom);

if (0 && navigator.geolocation){
    // if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
}else{
    //alert("您的浏览器不支持定位");
    var obj = {coords:{}};
    obj.coords.latitude = 39.908518;
    obj.coords.longitude = 116.397128;
    showPosition(obj)
}
function showError(error){
    alert("获取位置信息失败，请检查系统设置")
    var obj = {coords:{}};
    obj.coords.latitude = 39.908518;
    obj.coords.longitude = 116.397128;
    showPosition(obj)
}
function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var ajaxTimeOut  = $.ajax({
        url: 'http://d3.weather.com.cn/webgis_rain_new/webgis/ele?lat='+lat+'&lon='+lng,
        type: 'GET',
        dataType: "jsonp",
        timeout :3000, //超时时间设置，单位毫秒
        jsonpCallback:'fc5m',
        success:function(a){
            console.log(a)
            $('#txtinfo p:last').html(a.msg)

        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                ajaxTimeOut.abort(); //取消请求
                ajaxData({msg:'未来两小时无降水',values:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]})
            }
        }
    })
}




$.ajax({
    url: M.data_url_head + (location.search.substr(6)||"bei_jing")+".json",
    type:'get',
    dataType:'jsonp',
    jsonpCallback:'callback',
    success:function(json){
        console.log(json)
        var datas = json.d;

        $('#txtinfo p:first').html(json.city+'有<span>'+datas.length+'</span>个路段易出现积水')
        for(var i=datas.length-1;i>=0;i--){

            // pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
            (function(point,street,city,info){
                if(!i){
                    M.map.centerAndZoom(point, M.defaultZoom);
                }
                var icon = new BMap.Icon("img/wd.png", new BMap.Size(19,29),{anchor:new BMap.Size(9,15) });

                var marker = new BMap.Marker(point,{icon:icon})// 创建点
                M.map.addOverlay(marker);    //增加点

                var opts = {
                    width : 200,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title : "积水路段：", // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                }
                var infoWindow = new BMap.InfoWindow(city+" "+street+" "+info, opts);  // 创建信息窗口对象
                marker.addEventListener("click", function(){
                    M.map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
            })(new BMap.Point(datas[i][0],datas[i][1]),datas[i][2],datas[i][3],datas[i][5])
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
    history.go(-1)
})

$('#remind').dblclick(function(){
    console.log(22)
})
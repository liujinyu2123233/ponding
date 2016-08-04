(function($){
    var rel_data = {
        '北京':{
            d:[{
                n:'北京',
                p:'bei_jing'
            }]
        },'重庆':{
            d:[{
                n:'重庆',
                p:'chong_qing'
            }]
        },'河北':{
            d:[{
                n:'石家庄',
                p:'shi_jia_zhuang'
            }]
        },'陕西':{
            d:[{
                n:'西安',
                p:'xi_an'
            }]
        },'河南':{
            d:[{
                n:'郑州',
                p:'zheng_zhou'
            }]
        },'辽宁':{
            d:[{
                n:'沈阳',
                p:'shen_yang'
            }]
        },'吉林':{
            d:[{
                n:'长春',
                p:'chang_chun'
            }]
        },'福建':{
            d:[{
                n:'福州',
                p:'fu_zhou'
            }]
        },'湖北':{
            d:[{
                n:'武汉',
                p:'wu_han'
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        },'':{
            d:[{
                n:'',
                p:''
            }]
        }
    }
    var val_citys=[]
    $('#picker-city').click(function(){
        var prov = $("#picker-prov").val();console.log(prov)
        var arr = rel_data[prov].d
        val_citys = [];
        for(var i= 0,len=arr.length;i<len;i++){
            val_citys.push(arr[i].n);
        }
        console.log(val_citys)
    }).picker({
        toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">确定</button>\
              <h1 class="title">请选择市</h1>\
              </header>',
        cols: [
            {
                textAlign: 'center',
                values: val_citys
            }
        ]
    });


    $("#picker-prov").picker({
        toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">确定</button>\
              <h1 class="title">请选择省</h1>\
              </header>',
        cols: [
            {
                textAlign: 'center',
                rotateEffect:true,

                values: ['北京', '重庆', '河北','陕西','河南','辽宁','吉林','福建','湖北','','','','','','','',]
            }
        ]
    })

})($)
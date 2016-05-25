(function ($){

	$.fn.extend({

		ossUpload:function(opt, serverCallBack){
			if(typeof opt != "object"){
				alert('参数错误！');
				return;
			}
			//父div
			var $fileInput = $(this);
			var $fileInputId = $fileInput.attr('id');

			//相关配置
			if(! opt.max_size){
				opt.max_size = '10mb';
			}
			var successCallBack = opt.success;

			//为oss相关函数定义
			opt.accessid = ''
			opt.accesskey = ''
			opt.host = ''
			opt.policyBase64 = ''
			opt.signature = ''
			opt.callbackbody = ''
			opt.filename = ''
			opt.key = ''
			opt.expire = 0
			opt.g_object_name = ''
			opt.g_object_name_type = ''
			opt.now = opt.timestamp = Date.parse(new Date()) / 1000;


			//初始化div
			createBox($fileInput);

			var uploader = new plupload.Uploader({
		    runtimes : 'html5,flash,silverlight,html4',
		    //绑定选择按钮
		    browse_button : 'selectfiles',
		    //multi_selection: false,
		    
		    container: document.getElementById('container'),
		    flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
		    silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
		    url : 'http://oss.aliyuncs.com',

		    filters: {
		        mime_types : [ //只允许上传图片和zip文件
		        { title : "Image files", extensions : "jpg,gif,png,bmp" }, 
		        { title : "Zip files", extensions : "zip,rar" }
		        ],
		        max_file_size : opt.max_size, //最大只能上传10mb的文件
		        prevent_duplicates : true //不允许选取重复文件
		    },

		    init: {
		        PostInit: function() {
		            document.getElementById('checkMessage').innerHTML = '';
		            document.getElementById('postfiles').onclick = function() {
		            set_upload_param(opt, uploader, '', false);
		            return false;
		            };
		        },

		        FilesAdded: function(up, files) {
		            plupload.each(files, function(file) {
		                document.getElementById('fileBoxUl').innerHTML += '<li><div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
		                +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
		                +'</div></li>';
		                previewImage(file,function(imgsrc){
		                    $('#'+file.id).append('<img src="'+ imgsrc +'" />');

		                })
		            });
		                 $("#fileBoxUl").sortable();

		        },

		        BeforeUpload: function(up, file) {
		            set_upload_param(opt, up, file.name, true);
		        },

		        UploadProgress: function(up, file) {
		            var d = document.getElementById(file.id);
		            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
		            var prog = d.getElementsByTagName('div')[0];
		            var progBar = prog.getElementsByTagName('div')[0]
		            progBar.style.width= 2*file.percent+'px';
		            progBar.setAttribute('aria-valuenow', file.percent);
		        },

		        FileUploaded: function(up, file, info) {
		        	successCallBack(info);
		            // if (info.status == 200)
		            // {
		            //    console.log('ok!');
		            // }
		            // else if (info.status == 203)
		            // {
		            //     console.log('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败');
		            // }
		            // else
		            // {
		            //     console.log('不明觉厉！');
		            // } 
		        },

		        Error: function(up, err) {
		            if (err.code == -600) {
		                alert('文件大小超过限制');
		            }
		            else if (err.code == -601) {
		                alert('文件类型不正确或者是空文件');
		            }
		            else if (err.code == -602) {
		                alert('文件已经上传过了');
		            }
		            else 
		            {
		                alert("错误：" + err.response);
		            }
		        }
		    }
		});

		uploader.init();

		}//ossUpload end




	});//extend end





function createBox($fileInput){
	var li = '<div id="ossfile"><ul id="fileBoxUl"></ul>\
	<span id="checkMessage">你的浏览器不支持flash,Silverlight或者HTML5！</span></div>\
		<br/>\
	<div id="container">\
		<a id="selectfiles" href="javascript:void(0);" class="btn">选择文件</a>\
		<a id="postfiles" href="javascript:void(0);" class="btn">开始上传</a>\
	</div>';
	$fileInput.append(li);
}


//发送签名请求
function send_request(){
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    if (xmlhttp!=null)
    {
        serverUrl = 'http://testapi.2cyj.com/oss/sign'
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
}
//校验签名
function get_signature(opt){
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    opt.now = opt.timestamp = Date.parse(new Date()) / 1000;
    if (opt.expire < opt.now + 3)
    {
    	//获得签名内容
        opt.body = send_request()
        var obj = eval ("(" + opt.body + ")");
        opt.host = obj['host']
        opt.policyBase64 = obj['policy']
        opt.accessid = obj['accessid']
        opt.signature = obj['signature']
        opt.expire = parseInt(obj['expire'])
        opt.callbackbody = obj['callback'] 
        opt.key = obj['dir']
        return true;
    }
    return false;
}
//获得随机字符串
function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
//获得文件后缀
function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}
//设置文件名
function calculate_object_name(opt, filename){
    opt.suffix = get_suffix(filename)
    opt.g_object_name = opt.key + random_string(12) + opt.suffix
    return ''
}
//设置上传参数
function set_upload_param(opt, up, filename, ret){
    if (ret == false)
    {
        ret = get_signature(opt)
    }
    opt.g_object_name = opt.key;
    if (filename != '') { opt.suffix = get_suffix(filename)
        calculate_object_name(opt,filename)
    }
    new_multipart_params = {
        'key' : opt.g_object_name,
        'policy': opt.policyBase64,
        'OSSAccessKeyId': opt.accessid,
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : opt.callbackbody,
        'signature': opt.signature,
    };

    up.setOption({
        'url': opt.host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
//预览图片
function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if(!file || !/image\//.test(file.type)) return; //确保文件是图片
    if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function(){
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    }else{
        var preloader = new mOxie.Image();
        preloader.onload = function() {
            // preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
            preloader.downsize( 200 );//先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load( file.getSource());
    }
}





})(jQuery);
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {AddressService} from '../address.service';
import {AppComponent} from '../../app.component';

declare let AMap: any;
declare let AMapUI: any;
declare let $: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map: MapComponent;
  public address: any;
  public freightPrice;
  public listPerson;
  public tt=0;
  public contactList=[];
  public inspectorList=[];
  public addtype;//添加联系人类型 3质检员
  public addretype;//地址类型 1 发货地址 2收货地址
  public orderaddtype;//修改订单地址的类型
  public orderNo;
  public newAddress;//订单修改新地址
  public systemaddress:any;
  public isSystesm:boolean=false;
  public isUsed:boolean=false;
  constructor(
    public service: AddressService,
    public router: Router,
    public appComponent:AppComponent,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderNo = this.activatedRoute.snapshot.queryParams["orderNo"];
    this.orderaddtype = this.activatedRoute.snapshot.queryParams["id"];
    let self = this;
    this.freightPrice = {
      'address': '发货',
      'receivaddress': '收货',
    }[sessionStorage['from']];
    this.addretype=parseInt(sessionStorage["type"]);
    this.addtype=this.addretype;
    this.address =JSON.parse(sessionStorage.getItem("address"));
    if (this.address&&this.address.id>0) {//如果是修改地址
      this.tt=1;
      this.getAddresbyId();
      if(!this.orderaddtype) {
        this.getuserbytype(this.address.type);
        if (this.addtype == 2) {
          this.getuserbytype(3);
        }
      }
      // if(this.address.systemAddressId){
      //   this.isSystesm=true;
      //   $("#detailAddress").attr("readonly","readonly");
      // }
      $('#phone').val(this.address['phone']);
      $('#name').val(this.address['name']);
      $('#subDistricts').val(this.address['province'])
      $('#company').val(this.address['company']);
      $('#address').val(this.address['province']+this.address['city']+this.address['county']+this.address['town']+this.address['street']|| '');
      $('#detailAddress').val(this.address['address']|| '');
      console.log(this.address['def']);
      // $('#isdefalut').val(this.address['def']);
      let self=this;
      setTimeout(function () {
        $('#isdefalut').val(self.address['def']);
      },100);


    }
    else{
      this.address = {};

    }
    // this.systemaddress=JSON.parse(sessionStorage.getItem("systemaddress"));
    // if(this.systemaddress){
    //   this.isSystesm=true;
    //   $("#detailAddress").attr("readonly","readonly");
    //   this.address["systemAddressId"]=this.systemaddress.id;
    //   this.address["longitude"]=this.systemaddress.longitude;
    //   this.address["latitude"]=this.systemaddress.latitude;
    //   this.address["province"]=this.systemaddress.province;
    //   this.address["city"]=this.systemaddress.city;
    //   this.address["county"]=this.systemaddress.county;
    //   this.address["town"]=this.systemaddress.town;
    //   this.address["street"]=this.systemaddress.street;
    //   let self=this;
    //   setTimeout(function () {
    //     $("#detailAddress").val(self.systemaddress.address);
    //     $("#address").val(self.systemaddress.province+self.systemaddress.city+self.systemaddress.county+self.systemaddress.town+self.systemaddress.street||"");
    //   },100)
    // }
    if(!this.isSystesm){
      let mapcity=this.address['city']||'北京市';
      let mapprovince=this.address['province']||'北京市';
      let zxsCitys=["北京市","上海市","天津市","重庆市"];//直辖市
      let ischange=0;
      //初始化地图
      let map = this.map = new AMap.Map("container", {
        // mapStyle: 'amap://styles/5e82a5b7757d00214ead15830af9195a',//样式URL
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonPosition: 'RB',
        resizeEnable: true,
        zoom: 15
      });

      AMap.service('AMap.DistrictSearch', function() {
        //回调函数 实例化DistrictSearch
        let districtSearch = new AMap.DistrictSearch();
        //TODO: 使用districtSearch对象调用行政区查询的功能
        districtSearch.search('中国', function(status, result) {
          console.log('地区:', result);

          let subDistricts = result.districtList[0].districtList;
          let select: any = document.getElementById('subDistricts');
          for (let i = 0; i < subDistricts.length; i += 1) {
            let name = subDistricts[i].name;
            let option = document.createElement('option');
            option.value = option.innerHTML = name;
            option.dataset['citycode'] = subDistricts[i].citycode;
            select.appendChild(option);
          }
          select.onchange = function() {
            map.setZoom(12);
            map.setCity(this.value);
            let pro=this.value;
            $('#subCity').empty();
            ischange=1;
            $("#keyword").val('');
            getCitylist(pro);
          };
          select.value=subDistricts[0].name;
          if(mapprovince!=''){
            select.value=mapprovince;
          }
          getCitylist(mapprovince);
        })
        let getCitylist= function(pro){
          let select1: any = document.getElementById('subCity');
          if(zxsCitys.indexOf(pro)>-1){
            let option = document.createElement('option');
            option.value = option.innerHTML = pro;
            select1.appendChild(option);
            select1.value=pro;
            SelectMapCity();
          }else{
            districtSearch.search(pro, function(status, result) {
              console.log('市:', result);
              let citys = result.districtList[0].districtList;

              for (let i = 0; i < citys.length; i += 1) {
                let name = citys[i].name;
                let option = document.createElement('option');
                option.value = option.innerHTML = name;
                option.dataset['citycode'] = citys[i].citycode;
                select1.appendChild(option);
              }
              select1.value=citys[0].name;
              if(ischange==0&&mapcity!=''){
                select1.value=mapcity;
              }
              SelectMapCity();
            })
          }
          select1.onchange = function() {
            SelectMapCity();
          }
        }
        //
        let SelectMapCity=function () {
          let mapcityname=$('#subCity').val().replace('市','');

          Searchmap(mapcityname);
          // map.autocomplete= new AMap.Autocomplete(autoOptions);
          // this.placeSearch.setCity(mapcityname);
        }
      });
      var Searchmap=function (cityname) {
        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
          let autoOptions = {
            city: cityname, //城市，默认全国
            input: "keyword"//使用联想输入的input的id
          };
          map.autocomplete = new AMap.Autocomplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
            city: mapcity.replace('市',''),
            map: map
          })
          AMap.event.addListener(map.autocomplete, "select", function(e) {

            //placeSearch.search(e.poi.name);
            //placeSearch.setCity(e.poi.adcode);
            //placeSearch.search(e.poi.name);  //关键字查询查询
            console.log(e);
            map.setCenter(e.poi.location);
            map.setZoom(15);
          });
          // $("#subCity").addListener()

        });
      }
      //拖拽地图选址
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        let positionPicker = new PositionPicker({
          mode: 'dragMap',
          map: map
        });
        positionPicker.on('success', function(positionResult) {
          // console.log('附近信息:', positionResult);
          let data = {};
          let addressComponent = positionResult.regeocode.addressComponent;
          data['province'] = addressComponent.province;
          data['city'] = addressComponent.city || data['province'];
          data['county'] = addressComponent.district;
          data['town'] = addressComponent.township;
          data['street'] = positionResult.address;
          data['street'] = data['street'].replace(data['province'], '')
            .replace(data['city'], '')
            .replace(data['county'], '')
            .replace(data['town'], '');
          // .replace(/市$/, '')
          data['latitude'] = positionResult.position.lat;
          data['longitude'] = positionResult.position.lng;
          // sessionStorage['mapReceiveInfo'] = JSON.stringify(data);
          // self.address = data;
          Object.assign(self.address, data);
          // $('#address').val(positionResult.address);
          $('#mapnowaddre').html(positionResult.address);
          // console.log('附近信息:', positionResult.address);
          // console.log(data);
          self.newAddress = data;
        });
        positionPicker.start();
      });
      AMap.plugin(['AMap.Geolocation', 'AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar({ visible: true }));
        // map.addControl(new AMap.Scale());
        // map.addControl(new AMap.OverView({isOpen:true}));
        // map.addControl(new BasicControl.Zoom({visible: true}));
        let geolocation = map.posMapGeolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

        });
        map.addControl(geolocation);
        if (self.address) {//存在地址信息，跳转到对应经纬度
          map.setCenter(new AMap.LngLat(self.address.longitude, self.address.latitude));
          map.setZoom(15);
        } else {
          map.posMapGeolocation.getCurrentPosition();
          self.showtoast('正在定位...');
        }
      });

    }



  }
  remove() {
    sessionStorage.removeItem("systemaddress");
    sessionStorage.removeItem("address");
    window.history.go(-1);
  }

  getAddresbyId(){
    this.service.getAddres(this.address.id).subscribe(data=>{
      if(data.code==0){
        this.address=data.data;
        if(this.address.isUsed&&this.address.isUsed>0){
          this.isUsed=true;
          $("#detailAddress").attr("readonly","readonly");
        }
      }
    })
  }
  //获取联系人和质检员 type=3 质检员
  getuserbytype(type){
    this.service.contactLists(this.address.id,type)
      .subscribe(data =>{
        if(type==3){
          this.inspectorList = data.data;
          // console.log(this.inspectorList);
        }else{
          this.contactList=data.data;
          // console.log(this.contactList);
        }
      });
  }

  //提交保存数据
  public iscansub=true;
  submitForm() {
    // console.log(this.address);
    let company = $("#company").val();
    let detailAddress = $("#detailAddress").val();
    let isdefalut = $("#isdefalut").val();
    if (!(detailAddress && company)) {
      this.showtoast('填写信息不完整');
      return;
    }
    if(this.contactList.length==0){
      this.showtoast('联系人信息必填');
      return;
    }
    this.listPerson=this.contactList.concat(this.inspectorList);
    // console.log(this.listPerson);

    for(var j in this.contactList){
      if(this.contactList[j]['main']==1){
        this.address['name'] = this.contactList[j]['name']+"";
        this.address['phone'] = this.contactList[j]['phone'];
      }
    }
    this.address['address'] =detailAddress;
    this.address['type'] = parseInt(sessionStorage["type"]);//收发货
    this.address['company'] = company;
    this.address['def']=0;
    if(isdefalut==1){
      this.address['def']=1;
    }
    // console.log(this.address);
    let api = this.address.id === undefined ? 'addAddress' : 'putAddress'//如果不存在id，添加地址
    if(this.iscansub){
      this.iscansub=false;
      this.service[api](this.address,this.listPerson).subscribe(data => {
        // console.log(api, '地址接口：', data);
        this.iscansub=true;
        if (data.code == 0) {//成功
          sessionStorage.removeItem("systemaddress");
          sessionStorage.removeItem("address");
          this.showtoast(api === 'addAddress' ? "添加地址成功" : '修改地址成功');
          this.router.navigateByUrl("content/address" );
        }
        else{
          this.showtoast("保存信息提示："+data.msg);
          if(data.msg =="没有登录"){
            this.router.navigateByUrl("login");
            window.location.reload();
          }
        }
      })
    }

  }
  //打开弹框
  addPreson(type){
    $(".addPreson").attr("data-toggle","modal");
    $(".addPreson").attr("data-target","#myModal");
    $("#myModal").show();
    setTimeout(function () {
      $('.modal-backdrop').css('z-index','998');
      $('.modal').css('z-index','999');
    },100);
    if(type==3){
      this.addtype=3;//添加质检员
    }else{
      this.addtype=2;
    }
  }
  confrimAdd(){
    let name =  $("input[name='name']").val();
    let phone =  $("input[name='phone']").val();
    if (!(name && phone)) {
      this.showtoast('填写信息不完整');
      return;
    }
    var reg = /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/;
    var ishavenum=/[0-9]/;
    var num=/^[\d\.]+$/;
    if(reg.test(name)){
      this.showtoast('联系人不可输入特殊符号');
      return;
    }else if(ishavenum.test(name)){
      this.showtoast('联系人不可输入数字');
      return;
    }
    if(phone.length!=11){
      this.showtoast('请输入正确的电话号码');
      return;
    }
    if(!num.test(phone)){
      this.showtoast('请输入正确的电话号码');
      return;
    }

    for(let i=0;i<this.contactList.length;i++){
      if(phone==this.contactList[i].phone){
        this.showtoast("不能填写相同的联系人电话");
        $("input[name='name']").val('');
        $("input[name='phone']").val('');
        return;
      }
    }
    if(this.addtype==3){
      for(let j=0;j<this.inspectorList.length;j++){
        if(phone==this.inspectorList[j].phone){
          this.showtoast("不能填写相同的联系人电话");
          $("input[name='name']").val('');
          $("input[name='phone']").val('');
          return;
        }
      }
    }
    let isdefaultuser=0;
    if(this.contactList.length==0&&this.addtype!=3){
      isdefaultuser=1;
    }
    if (this.address.id) {
      this.service.saveContact(this.address.id,this.addtype,name,phone,isdefaultuser)
        .subscribe(data=>{
          if(data.code==0){
            // 新增节点
            this.showtoast("添加成功");
            this.getuserbytype(this.addtype);
          }else{
            this.showtoast(data.msg);
          }
        })
    }else{
      if(this.addtype==3){
        this.inspectorList.push({"id":0,"name":name,"phone":phone,"type":this.addtype, "main":0});
      }else{
        this.contactList.push({"id":0,"name":name,"phone":phone,"type":this.addtype, "main":isdefaultuser});
      }
    }
    $("input[name='name']").val('');
    $("input[name='phone']").val('');
  }
  //删除联系人
  delete(index,type){
    //  type==3 质检员
    let id=0;
    if(type==3){
      this.addtype=3;
      id=this.inspectorList[index].id;
    }else{
      id=this.contactList[index].id;
    }
    if(this.address.id>0){
      if(this.addtype!=3) {
        if(this.contactList[index].main==1){
          this.showtoast('主联系人不可删除');
          return;
        }
      }
      this.service.deleteContact(id)
        .subscribe(data =>{
          if(data.code==0){
            this.showtoast("删除成功");
            this.getuserbytype(this.addtype);
          }else{
            this.showtoast(data.msg);
            return;
          }
        })
    }else{
      if(type==3){
        this.inspectorList.splice( index, 1 );
        // this.inspectorList[index].remove();
      }else{
        this.contactList.splice( index, 1 );
      }
    }
  }
  setdefault(index){
    if(this.address.id>0){
      this.service.setMain(this.address.id,this.contactList[index].id)
        .subscribe(msg=>{
          if(msg.code==0){
            this.getuserbytype(this.addretype);
          }else {
            this.showtoast(msg.msg);
          }
        })
    }else{
      for(let i=0;i<this.contactList.length;i++){
        if(i==index){
          this.contactList[i].main=1;
        }else{
          this.contactList[i].main=0;
        }
      }
    }
  }
  getaddress(){
    if(this.isUsed){
      this.showtoast("不可编辑")
    }else{
      if(!this.isSystesm){
        $("#address").attr("data-toggle","modal");
        $("#address").attr("data-target","#myModa2");
        $("#myModa2").show();
        setTimeout(function () {
          $('.modal-backdrop').css('z-index','998');
          $('.modal').css('z-index','999');
        },100);
      }else if(this.isSystesm&&this.address["id"]){
        this.selectsystem();
      }
    }


  }
  selectsystem(){
    if(this.isSystesm&&this.address["id"]){
      if(this.addretype==1){
        this.router.navigateByUrl('/content/personalCenter/selectaddress/deliver');
      }else if(this.addretype==2){
        this.router.navigateByUrl('/content/personalCenter/selectaddress/receive');
      }
    }else if(this.isUsed){
      this.showtoast("不可编辑")
    }
  }
  sumbitmap(){
    $('#address').val($('#mapnowaddre').html());
  }
  //保存订单地址
  orderAddress() {
    if(this.orderaddtype==1) {
      let sendaddre = {
        orderNo: this.orderNo,
        sendAddress: $("#detailAddress").val(),
        sendCity: this.newAddress.city,
        sendCompany: $("#company").val(),
        sendCounty: this.newAddress.county,
        sendLatitude: this.newAddress.latitude,
        sendLongitude: this.newAddress.longitude,
        sendProvince: this.newAddress.province,
        sendStreet: this.newAddress.street,
        sendTown: this.newAddress.town
      };
      this.service.updateSendOrderInfoByOrderNo(sendaddre) .subscribe(data => {
        if(data.code==0){
          console.log("成功")
          this.router.navigateByUrl("content/myGoods/orderDetailsInfo/" + this.orderNo);
        }else{
          alert(data.msg)
        }
      })
    }else if(this.orderaddtype==2) {
      let receiveaddre = {
        orderNo: this.orderNo,
        receiveAddress: $("#detailAddress").val(),
        receiveCity: this.newAddress.city,
        receiveCompany: $("#company").val(),
        receiveCounty: this.newAddress.county,
        receiveLatitude: this.newAddress.latitude,
        receiveLongitude: this.newAddress.longitude,
        receiveProvince: this.newAddress.province,
        receiveStreet: this.newAddress.street,
        receiveTown: this.newAddress.town
      };
      this.service.updateReceiveOrderInfoByOrderNo(receiveaddre).subscribe(data => {
        if (data.code == 0) {
          this.router.navigateByUrl("content/myGoods/orderDetailsInfo/" + this.orderNo)
        } else {
          alert(data.msg)
        }
      })
    }


  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }

}

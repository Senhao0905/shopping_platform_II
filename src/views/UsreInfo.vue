<script>
import {mapActions} from "pinia";

import indexStore from "../stores/indexStore"

export default {
   data() {
      return {
         userInfo: {
            name: null,
            pwd: null,
            address: null,
            phone: null,
            src: null
         },
         nameUp: false,
         pwdUp: false,
         addressUp: false,
         phoneUp: false,
         oldValue: null,
         isUpdate: false,
         isActive: false,
         pic: null,
         imgUpdate: false
      }
   },
   methods: {
      getUser() {
         let body = {

         }
         fetch("http://localhost:8080/get_user_info", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include"
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               this.userInfo.name = data.user.name;
               this.userInfo.pwd = data.user.pwd
               this.userInfo.address = data.user.address;
               this.userInfo.phone = data.user.phone;
               this.userInfo.src = `../../pic/${data.user.userImg}.jpg`;
               this.pic = `../../pic/${data.user.userImg}.jpg`
               console.log(this.userInfo);
            })
      },
      update(value) {

         this.isUpdate = true;

         switch (value) {
            case "name":
               this.oldValue = this.userInfo.name;
               this.nameUp = !this.nameUp;
               return;
            case "pwd":
               this.oldValue = this.userInfo.pwd;

               this.pwdUp = !this.pwdUp;
               return;
            case "address":
               this.oldValue = this.userInfo.address;

               this.addressUp = !this.addressUp;
               return;
            case "phone":
               this.oldValue = this.userInfo.phone;

               this.phoneUp = !this.phoneUp;
               return;
         }

      },
      save(value) {
         let body = {};
         let str = "http://localhost:8080/"
         switch (value) {
            case "name":
               this.nameUp = !this.nameUp;
               this.isUpdate = false;
               body = {
                  "name": this.userInfo.name
               }
               str += "update_name";
               break;
            case "pwd":
               this.pwdUp = !this.pwdUp;
               this.isUpdate = false;
               body = {
                  "pwd": this.userInfo.pwd
               }
               str += "update_Pwd";

               break;
            case "address":
               this.addressUp = !this.addressUp;
               this.isUpdate = false;
               body = {
                  "address": this.userInfo.address
               }
               str += "update_address";

               break;
            case "phone":
               this.phoneUp = !this.phoneUp;
               this.isUpdate = false;
               body = {
                  "phone": this.userInfo.phone
               }
               str += "update_phone";

               break;
         }
         console.log(body);
         console.log(str);
         fetch(str, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include"
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               if (data.message == "Successful!!") {
                  alert("修改成功");
                  location.reload();
               }
               else {
                  alert("資料格式錯誤");
                  location.reload();
               }
            })
      },
      cancel(value) {
         switch (value) {
            case "name":
               this.nameUp = !this.nameUp;
               this.userInfo.name = this.oldValue;
               this.isUpdate = false;
               return;
            case "pwd":
               this.pwdUp = !this.pwdUp;
               this.userInfo.pwd = this.oldValue;
               this.isUpdate = false;
               return;
            case "address":
               this.addressUp = !this.addressUp;
               this.userInfo.address = this.oldValue;
               this.isUpdate = false;
               return;
            case "phone":
               this.phoneUp = !this.phoneUp;
               this.userInfo.phone = this.oldValue;
               this.isUpdate = false;
               return;
         }
      },
      getImg(e) {
         const pic = e.target.files[0];
         this.imgUpdate = true;
         const reader = new FileReader();
         reader.readAsDataURL(pic);
         reader.onload = (e) => {
            this.userInfo.src = e.target.result;
            console.log(this.userInfo.src);
         }
         e.target.value = ""

      },
      cancelImg() {
         this.imgUpdate = false;
         this.userInfo.src = this.pic;
      },
      saveImg() {
         let userImg = this.userInfo.src.split(",")[1];
         let body = {
            img: userImg
         }
         fetch("http://localhost:8080/add_user_img", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include"
         })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               if (data.message == "Successful!!") {
                  alert("更新成功");
                  location.reload();
               }
               else {
                  alert("更新失敗");
                  location.reload();

               }
            })
      },
      ...mapActions(indexStore, ["updateLocation"])
   },
   mounted() {
      this.getUser();
      this.updateLocation(200);

   }
}
</script>

<template>
   <div class="pic-box ">
      <div class="pic">
         <img v-bind:src="userInfo.src" alt="pic">
      </div>
      <div class="buttonbox d-flex">
         <label for="uploadimg">
            <input id="uploadimg" style="display: none;" type="file" @change="getImg" title="">
            <i v-if="!imgUpdate" class="fa-solid fa-plus" ></i>
         </label>

         <div v-if="imgUpdate" class="cancelbox d-flex">
            <button type="button" @click="saveImg">確定</button>
            <button type="button" @click="cancelImg">取消</button>
         </div>
      </div>

   </div>
   <div class="userInfoBox">
      <div class="name">
         <label for="name">名稱</label>
         <input v-if="nameUp" type="text" id="name" v-model="userInfo.name">
         <input v-else disabled="disabled" type="text" id="name" v-model="userInfo.name">
         <div v-if="nameUp" class="btngroup">
            <button type="button" @click="save('name')">儲存</button>
            <button type="button" @click="cancel('name')">取消</button>
         </div>
         <button v-else-if="!isUpdate" type="button" @click="update('name')">修改</button>
      </div>
      <div class="pwd">
         <label for="pwd">密碼</label>
         <div v-if="pwdUp" class="pwdbox">
            <input v-bind:type="isActive ? 'text' : 'password'" id="pwd" v-model="userInfo.pwd">
            <i v-bind:class="isActive ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" @click="isActive = !isActive"></i>
         </div>
         <input v-else disabled="disabled" type="password" id="pwd" v-model="userInfo.pwd">

         <div v-if="pwdUp" class="btngroup">
            <button type="button" @click="save('pwd')">儲存</button>
            <button type="button" @click="cancel('pwd')">取消</button>
         </div>
         <button v-else-if="!isUpdate" type="button" @click="update('pwd')">修改</button>

      </div>
      <div class="address">
         <label for="address">地址</label>
         <input v-if="addressUp" type="address" id="address" v-model="userInfo.address">
         <input v-else disabled="disabled" type="address" id="address" v-model="userInfo.address">
         <div v-if="addressUp" class="btngroup">
            <button type="button" @click="save('address')">儲存</button>
            <button type="button" @click="cancel('address')">取消</button>
         </div>
         <button v-else-if="!isUpdate" type="button" @click="update('address')">修改</button>

      </div>
      <div class="phone">
         <label for="phone">電話</label>
         <input v-if="phoneUp" type="tel" id="phone" v-model="userInfo.phone">
         <input v-else disabled="disabled" type="tel" id="phone" v-model="userInfo.phone">
         <div v-if="phoneUp" class="btngroup">
            <button type="button" @click="save('phone')">儲存</button>
            <button type="button" @click="cancel('phone')">取消</button>
         </div>
         <button v-else-if="!isUpdate" type="button" @click="update('phone')">修改</button>
      </div>


   </div>
</template>

<style lang="scss" scoped>
.pic-box {
   width: 100%;
   height: 30%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: relative;

   .pic {
      width: 150px;
      height: 150px;
      border-radius: 100px;
      background-color: #E2C2B3;
      img {
         width: 100%;
         height: 100%;
         border-radius: 100px;
         margin: auto;
      }


   }

   .buttonbox {
      i {
         position: absolute;
         cursor: pointer;
         font-size: 30px;
         top: 70%;
         right: 42%;
         transition: 0.7s;
         color:#030303;
        
         &:hover {
            scale: 1.3;
         }
      }

      .cancelbox {
         button {
            background-color: #E2C2B3;
            border: none;
            cursor: pointer;
            border-radius: 10px;
            transition: 0.7s;
            margin: 0 10px;
            font-size: 16px;
            padding: 0 20px;

            &:hover {
               background-color: #dea991;
               scale: 1.05;
            }
         }
      }
   }
}

.userInfoBox {
   width: 100%;
   height: 70%;
   display: flex;
   flex-direction: column;
   justify-content: start;
   align-items: start;
   font-size: 20px;

   .name,
   .pwd,
   .address,
   .phone {
      display: flex;
      justify-content: start;
      align-items: center;
      padding-left: 300px;

      .pwdbox {
         position: relative;

         input {
            padding-right: 40px;
         }

         i {
            position: absolute;
            right: 20px;
            top: 15px;
            cursor: pointer;
         }
      }
   }

   label {
      font-weight: bold;
   }

   input {
      font-size: 20px;
      border-radius: 10px;
      border: none;
      background-color: #F7F3F5;
      margin: 10px 10px;
   }

   button {
      border: none;
      background-color: #F7F3F5;
      font-size: 18px;
      font-weight: bold;
      padding: 0 50px;
      border-radius: 10px;
      transition: 0.7s;
      cursor: pointer;
      margin: 0 20px;

      &:hover {
         background-color: #d0cfd0;

      }

      &:active {
         scale: 1.05;
      }
   }
}</style>
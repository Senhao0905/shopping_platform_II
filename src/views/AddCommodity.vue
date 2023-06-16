<script>
export default {
    data() {
        return {
            name: null,
            price: 0,
            inventory: 0,
            category: null,
            introduction: null,
            reqCommodity: [],
            img: null,
            commodityNumber: 0

        }
    },
    methods: {

        commodityPage() {
            this.$router.push(`/my-market/commodity`)
        },
        // 新增商品功能
        addCom() {

            const confirmation = `新增商品內容為\n 商品分類:${this.category} \n 商品名稱:${this.name}\n 商品價格:NT$ ${this.price}\n 商品庫存:${this.inventory}\n 商品介紹:${this.introduction}`;
            let imgSource = this.img.split(",")[1];
            // let body = {
            //     img: imgSource,
            //     commodityNumber: num
            // }

            if (confirm(confirmation)) {
                // 建立更新資料的物件
                const updatedData = {
                    reqCommodity: [{
                        category: this.category,
                        name: this.name,
                        price: this.price,
                        inventory: this.inventory,
                        introduction: this.introduction,
                        imgPath: imgSource
                    }]
                };

                console.log(updatedData);
                fetch("http://localhost:8080/add_commodity", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(updatedData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                    })

            };
            location.href = "/my-market/commodity";

        },

        getImg(e) {

            const img = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e) => {
                this.img = e.target.result;
                console.log(this.img);
            }

        },

        // 等後端改好
        updatePic() {
            let imgSource = this.img.split(",");

            let body = {
                img: imgSource,
                commodityNumber: this.commodityNumber
            }
            fetch("http://localhost:8080/add_image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })

        }
    }
}

</script>

<template>
    <div>
        <div class="homeBtn">
            <button type="button" @click="commodityPage">返回商品管理</button>
        </div>
        <div class="wrap">
            <div class="InfoBox">
                <div class="comCatergory">
                    <label class="label-container" for="comSelect">商品分類</label>
                    <select class="comSelect" v-model="category">
                        <option value="3C產品">3C產品</option>
                        <option value="配件飾品">配件飾品</option>
                        <option value="居家生活">居家生活</option>
                        <option value="休閒用品">休閒用品</option>
                        <option value="美食廣場">美食廣場</option>
                    </select>
                </div>
                <div class="comName">
                    <label for="comName">商品名稱</label>
                    <input type="text" id="comName" v-model="name">
                </div>

                <div class="price">
                    <label for="price">價格</label>
                    <input type="number" id="price" v-model="price">
                </div>
                <div class="inventory">
                    <label for="inventory">庫存量</label>
                    <input type="number" id="inventory" v-model="inventory">
                </div>
                <div class="intro">
                    <label for="introduction">商品介紹</label>
                    <input type="text" id="introduction" v-model="introduction">
                </div>
            </div>
            <div class="pic-box">
                <div class="pic">
                    <input type="file" @change="getImg">
                    <img :src="img" alt="img">
                </div>
                <button type="button" class="btn-add" @click="addCom">新增商品資訊</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.homeBtn {
    margin: 40px 40px 5px 40px;
}


button {
    border: none;
    background-color: #403234;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 0 15px;
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

.wrap {
    background-color: #E2C2B3;
    border-radius: 20px;
    margin: 50px;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .InfoBox {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 20px;
        padding: 30px;

        .comCatergory {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;

            .comSelect {
                padding: 5px;
                margin-left: 15px;
                font-size: 18px;
                border: none;
                border-radius: 10px;
                background-color: #F7F3F5;
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
            text-align: center;
        }



    }

 
    .pic-box {
        width: 100%;
        height: 30%;

        .pic {
            width: 150px;
            height: 150px;
            margin-bottom: 70px;

            img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                display: block;
                object-fit: contain;
            }
        }

        .btn-add {
            padding: 10px;
        }

    }

}
</style>